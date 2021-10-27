const { mongoose } = require('../../index');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: mongoose.ObjectId },
    username: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    postalcode: { type: Number },
    situation: { type: String },
    preference: { type: String },
    admin: { type: Boolean, required: true }
});
module.exports.User = mongoose.model('User', userSchema);