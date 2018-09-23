var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/login", userController.loginForm);
router.post("/login", authController.login);
router.get("/register", userController.registerForm);
router.post(
  "/register",
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get("/logout", authController.logout);

router.get("/dashboard", authController.isLoggedIn, userController.dashboard);

module.exports = router;
