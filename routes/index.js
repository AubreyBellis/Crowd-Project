var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('homepage index test')
  // res.send('HOMEPAGE')
  res.render('index', { title: 'Crowded!' });
});

module.exports = router;
