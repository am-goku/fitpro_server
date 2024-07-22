/**
 * Defines the Mongoose schema for a week, which includes the week number and an array of DaySchema.
 * This schema is used to model and interact with week data in a MongoDB database.
 *
 * @module WeekSchema
 * @requires mongoose
 */
const mongoose = require("mongoose");
const { Schema, model } = require('mongoose')

/**
 * @typedef {Object} Week
 * @property {number} week - The week number.
 */

/**
 * @type {mongoose.Schema}
 */
const WeekSchema = new Schema({
    week: {
        type: Number,
        required: true
    },
    days: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'dayPlan'
            }
        ]
    }
}, { timestamps: true });


const WeekPlan = model('weekPlan', WeekSchema);
module.exports = WeekPlan;