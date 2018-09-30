const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User.js');


const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/sidebar', (req, res) => {
  res.render('../views/templates/layoutsSidebar.pug');
});


// facebook login
/* eslint-disable */
//Use facebook strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //check user table for anyone with a facebook ID of profile.id
  User.findOne({
      'facebook.id': profile.id 
  }, function(err, user) {
      if (err) {
          return done(err);
      }
      //No user was found... so create a new user with values from Facebook (all the profile. stuff)
      if (!user) {
          user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: 'facebook',
              //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
              facebook: profile._json
          });
          user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
          });
      } else {
          //found user. Return
          return done(err, user);
      }
  });
}
));
/* eslint-disable */

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/auth/facebook',
passport.authenticate('facebook', { scope: 'read_stream' })
);

module.exports = router;
