const mongoose = require('mongoose');
module.exports.userService = require('./database/services/user.service');
module.exports.registerValidation = require('./validations/register.validation');

(async () => {
    await mongoose
        .connect("mongodb://localhost:27017/realEstateDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('connection success'))
        .catch((err) => console.log("connection failure", err));
})()