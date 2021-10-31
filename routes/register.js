const express = require('express');
const bcrypt = require('bcrypt');
const { userService, registerValidation } = require('../lib/index');
const router = express.Router();
const { validationResult } = require('express-validator')


/* GET register page. */
router.get('/', function (req, res, next) {
    res.render('pages/register');
});

router.post('/', [...registerValidation], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/register', { errors: errors.array() });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUserData = {
        ...req.body,
        password: hash
    };
    userService.createUser(newUserData)
        .then(() => res.redirect(301, '/login'))
        .catch(error => {
            if (error === 'Email already exists') {
                return res.render('pages/register', { errors: [{ msg: 'Email already associated to an account' }] });
            }
            return res.status(500).json({ error })
        });
});

module.exports = router;