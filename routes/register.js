var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
    res.render('pages/register');
});

module.exports = router;