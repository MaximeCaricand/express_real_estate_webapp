const User = require('../schemas/user.schema');

module.exports.registerUser = async (userData, password) => {
    const user = new User({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname
    });
    return new Promise((resolve, reject) => {
        User.register(user, password, function (err, account) {
            if (err) {
                reject(error.message === 'A user with the given username is already registered' ? 'Email already exists' : error);
            }
            resolve(account);
        });
    });
}

module.exports.getUser = async (email) => {
    return User.findOne({ email });
}