const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const UserWorkoutSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workout: {
        type: mongoose.Types.ObjectId,
        ref: 'Workout',
        required: true
    },
    exercises: [
        {
            exercise: {
                type: mongoose.Types.ObjectId,
                ref: 'exercise',
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            completion_date: {
                type: Date,
                required: false,
            }
        }
    ],
    completedCategories: [
        {
            type: mongoose.Types.ObjectId,
            required: false
        }
    ],
    calories: {
        type: Number,
        required: false,
    },
    minutes: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    completedExercises: {
        type: Number,
        default: 0
    },
    totalExercises: {
        type: Number,
        required: true
    },
    completionPercentage: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const UserWorkout = mongoose.model('UserWorkout', UserWorkoutSchema);

module.exports = UserWorkout;