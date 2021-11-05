const { Ad } = require('../schemas/ad.schema');

module.exports.createAd = async (adData, files) => {
    const images = files.map((file, index) => {
        return {
            name: `image_${index + 1}`,
            content: file.data,
            type: file.mimetype,
        }
    });
    const ad = new Ad({
        title: adData.title,
        price: adData.price,
        date: new Date(adData.date).getTime(),
        description: adData.description,
        propertyType: adData.propertyType,
        propertyStatus: adData.propertyStatus,
        publicationStatus: adData.publicationStatus,
        images: images,
    });
    await ad.save().catch(err => { throw err });
}

module.exports.getPublishedAds = async (propertyType) => {
    return Ad.find({ propertyType });
}

module.exports.getAdByID = async (id) => {
    return Ad.findById(id);
}
