const express = require('express');
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');
// const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login,
);

router.get('/logout', authController.logout);

router.get('/dashboard', authController.isLoggedIn, userController.dashboard);

module.exports = router;
