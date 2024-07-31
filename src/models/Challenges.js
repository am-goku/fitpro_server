const { default: mongoose } = require("mongoose");


const TaskSchema = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            enum: ['mins', 'seconds', 'hours', 'litre', 'steps', 'pages'],
            required: true
        }
    },

    progress: [
        {
            status: {
                type: Boolean,
                required: true,
                default: false
            },

            date: {
                type: String,
                required: true,
            }
        }
    ],

    completed: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


const ChallengeSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User', required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }, // in days
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Task',
            required: true
        }
    ],
    startDate: {
        type: Date,
        set: value => new Date(value),
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    beforeAndAfter: {
        type: {
            before: {
                image: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            },
    
            after: {
                image: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        },
        required: false
    },

}, { timestamps: true });



ChallengeSchema.methods.calculateEndDate = function () {
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate() + this.duration);
};


ChallengeSchema.methods.activateChallenge = async function () {
    // Deactivate any other active challenges for this user
    await mongoose.model('Challenge').updateMany(
        { userId: this.userId, active: true },
        { active: false }
    );

    // Activate this challenge
    this.active = true;
    this.startDate = new Date();
    this.calculateEndDate();
    await this.save();
};



const Task = mongoose.model('Task', TaskSchema);

const Challenges = mongoose.model('Challenge', ChallengeSchema);

module.exports = { Challenges, Task };