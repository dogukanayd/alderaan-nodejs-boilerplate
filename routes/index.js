var express = require('express');
var router = express.Router();
const testController = require('../controllers/testController.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/name', testController.name);
router.get('/surname', testController.surname);

module.exports = router;
