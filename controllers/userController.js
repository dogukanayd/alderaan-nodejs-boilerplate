const mongoose = require("mongoose");
const Store = mongoose.model("User");

exports.loginForm = (req, res) => {
    res.render("../views/user/login", { title: "LOGIN" });
};

exports.registerForm = (req,res) => {
    res.render('../views/user/register', {title: "REGISTER"});
}