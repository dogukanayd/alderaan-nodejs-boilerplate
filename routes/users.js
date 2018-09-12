var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/login", userController.loginForm);
router.get("/register", userController.registerForm);
router.post(
    "/register",
    catchErrors(userController.register),
    userController.success
);

module.exports = router;
