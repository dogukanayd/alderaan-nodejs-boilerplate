var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/login", userController.loginForm);
router.get("/register", userController.registerForm);
router.post(
  "/register",
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get("dashboard", userController.dashboard);

module.exports = router;
