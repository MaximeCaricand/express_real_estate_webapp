var express = require('express');
const { adService, grantAccess } = require('../lib/index');
var router = express.Router();


/* Create property ad route */
router.get('/', function (req, res, next) {
    res.render('pages/index', { page: 'empty', user: req.user, params: {} });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// content routes
router.get('/create/', grantAccess(true), function (req, res, next) {
    res.render('pages/index', { page: 'create', user: req.user, params: {} });
});

router.post('/create/', grantAccess(true), async function (req, res, next) {
    await adService.createAd(req.body);
    res.redirect('/');
});

module.exports = router;