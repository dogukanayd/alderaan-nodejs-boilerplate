const mongoose = require('mongoose');
const promisify = require('es6-promisify');


const User = mongoose.model('User');
const UserLikes = mongoose.model('UserLikes');

exports.loginForm = (req, res) => {
  res.render('../views/user/login', { title: 'LOGIN FORM' });
};

exports.registerForm = (req, res) => {
  res.render('../views/user/register', { title: 'REGISTER FORM' });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req
    .checkBody('password-confirm', 'Confirmed Password cannot be blank!')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Oops! Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('../views/user/register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
    return; // stop the fn from running
  }
  next(); // there were no errors!
};

exports.isUnique = async (req, res, next) => {
  // this func is checks the db and if the the register email is already in use or not
  // we might want to add this functionality to validateRegister
  const notUnique = await User.findOne({ email: req.body.email });
  if (notUnique) {
    req.flash('error', 'This email is already in use');
    res.redirect('/register');
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.success = (req, res) => {
  req.flash('success', 'You are successfully registered!');
  res.redirect('/login');
};

exports.dashboard = (req, res) => {
  res.render('../views/user/user-dashboard');
};

/*eslint-disable*/
exports.facebookLikeV3 = (req, res) => {
  const pageNo = parseInt(req.query.pageNo);
  const size = parseInt(req.query.size);
  const query = {};
  let response = '';

  if (pageNo < 0 || pageNo === 0) {
    response = {'error': true, 'message': 'invalid page number, should start with 1'};
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;

  UserLikes.count({}, function(err, totalCount) {
    if(err){
      response = {"error" : true,"message" : "Error fetching data"}
    }
    UserLikes.find({}, {}, query, function(err, data) {
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
        var totalPages = Math.ceil(totalCount / size)
        response = {"data" : data,"totalPages": totalPages};
    }
    res.json(response);
    });
  });
}
