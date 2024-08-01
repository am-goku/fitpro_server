const { Schema, default: mongoose } = require("mongoose");

const UserPlanSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: mongoose.Types.ObjectId,
        ref: 'Plan',
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


const UserPlan = mongoose.model('UserPlan', UserPlanSchema);

module.exports = UserPlan;