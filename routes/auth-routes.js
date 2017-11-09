const passport = require('passport');
const passportConfig = require('./../services/passport-config');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current-user', (req, res) => {
        res.send(req.user);
    });
};
