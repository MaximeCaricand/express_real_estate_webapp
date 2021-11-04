const { Ad } = require('../schemas/ad.schema');

module.exports.createAd = async (adData) => {
    const ad = new Ad({
        title: adData.title,
        price: adData.price,
        date: new Date(adData.date).getTime(),
        description: adData.description,
        propertyType: adData.propertyType,
        propertyStatus: adData.propertyStatus,
        publicationStatus: adData.publicationStatus
    });
    await ad.save().catch(err => { throw err });
}