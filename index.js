const PORT = process.env.PORT || 5000;
const KEYS = require('./config/keys');

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [KEYS.cookieKey]
    })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./models/User');
require('./services/passport-config');
require('./routes/auth-routes')(app);
require('./routes/billing-routes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

mongoose.connect(KEYS.mongoURI, {
    useMongoClient: true
});

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
