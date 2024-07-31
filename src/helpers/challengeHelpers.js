const { Task, Challenges } = require("../models/Challenges");
const { convertDate } = require("../service/dateService");



async function createTask(userID, body) {
    try {
        const newTask = new Task({
            userID,
            ...body
        });

        const task = await newTask.save();

        return {
            status: 201,
            message: "Task created successfully",
            task,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}

async function getTask(userID, taskID) {
    try {
        const query = { userID };

        if (taskID) {
            query._id = taskID;
        }

        const tasks = await Task.find(query);

        return {
            status: 200,
            message: "Task fetched successfully",
            tasks,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}

async function updateTask(userID, taskID, body) {
    try {
        const task = await Task.findOneAndUpdate(
            { userID, _id: taskID },
            { $set: { ...body } },
            { new: true }
        );

        if (!task) {
            return {
                status: 404,
                message: "Task not found"
            }
        }

        return {
            status: 200,
            message: "Task updated successfully",
            task,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}

async function updateTaskProgress(userID, taskID) {
    try {
        const task = await Task.findOne({ userID, _id: taskID });

        if (!task) {
            return { status: 400, message: 'Task not found' };
        }

        const currentDate = new Date();

        const dateString = convertDate(currentDate)

        let flag = false;
        if (task.progress?.length) {
            for (let key = 0; key < task.progress.length; key++) {
                if (task.progress[key].date === dateString) {
                    task.progress[key].status = !task.progress[key].status;
                    flag = true;
                    break;
                }
            }
        }

        if (!flag) {
            task.progress.push({ status: true, date: dateString });
        }

        await task.save();

        return {
            status: 200,
            message: "Progress updated successfully",
            task,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}

async function deleteTask(userID, taskID) {
    try {
        await Task.deleteOne({ userID, _id: taskID });

        return {
            status: 200,
            message: "Task deleted successfully",
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


/** Challenge Section */


async function createChallenge(userID, body) {
    try {
        const challenge = new Challenges({
            userID: userID,
            ...body
        });

        // Set the end date before saving the challenge
        challenge.calculateEndDate();

        const newChallenge = await challenge.save();

        await newChallenge.populate('tasks')

        return {
            status: 200,
            message: "Challenge created successfully",
            challenge: newChallenge,
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        };
    }
}

async function readChallenges(userID, challengeID) {
    try {
        const query = { userID };

        if (challengeID) query._id = challengeID;

        const challenges = await Challenges.find(query).populate('tasks');

        return {
            status: 200,
            message: "Challenges retrieved successfully",
            challenges,
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}

async function updateChallenge(userID, challengeID, body) {
    try {
        const challenge = await Challenges.findOneAndUpdate(
            { userID, _id: challengeID },
            { $set: body },
            { new: true }
        );
        if (!challenge) return { status: 404, message: "Challenge not found" };

        challenge.calculateEndDate();

        await challenge.save();

        return {
            status: 200,
            message: "Challenge updated successfully",
            challenge,
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}

async function activateChallenge(userID, challengeID) {
    try {
        const challenge = await Challenges.findOne({ userID, _id: challengeID });

        if (!challenge) {
            return { status: 404, message: "Challenge not found" }
        }

        await challenge.activateChallenge();

        return {
            status: 200,
            message: "Challenge activated successfully",
            challenge,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}

async function deleteChallenge(userID, challengeID) {
    try {
        // Find the challenge by userID and challengeID
        const challenge = await Challenges.findOne({ userID, _id: challengeID });

        if (!challenge) return { status: 404, message: "Challenge not found" };

        // Delete all tasks associated with this challenge
        await Task.deleteMany({ _id: { $in: challenge.tasks } });

        // Delete the challenge itself
        await Challenges.deleteOne({ userID, _id: challengeID });

        return {
            status: 200,
            message: "Challenge deleted successfully",
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        };
    }
}



const taskHelpers = { createTask, getTask, updateTask, updateTaskProgress, deleteTask }
const challengeHelpers = { createChallenge, readChallenges, updateChallenge, activateChallenge, deleteChallenge }
module.exports = { ...taskHelpers, ...challengeHelpers }