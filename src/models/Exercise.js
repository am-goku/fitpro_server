/**
 * Represents an Exercise model in a MongoDB database.
 * @module Exercise
 * @requires mongoose
 */
const mongoose = require("mongoose");

/**
 * Defines the schema for an Exercise document.
 * @typedef {mongoose.Schema} ExerciseSchema
 * @property {mongoose.Schema.Types.ObjectId} dayPlanID - The ID of the DayPlan this exercise belongs to.
 * @property {string} exerciseName - The name of the exercise.
 * @property {string} type - The type of exercise.
 * @property {string} exerciseA - Additional information about exercise A.
 * @property {string} exerciseB - Additional information about exercise B.
 * @property {boolean} weighted - Indicates if the exercise is weighted.
 * @property {number} sets - The number of sets for the exercise.
 * @property {Array.<number>} reps - The number of repetitions for each set.
 * @property {boolean} timeBased - Indicates if the exercise is time-based.
 * @property {string} setTime - The time for each set if time-based.
 * @property {string} interExerciseRest - The rest time between exercises.
 * @property {string} restTime - The rest time between sets.
 */
const ExerciseSchema = new mongoose.Schema({

    dayPlanID: {
        type: mongoose.Types.ObjectId,
        ref: 'dayPlan',
        required: true
    },

    exerciseName: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    exerciseA: {
        type: String
    },
    exerciseB: {
        type: String
    },
    weighted: {
        type: Boolean,
        default: false
    },
    sets: {
        type: Number,
    },
    reps: [
        {
            type: Number
        }
    ],
    timeBased: {
        type: Boolean,
    },
    setTime: {
        type: String
    },
    interExerciseRest: {
        type: String,
    },
    restTime: {
        type: String,
    }

}, { timestamps: true });

/**
 * Creates a model for the ExerciseSchema.
 * @type {mongoose.Model<mongoose.Document, mongoose.Model<mongoose.Document>>}
 */
const Exercise = mongoose.model('exercise', ExerciseSchema);

/**
 * Exports the Exercise model.
 * @module Exercise
 * @exports Exercise
 */
module.exports = Exercise;