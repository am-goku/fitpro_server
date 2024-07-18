/**
 * Defines the Mongoose schema for a week, which includes the week number and an array of DaySchema.
 * This schema is used to model and interact with week data in a MongoDB database.
 *
 * @module WeekSchema
 * @requires mongoose
 * @requires ./DayPlan
 * @returns {mongoose.Schema} WeekSchema - A Mongoose schema for a week.
 */
const { Schema } = require("mongoose");
const DaySchema = require("./DayPlan");


/**
 * @typedef {Object} Week
 * @property {number} week - The week number.
 * @property {DaySchema[]} days - An array of DaySchema.
 */

/**
 * @type {mongoose.Schema}
 */
const WeekSchema = new Schema({
    week: {
        type: Number,
        required: true
    },
    days: [DaySchema]
}, { timestamps: true });

module.exports = WeekSchema;