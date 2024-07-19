/**
 * Defines the Mongoose schema for a category within a workout plan.
 * This schema is used to structure and validate the data for each category.
 *
 * @module CategorySchema
 * @requires mongoose
 * @returns {mongoose.Schema} A Mongoose schema for a category.
 */
const { Schema } = require("mongoose");
const mongoose = require("mongoose");


/**
 * @typedef {Object} Category
 * @property {string} sub_category - The type of workout category (e.g., Warm up, Training, Superset, Circuit, Cool down).
 * @property {number} [circuit_rest_time] - The rest time between sets in a circuit workout (optional).
 * @property {number} [circuit_reps] - The number of repetitions for each exercise in a circuit workout (optional).
 * @property {Exercise[]} exercises - An array of Exercise objects.
 */
const CategorySchema = new Schema({
    sub_category: {
        type: String,
        required: true
    }, // Warm up, Training, Superset, Circuit, Cool down
    circuit_rest_time: {
        type: Number,
        required: false
    },
    circuit_reps: {
        type: Number,
        required: false
    },
    exercises: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'exercise'
        }
    ]
}, { timestamps: true });

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;