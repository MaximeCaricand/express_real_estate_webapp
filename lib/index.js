const mongoose = require('mongoose');
const userService = require('./database/services/user.service');

(async () => {
    await mongoose
        .connect("mongodb://localhost:27017/realEstateDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('connection success'))
        .catch((err) => console.log("connection failure", err));
})()