const { default: mongoose } = require("mongoose");


const TaskSchema = mongoose.Schema({
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
    }, // in minutes or pages
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

})


const ChallengeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        }
    ],
    startDate: {
        type: Date,
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



const ChallengeProgressSchema = mongoose.Schema({
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasksCompleted: [
        {
            tasks: [
                {
                    taskId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Task',
                        required: true
                    },
                    completed: {
                        type: Boolean,
                        default: false
                    }
                }
            ],
            date: {
                type: Date,
                required: true,
                default: () => new Date()
            },
            note: {
                type: String,
                required: false
            }
        }
    ],
    totalTasks: {
        type: Number,
        required: true
    },
}, { timestamps: true })



const Task = mongoose.model('Task', TaskSchema);

const Challenges = mongoose.model('Challenge', ChallengeSchema);

const ChallengeProgress = mongoose.model('ChallengeProgress', ChallengeProgressSchema);

module.exports = { Challenges, ChallengeProgress, Task };