var express = require('express');
const bcrypt = require('bcrypt');
const { userService } = require('../lib/index');
var router = express.Router();

/* GET login listing. */
router.get('/', function (req, res, next) {
    res.render('pages/login');
});

router.post('/', async function (req, res, next) {
    const user = await userService.getUser(req.body.email);
    if (user) {
        const passwordIsValid = await bcrypt.compare(req.body.password, user.hash);
        if (passwordIsValid) {
            return res.redirect('../')
        }
    }
    return res.render('pages/login', { error: 'Invalid email or password' });
});


module.exports = router;