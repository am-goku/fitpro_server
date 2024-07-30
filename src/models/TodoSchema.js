/**
 * Defines the schema for a Todo & LifeGoals document in MongoDB using Mongoose.
 *
 * @module models/Todo
 * @module models/LifeGoals
 * @requires mongoose
 */

const mongoose = require('mongoose');

/**
 * Represents a Todo document.
 *
 * @typedef {Object} Todo
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who created the Todo.
 * @property {string} title - The title of the Todo.
 * @property {string} description - The description of the Todo.
 * @property {Array.<string>} tags - An array of tags associated with the Todo.
 * @property {number} priority - The priority of the Todo (1: low, 2: medium, 3: high).
 * @property {Array.<string>} day - An array of days on which the Todo is scheduled.
 * @property {Object} time - The time at which the Todo is scheduled.
 * @property {number} time.hour - The hour of the scheduled time.
 * @property {number} time.minute - The minute of the scheduled time.
 * @property {string} time.am_pm - The AM/PM indicator of the scheduled time.
 * @property {boolean} isCompleted - Indicates whether the Todo is completed or not.
 * @property {Date} createdAt - The timestamp of when the Todo was created.
 * @property {Date} updatedAt - The timestamp of when the Todo was last updated.
 */

const TodoSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tags: [
        {
            type: String,
            required: false
        }
    ],
    priority: {
        type: Number,
        enum: [1, 2, 3]
    },
    day: [
        {
            type: String,
            enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Weekly', 'Daily'],
        }
    ],
    time: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
        am_pm: { type: String, required: true },
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: false
    }
}, { timestamps: true });


/**
 * Represents a LifeGoals document.
 *
 * @typedef {Object} LifeGoals
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who created the LifeGoals.
 * @property {string} title - The title of the LifeGoals.
 * @property {string} description - The description of the LifeGoals.
 * @property {Array.<string>} tags - An array of tags associated with the LifeGoals.
 * @property {number} priority - The priority of the LifeGoals (1: low, 2: medium, 3: high).
 * @property {Date} deadline - The deadline for completing the LifeGoals.
 * @property {boolean} completed - Indicates whether the LifeGoals is completed or not.
 * @property {Date} createdAt - The timestamp of when the LifeGoals was created.
 * @property {Date} updatedAt - The timestamp of when the LifeGoals was last updated.
 */
const LifeGoalsSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tags: [
        {
            type: String,
            required: false
        }
    ],
    priority: {
        type: Number,
        enum: [1, 2, 3]
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    }
}, { timestamps: true });



/**
 * Creates a model for the Todo schema.
 *
 * @type {mongoose.Model<Todo>}
 */
const Todo = mongoose.model('Todo', TodoSchema);

/**
 * Creates a model for the Todo schema.
 *
 * @type {mongoose.Model<Todo>}
 */
const LifeGoals = mongoose.model('LifeGoals', LifeGoalsSchema);

/**
 * Exports the Todo model.
 *
 * @module models/{Todo, LifeGoals}
 * @exports {Todo, LifeGoals}
 */
module.exports = { Todo, LifeGoals };