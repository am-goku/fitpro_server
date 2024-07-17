const mongoose = require("mongoose");


/**
 * Schema for a workout plan.
 * 
 * @typedef {Object} WorkoutPlanSchema
 * @property {string} planName - The name of the workout plan.
 * @property {string} category - The category of the workout plan.
 * @property {number} duration - The duration of the workout plan in days.
 * @property {number} daysPerWeek - The number of days per week for the workout plan.
 * @property {string} timePerDay - The time per day for the workout plan.
 * @property {string} level - The level of difficulty for the workout plan.
 * @property {string} [location] - The location for the workout plan.
 * @property {string} [description] - The description of the workout plan.
 * @property {string[]} [uploads] - The uploaded files for the workout plan.
 * @property {mongoose.Types.ObjectId[]} [weekPlans] - The week plans associated with the workout plan.
 */
const workoutPlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    daysPerWeek: {
        type: Number,
        required: true
    },
    timePerDay: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    uploads: {
        type: [String],
        required: false
    },

    // Week plans
    weekPlans: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'weekPlan',
            }
        ],
        required: false
    }

}, { timestamps: true });

/**
 * Creates a Mongoose model for a workout plan.
 * 
 * @type {mongoose.model}
 */
const WorkoutPlan = mongoose.model('workoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;