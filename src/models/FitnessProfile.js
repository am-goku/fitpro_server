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
    },

    progressCards: [
        {
            image: {
                type: String,
                required: true
            },

            date: {
                type: String,
                required: true
            }
        }
    ],



    // USER MEASUREMENTS
    weight: [
        {
            unit: {
                type: String,
                required: true,
                enum: ["kg", "lb"]
            },
            value: {
                type: Number,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],


    height: [
        {
            unit: {
                type: String,
                required: true,
                enum: ["cm", "ft"]
            },
            value: {
                type: Number,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],

    biceps: [
        {
            unit: {
                type: String,
                required: true,
                enum: ["cm", "inch"]
            },
            value: {
                type: Number,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],

    waist: [
        {
            unit: {
                type: String,
                required: true,
                enum: ["cm", "inch"]
            },
            value: {
                type: Number,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],

    chest: [
        {
            unit: {
                type: String,
                required: true,
                enum: ["cm", "inch"]
            },
            value: {
                type: Number,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],

    thigh: [
        {
            unit: {
                type: String,
                required: true,
                enum: ["cm", "inch"]
            },
            value: {
                type: Number,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],


}, { timestamps: true });


const FitnessProfile = mongoose.model('fitnessProfile', FitnessProfileSchema);

module.exports = FitnessProfile;