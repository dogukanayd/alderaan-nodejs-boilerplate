const passport = require('passport');
const mongoose = require('mongoose');
const { Strategy } = require('passport-facebook');

const User = mongoose.model('User');


// passport.use(User.createStrategy());

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name'],
    },
    ((accessToken, refreshToken, profile, cb) => {
      /* eslint no-param-reassign: "error" */
      profile.accessToken = accessToken;
      cb(null, profile);
    }
    ),
  ),
);


// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
