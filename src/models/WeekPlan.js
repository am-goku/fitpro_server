/**
 * Represents a Week Plan model in a MongoDB database.
 * This model is used to store information about a week's plan, including the week number and associated day plans.
 *
 * @module WeekPlan
 * @requires mongoose
 */
const mongoose = require("mongoose");

/**
 * Week Plan schema definition.
 *
 * @typedef {Object} WeekPlanSchema
 * @property {Number} weekNumber - The week number.
 * @property {Array.<mongoose.Types.ObjectId>} dayPlans - An array of ObjectId references to the associated Day Plan documents.
 */
const WeekPlanSchema = new mongoose.Schema({

    weekNumber: {
        type: Number,
        require: true
    },

    dayPlans: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'dayPlan',
            }
        ],
        required: false
    }

}, { timestamps: true })

/**
 * Week Plan model definition.
 *
 * @type {mongoose.Model<mongoose.Document, mongoose.ModelOptions>}
 */
const WeekPlan = mongoose.model('weekPlan', WeekPlanSchema);

/**
 * Exports the Week Plan model.
 *
 * @module WeekPlan
 * @exports WeekPlan
 */
module.exports = WeekPlan;