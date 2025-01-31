const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    console.debug(profile)
    try {
        let user = await User.findOne({ providerId: profile.id });

        if (!user) {
            user = await User.create({
                name: profile.displayName || profile.username,
                email: profile.emails?.[0]?.value || '',
                provider: 'github',
                providerId: profile.id,
                accessLevel: 'user'
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
