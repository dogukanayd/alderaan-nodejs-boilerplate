var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");


router.get("/login", userController.loginForm);

router.get("/register", function(req, res, next) {
    res.render("user/register");
});

router.get('/register', userController.registerForm);

module.exports = router;
