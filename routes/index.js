var express = require('express');
const { adService, grantAccess, formatDate } = require('../lib/index');
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
    const ads = await adService.getPublishedAds('Sale') ?? [];
    res.render('pages/index', { page: 'ads', user: req.user, params: { ads, type: 'sale' } });
});

/* GET location ads page. */
router.get('/content/rent', async function (req, res, next) {
    const ads = await adService.getPublishedAds('Rent') ?? [];
    res.render('pages/index', { page: 'ads', user: req.user, params: { ads, type: 'rent' } });
});

/* GET details ads page. */
router.get('/content/detail', async function (req, res, next) {
    const ad = await adService.getAdByID(req.query.id) ?? {};
    res.render('pages/index', { page: 'detail', user: req.user, params: { ad } });
});

// get ad create form template
router.get('/content/create', grantAccess(['agent']), function (req, res, next) {
    res.render('pages/index', { page: 'adForm', user: req.user, params: {} });
});

// Create an ad
router.post('/content/create', grantAccess(['agent']), async function (req, res, next) {
    const images = req.files?.images ?? [];
    const newAd = await adService.createAd(req.body, [...images], req.user);
    if (newAd?.publicationStatus === 'Published') {
        return res.redirect(`/content/detail?id=${newAd.id}`);
    }
    return res.redirect('/content/my-ads');
});

// get my ads template
router.get('/content/my-ads', grantAccess(['agent']), async function (req, res, next) {
    const ads = await adService.getAdsByUserID(req.user.id) ?? [];
    res.render('pages/index', { page: 'myAds', user: req.user, params: { ads } });
});

// search an ad from my ads
router.post('/content/my-ads/search', grantAccess(['agent']), function (req, res, next) {
    return res.redirect(`/content/detail?id=${req.body.id}`);
});

// ask for update an ad from my ads
router.post('/content/my-ads/update', grantAccess(['agent']), async function (req, res, next) {
    if (req.body.id) {
        const ad = await adService.getAdByIDAndUserID(req.body.id, req.user.id);
        if (ad) {
            res.locals.formData = {
                title: ad.title,
                price: ad.price,
                date: formatDate(ad.date), // format date for date type default value
                description: ad.description,
                propertyType: ad.propertyType,
                propertyStatus: ad.propertyStatus,
                publicationStatus: ad.publicationStatus
            };
            return res.render('pages/index', { page: 'adForm', user: req.user, params: { id: ad.id } });
        }
    }
    return res.redirect('/');
});

// confirm update
router.post('/content/my-ads/confirmUpdate', grantAccess(['agent']), async function (req, res, next) {
    await adService.updateById(req.body.id, req.user.id, req.body);
    return res.redirect('/content/my-ads');
});

// delete an ad from my ads
router.post('/content/my-ads/delete', grantAccess(['agent']), async function (req, res, next) {
    if (req.body.id) {
        await adService.deleteAdByID(req.body.id, req.user.id);
    }
    return res.redirect('back');
});

// Create a question
router.post('/content/detail/question', grantAccess(['agent', 'user']), async function (req, res, next) {
    const id = req.body.id;
    const content = req.body.question;
    if (id && content) {
        await adService.addQuestion(id, content, req.user);
    }
    res.redirect('back');
});

// Create a response to a question
router.post('/content/detail/answser', grantAccess(['agent']), async function (req, res, next) {
    const id = req.body.id;
    const content = req.body.answser;
    const questionIndex = req.body.questionIndex;
    if (id && content && questionIndex) {
        await adService.addAnswser(id, content, questionIndex, req.user);
    }
    res.redirect('back');
});


module.exports = router;
