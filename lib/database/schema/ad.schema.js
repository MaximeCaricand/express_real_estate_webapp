const { mongoose } = require('../../index');
const Schema = mongoose.Schema;
const adSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, default: mongoose.ObjectId },
        title: { type: String, required: true },
        type: { type: String, required: true },
        publicationStatus: { type: String, required: true },
        propertyStatus: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        availabilityDate: { type: String, required: true },
        pictures: { type: [Buffer] },
        comments: [{
            question: { type: String },
            answers: [String]
        }]
    }
);
module.exports.Ad = mongoose.model('Ad', adSchema);