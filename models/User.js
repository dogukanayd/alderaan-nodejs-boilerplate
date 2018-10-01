const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
// const passportLocalMongoose = require('passport-local-mongoose');
// const validator = require('validator');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  socialID: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    // validate: [validator.isEmail, 'Invalid Email Address'],
    // required: 'Please Supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  familyName: {
    type: String,
    trim: true,
  },
  accessToken: {
    type: String,
    trim: true,
  },
  provider: {
    type: String,
    trim: true,
  },

});

// userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('User', userSchema);
