const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    workout_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    banner_image: {
        type: String,
    },
    workout_video: {
        type: String,
    },
    workout_keywords: {
        type: String,
    },
    goal_orientation: {
        type: String,
    },
    target_age_group: {
        type: String,
    },
    training_type: {
        type: String,
    },
    location: {
        type: String,
    },
    level: {
        type: String,
    },
    estimated_duration: {
        type: String,
    },
    rest_between_exercises_seconds: {
        type: Number,
    },
    average_calories_burned_per_minute: {
        type: Number,
    },

    categories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'category'
        }
    ]


}, { timestamps: true })



const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;