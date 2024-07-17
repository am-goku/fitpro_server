const mongoose = require("mongoose");

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