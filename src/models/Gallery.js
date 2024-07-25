/**
 * Represents a Gallery model in the application.
 * This model is used to store and retrieve information about user galleries.
 *
 * @module models/Gallery
 * @requires mongoose
 */

const { default: mongoose } = require("mongoose");

/**
 * Defines the schema for the Gallery model.
 *
 * @typedef {Object} GallerySchema
 * @property {String} title - The title of the gallery.
 * @property {String} description - The description of the gallery.
 * @property {mongoose.Types.ObjectId} user - The ID of the user who created the gallery.
 * @property {Array.<String>} images - An array of image URLs associated with the gallery.
 */

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

/**
 * Creates and compiles a model from the GallerySchema.
 *
 * @type {mongoose.Model<mongoose.Document, mongoose.Model<mongoose.Document>>}
 */
const Gallery = mongoose.model('Gallery', GallerySchema);

/**
 * Exports the Gallery model.
 *
 * @exports Gallery
 */
module.exports = Gallery;