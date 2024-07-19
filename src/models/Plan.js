/**
 * Defines the Mongoose schema for a workout plan.
 * 
 * @module Plan
 * @requires mongoose
 */
const mongoose = require('mongoose');


/**
 * Mongoose schema for a workout plan.
 * 
 * @typedef {Object} PlanSchema
 * @property {string} plan_name - The name of the workout plan.
 * @property {string} description - A brief description of the workout plan.
 * @property {string} banner_image - A URL to an image representing the workout plan.
 * @property {string} workout_keywords - Keywords describing the workouts in the plan.
 * @property {Array.<string>} goal_orientation - The goals the workout plan is oriented towards.
 * @property {string} target_age_group - The target age group for the workout plan.
 * @property {string} training_type - The type of training the workout plan is designed for.
 * @property {string} location - The location where the workout plan is suitable for.
 * @property {string} level - The level of difficulty of the workout plan.
 * @property {string} estimated_duration - The estimated duration of the workout plan.
 * @property {number} rest_between_exercises_seconds - The average rest time between exercises in seconds.
 * @property {number} average_calories_burned_per_minute - The average calories burned per minute during the workout plan.
 * @property {Array.<WeekSchema>} weeks - An array of week schemas representing the workouts in the plan.
 */
const PlanSchema = new mongoose.Schema({
    plan_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    banner_image: {
        type: String,
        required: false
    },
    workout_keywords: {
        type: String,
        required: false
    },
    goal_orientation: {
        type: [String],
        required: false
    }, // Flexibility, mobility, abs
    target_age_group: {
        type: String,
        required: false
    }, // 60+
    training_type: {
        type: String,
        required: false
    }, // strength, cardio, HIIT, Strength, Athletic Training
    location: {
        type: String,
        required: false
    }, // Home
    level: {
        type: String,
        required: false
    }, // Beginner, Intermediate, Advanced
    estimated_duration: {
        type: String,
        required: false
    },
    rest_between_exercises_seconds: {
        type: Number,
        required: false
    },
    average_calories_burned_per_minute: {
        type: Number,
        required: false
    },
    weeks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'weekPlan'
        }
    ]
}, { timestamps: true });


/**
 * Creates a Mongoose model for a workout plan.
 * 
 * @function Plan
 * @param {mongoose.Connection} connection - The Mongoose connection to use.
 * @param {PlanSchema} schema - The Mongoose schema for the workout plan.
 * @returns {mongoose.Model<PlanDocument>} - The Mongoose model for the workout plan.
 * 
 * @example
 * const mongoose = require('mongoose');
 * const PlanSchema = require('./PlanSchema');
 * const connection = mongoose.createConnection('mongodb://localhost/workoutDB');
 * const Plan = Plan(connection, PlanSchema);
 */
const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;