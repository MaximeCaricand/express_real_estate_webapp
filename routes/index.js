var express = require('express');
const { auth } = require('../lib/index');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/index', { user: req.user });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;