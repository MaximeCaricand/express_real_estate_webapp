const express = require('express');
const passport = require('passport');
const { userService, registerValidation } = require('../lib/index');
const router = express.Router();
const { validationResult } = require('express-validator')

/* GET register page. */
router.get('/', function (req, res, next) {
    res.render('pages/register');
});

router.post('/', [...registerValidation], async function (req, res, next) {
    const errors = validationResult(req);
    res.locals.email = req.body.email;
    res.locals.firstname = req.body.firstname;
    res.locals.lastname = req.body.lastname;
    if (!errors.isEmpty()) {
        return res.render('pages/register', { errors: errors.array() });
    }
    await userService.registerUser({ ...req.body }, req.body.password)
        .then(() => res.redirect(301, '/login'))
        .catch(err => {
            if (err === 'Email already exists') {
                return res.render('pages/register', { errors: [{ msg: 'Email already associated to an account' }] });
            }
            return res.status(500).json({ err })
        });
});

module.exports = router;