const mongoose = require('mongoose');


const FitnessProfileSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    bookmarks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'dayPlan'
        }
    ],

    transformations: {
        before: {
            type: String,
            required: false
        },

        after: {
            type: String,
            required: false
        },

        before_date: {
            type: String,
            required: false,
        }
    }

}, { timestamps: true });


const FitnessProfile = mongoose.model('fitnessProfile', FitnessProfileSchema);

module.exports = FitnessProfile;