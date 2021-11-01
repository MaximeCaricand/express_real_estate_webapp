var express = require('express');
var router = express.Router();

/* redirection page /content */
router.get('/', function (req, res, next) {
    res.redirect('/content')
});

module.exports = router;