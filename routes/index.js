var express = require('express');
const { adService, grantAccess } = require('../lib/index');
var router = express.Router();

/* Redirect home page. */
router.get('/', function (req, res, next) {
    res.redirect('/content');
});

/* GET home page. */
router.get('/content', function (req, res, next) {
    res.render('pages/index', { user: req.user });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

/* GET sold ads page. */
router.get('/content/sale', async function (req, res, next) {
    const ads = await adService.getPublishedAds('Sale') ?? {};
    res.render('pages/index', { page: 'ads', user: req.user, params: { ads } });
});

/* GET location ads page. */
router.get('/content/rent', async function (req, res, next) {
    const ads = await adService.getPublishedAds('Rent') ?? {};
    res.render('pages/index', { page: 'ads', user: req.user, params: { ads } });
});

/* GET details ads page. */
router.get('/content/detail', async function (req, res, next) {
    const ad = await adService.getAdByID(req.query.id) ?? {};
    console.log(ad);
    res.render('pages/index', { page: 'detail', user: req.user, params: { ad } });
});

// content routes
router.get('/content/create', grantAccess(true), function (req, res, next) {
    res.render('pages/index', { page: 'create', user: req.user, params: {} });
});

router.post('/content/create', grantAccess(true), async function (req, res, next) {
    await adService.createAd(req.body, [...req.files.images]);
    res.redirect('/');
});

module.exports = router;