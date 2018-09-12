const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Invalid Email Address"],
        required: "Please Supply an email address"
    },
    name: {
        type: String,
        required: "Please supply a name",
        trim: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = mongoose.model("User", userSchema);
