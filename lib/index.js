const mongoose = require('mongoose');
module.exports.userService = require('./services/user.service');
module.exports.registerValidation = require('./validations/register.validation');
module.exports.auth = require('./middleware/auth');


module.exports.connect = async () => {
    try {
        await mongoose
            .connect("mongodb://localhost:27017/realEstateDB", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        return console.log('connection success');
    } catch (err) {
        return console.log("connection failure", err);
    }
}