const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Access = new Schema({

});

Access.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Access', Access, 'access');