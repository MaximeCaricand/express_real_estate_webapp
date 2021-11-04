var express = require('express');
var router = express.Router();

/* redirection page /content */
router.get('/', function (req, res, next) {
    res.redirect('/content')
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;