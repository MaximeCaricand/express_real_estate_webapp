const User = require('../schema/user.schema');

module.exports.createUser = async (userData) => {
    const user = new User({ ...userData });
    await user.save().catch(saveError => { throw saveError.errors?.email?.kind === 'unique' ? 'Email already exists' : saveError });
}

module.exports.getUser = async (email) => {
    return User.findOne({ email });
}