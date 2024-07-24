const { default: mongoose } = require("mongoose");

const GallerySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [{
        type: String,
    }]

}, { timestamps: true });

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;