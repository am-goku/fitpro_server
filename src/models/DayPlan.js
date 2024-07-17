/**
 * Represents a DayPlan model in a MongoDB database.
 * This model is used to store information about daily plans in a fitness application.
 * 
 * @module models/DayPlan
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * Defines the schema for a DayPlan document.
 * 
 * @typedef {mongoose.Schema} DayPlanSchema
 * @property {mongoose.Schema.Types.ObjectId} weekPlanID - The ID of the WeekPlan this DayPlan belongs to.
 * @property {Number} dayNumber - The number of the day in the week.
 * @property {String} dayName - The name of the day.
 * @property {String} duration - The duration of the day plan.
 * @property {String} subCategory - The subcategory of the day plan.
 * @property {String} bannerImage - The URL of the banner image for the day plan.
 * @property {String} introVideo - The URL of the introductory video for the day plan.
 * @property {Array.<mongoose.Schema.Types.ObjectId>} exercises - An array of exercise IDs associated with the day plan.
 */
const DayPlanSchema = new mongoose.Schema({

    weekPlanID: {
        type: mongoose.Types.ObjectId,
        ref: 'weekPlan',
        required: true
    },
    dayNumber: {
        type: Number,
        required: true
    },
    dayName: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    subCategory: {
        type: String,
        required: false
    },
    bannerImage: {
        type: String,
        required: false
    },
    introVideo: {
        type: String,
        required: false
    },

    //Exercises
    exercises: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'exercise',
            }
        ],
        required: false
    }

}, { timestamps: true });

/**
 * Creates a DayPlan model from the DayPlanSchema.
 * 
 * @type {mongoose.Model<mongoose.Document>}
 */
const DayPlan = mongoose.model('dayPlan', DayPlanSchema);

/**
 * Exports the DayPlan model.
 * 
 * @exports DayPlan
 */
module.exports = DayPlan;