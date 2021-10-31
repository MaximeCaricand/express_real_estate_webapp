const express = require('express');
const bcrypt = require('bcrypt');
const userService = require('../lib/database/services/user.service');
const router = express.Router();


/* GET register page. */
router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', async function (req, res, next) {
    await bcrypt.hash(req.body.password, 10);
    const newUserData = {
        ...req.body,
        password: hash
    };
    userService.createUser(newUserData)
        .then(() => res.status(201))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;