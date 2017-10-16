const PORT = process.env.PORT || 3000;
const KEYS = require('./config/keys');

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [KEYS.cookieKey]
    })
);

app.use(passport.initialize());

app.use(passport.session());

require('./models/User');
require('./services/passport-config');
require('./routes/auth-routes')(app);

mongoose.connect(KEYS.mongoURI, {
    useMongoClient: true
});

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
