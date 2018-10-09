const express = require('express');
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');
// const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/login', authController.isNotLoggedIn, userController.loginForm);
router.post('/login', authController.isNotLoggedIn, authController.login);
router.get('/register', authController.isNotLoggedIn, userController.registerForm);
router.post(
  '/register',
  authController.isNotLoggedIn,
  userController.validateRegister,
  userController.isUnique,
  userController.register,
  authController.login,
);

router.get('/logout', authController.logout);

router.get('/dashboard', authController.isLoggedIn, userController.dashboard);

router.get('/api/likesv3/', userController.facebookLikeV3);

module.exports = router;
