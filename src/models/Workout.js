const { Schema, default: mongoose } = require("mongoose");

const UserWorkoutSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    plan: { type: mongoose.Types.ObjectId, ref: 'Plan', required: true },
    weeks: [{ type: mongoose.Types.ObjectId, ref: 'UserWeekProgress' }],
    completedExercises: { type: Number, default: 0 },
    totalExercises: { type: Number, required: true },
    completionPercentage: { type: Number, default: 0 }
}, { timestamps: true });

const UserWeekProgressSchema = new Schema({
    week: { type: mongoose.Types.ObjectId, ref: 'weekPlan', required: true },
    days: [{ type: mongoose.Types.ObjectId, ref: 'UserDayProgress' }]
}, { timestamps: true });

const UserDayProgressSchema = new Schema({
    day: { type: mongoose.Types.ObjectId, ref: 'dayPlan', required: true },
    categories: [{ type: mongoose.Types.ObjectId, ref: 'UserCategoryProgress' }]
}, { timestamps: true });

const UserCategoryProgressSchema = new Schema({
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    exercises: [{ type: mongoose.Types.ObjectId, ref: 'UserExerciseProgress' }]
}, { timestamps: true });

const UserExerciseProgressSchema = new Schema({
    exercise: { type: mongoose.Types.ObjectId, ref: 'exercise', required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: true });


const UserWorkout = mongoose.model('UserWorkout', UserWorkoutSchema);
const UserWeekProgress = mongoose.model('UserWeekProgress', UserWeekProgressSchema);
const UserDayProgress = mongoose.model('UserDayProgress', UserDayProgressSchema);
const UserCategoryProgress = mongoose.model('UserCategoryProgress', UserCategoryProgressSchema);
const UserExerciseProgress = mongoose.model('UserExerciseProgress', UserExerciseProgressSchema);


module.exports = {UserWorkout, UserWeekProgress, UserDayProgress, UserCategoryProgress, UserExerciseProgress};