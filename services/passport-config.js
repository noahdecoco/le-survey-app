const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KEYS = require('./../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserializing user:', id);
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: KEYS.googleClientID,
            clientSecret: KEYS.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) return done(null, existingUser);

            const newUser = await new User({ googleId: profile.id }).save();
            done(null, newUser);
        }
    )
);
