const passport = require('passport');
const mongoose = require('mongoose');
const { Strategy } = require('passport-facebook');

const User = mongoose.model('User');


passport.use(User.createStrategy());

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:7777/login/facebook/return',
    },
    ((accessToken, refreshToken, profile, cb) => cb(null, profile)
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
