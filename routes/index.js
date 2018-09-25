const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/sidebar', (req, res) => {
  res.render('../views/templates/layoutsSidebar.pug');
});

module.exports = router;
