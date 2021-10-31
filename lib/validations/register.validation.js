const { check } = require('express-validator');

module.exports = [
    email = check('email', 'Invalid email').exists().isEmail(),
    confirmPassword = check('confirmPassword').exists().custom(async (confirmPassword, { req }) => {
        if (req.body.password !== confirmPassword) {
            throw 'Passwords must be the same';
        }
    })
]
