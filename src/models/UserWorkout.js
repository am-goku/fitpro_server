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
            exerciseID: {
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