const passport = require('passport');
const passportConfig = require('./../services/passport-config');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));
};