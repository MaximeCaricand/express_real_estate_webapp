const express = require('express');
const { auth } = require('../lib/index');
const router = express.Router();

/* GET login listing. */
router.get('/', function (req, res, next) {
    res.render('pages/login');
});

router.post('/', auth, async function (req, res, next) {
    res.redirect('/');
});


module.exports = router;