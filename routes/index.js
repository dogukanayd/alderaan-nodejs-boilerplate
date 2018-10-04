const express = require('express');
const authController = require('../controllers/authController.js');
// const passport = require('passport');

const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/sidebar', (req, res) => {
  res.render('../views/templates/layoutsSidebar.pug');
});

router.get('/login/facebook', authController.facebookLogin);

router.get('/login/facebook/return', authController.facebookReturn);

router.get('/savefbprofile',
  authController.facebookEnsure,
  authController.getUserInfoFromFacebook);

module.exports = router;
