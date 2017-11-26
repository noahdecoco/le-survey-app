const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients
                .split(',')
                .map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: new Date()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();

            req.user.credits--;

            const user = await req.user.save();
            console.log('"the user"', user);
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false
        });

        res.send(surveys);
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(event => {
                const path = new URL(event.url).pathname;
                const match = p.test(path);

                if (match) {
                    return {
                        email: event.email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                console.log('Updating', surveyId, email, choice);
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec();
            })
            .value();

        res.send({});
    });
};
