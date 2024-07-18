/**
 * Defines the schema for a Day in a training program.
 * 
 * @module ExerciseSchema
 * @requires mongoose
 * @returns {mongoose.Schema} A mongoose schema for a Day.
 */
const { Schema } = require("mongoose");

/**
 * Defines the schema for an exercise in a fitness application.
 * 
 * @typedef {import('mongoose').Schema} Schema
 * 
 * @returns {Schema} A Mongoose schema for an exercise.
 */
const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercise_number: {
        type: Number,
        required: false
    },
    exercise_type: {
        type: String,
        required: false
    },  // Normal, Dropset, Superset
    time_based: {
        type: String,
        required: false
    },
    weighted: {
        type: String,
        required: false
    },
    sets: {
        type: Number,
        required: false
    },
    reps: {
        type: [Number],
        required: false
    },
    set_time: {
        type: String,
        required: false
    },
    superset_names: {
        type: [String],
        required: false
    },
    rest_time: {
        type: Number,
        required: false
    },
    video_url: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = ExerciseSchema;