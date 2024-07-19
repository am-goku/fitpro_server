/**
 * Defines the schema for a Day in a training program.
 * 
 * @module DaySchema
 * @requires mongoose
 * @returns {mongoose.Schema} A mongoose schema for a Day.
 */
const { Schema, default: mongoose, model } = require("mongoose");


/**
 * @typedef {Object} Day
 * @property {number} day - The day number in the training program.
 * @property {string} day_name - The name of the day.
 * @property {string} day_banner_image - The URL of the banner image for the day.
 * @property {string} day_of_week - The day of the week (e.g., Monday, Tuesday).
 * @property {string} estimated_duration - The estimated duration of the day.
 * @property {Category[]} categories - An array of categories for the day.
 */
const DaySchema = new Schema({
    day: {
        type: Number,
        required: true
    },
    day_name: {
        type: String,
        required: false
    },
    day_banner_image: {
        type: String,
        required: false
    },
    day_of_week: {
        type: String,
        required: false
    }, // Monday, Tuesday, etc.
    estimated_duration: {
        type: String,
        required: false
    },
    categories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'category'
        }
    ]
}, { timestamps: true });


const DayPlan = model('dayPlan', DaySchema);
module.exports = DayPlan;