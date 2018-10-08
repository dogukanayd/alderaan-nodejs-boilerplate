const passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');
const mongoose = require('mongoose');
// const promisify = require('es6-promisify');

const User = mongoose.model('User');


exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/dashboard',
  successFlash: 'You are now logged in!',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // first check if the user is authenticated
    next();
  } else {
    req.flash('error', 'Oops you must be logged in to do that!');
    res.redirect('/login');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // if user is not logged in next()
    next();
  } else {
    // if logged in, return it to dashboard
    res.redirect('/dashboard');
  }
};


exports.facebookLogin = passport.authenticate('facebook', { scope: ['email', 'user_likes'] });

exports.facebookReturn = passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/savefbprofile' });


exports.facebookRedirect = (res) => {
  res.redirect('/savefbprofile');
};

exports.facebookEnsure = ensureLoggedIn();

/*eslint-disable*/
exports.postUserFacebookLikes = async (req, res) => {
  const data = req.user._json;
  var url = `https://graph.facebook.com/v3.1/${data.id}/likes?fields=id%2Cname%2Cfan_count%2Ccategory%2Cpicture&access_token=${req.user.accessToken}&limit=100`;

  // List of fb likes
  let likes = [];


  async function getUser(url) {
    try {
      const response = await axios.get(url);
      if (response.data.data.length === 0) return null;

      likes = [...likes,...response.data.data]
      return response.data.paging.next
    } catch (error) {
      console.error(error);
      return null
    }
  }

  const getAllUserLikes = (url) =>{
    getUser(url)
    .then((result) => {
      if (result != null) {
        getAllUserLikes(result)
      } else {
        console.log(likes)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
};

exports.getUserInfoFromFacebook = async (req, res, next) => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_json"] }] */
  const data = req.user._json;
  // res.send(req.user.emails[0].value);
  const user = new User({
    socialID: data.id,
    email: data.email,
    name: data.first_name,
    familyName: data.last_name,
    accessToken: req.user.accessToken,
    provider: req.user.provider,
  });
  // const register = promisify(User.register, User);
  // await register(user, 'alo');
  await user
    .save()
    .catch(e => console.log(e));
  // res.redirect('/dashboard');
  next();
};
