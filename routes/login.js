const lib = require('../lib/index');
var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function (req, res, next) {
  res.render('pages/login');
});

module.exports = router;