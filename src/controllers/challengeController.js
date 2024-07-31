const { createTask, getTask, updateTask, updateTaskProgress, deleteTask, createChallenge, readChallenges, updateChallenge, deleteChallenge, activateChallenge } = require("../helpers/challengeHelpers");
const responseHandler = require("../utils/responseHandler");


async function create_task(req, res) {
    try {
        const userID = req.userID;
        const body = req.body;

        const data = await createTask(userID, body);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


async function fetch_task(req, res) {
    try {
        const userID = req.userID;
        const taskID = req.query.taskID;

        const data = await getTask(userID, taskID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}

async function update_task(req, res) {
    try {
        const userID = req.userID;
        const taskID = req.params.taskID;
        const body = req.body;

        const data = await updateTask(userID, taskID, body);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}

async function updateProgress(req, res) {
    try {
        const userID = req.userID;
        const taskID = req.params.taskID;

        const data = await updateTaskProgress(userID, taskID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}

async function delete_task(req, res) {
    try {
        const userID = req.userID;
        const taskID = req.params.taskID;

        const data = await deleteTask(userID, taskID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}

/** Challenge Section */

async function create_challenge(req, res) {
    try {
        const userID = req.userID;
        const body = req.body;

        const data = await createChallenge(userID, body);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


async function fetch_challenges(req, res) {
    try {
        const userID = req.userID;
        const challengeID = req.query.challengeID;

        const data = await readChallenges(userID, challengeID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


async function update_challenge(req, res) {
    try {
        const userID = req.userID;
        const challengeID = req.params.challengeID;
        const body = req.body;

        const data = await updateChallenge(userID, challengeID, body);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


async function activate_challenge(req, res) {
    try {
        const userID = req.userID;
        const challengeID = req.params.challengeID;

        const data = await activateChallenge(userID, challengeID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


async function delete_challenge(req, res) {
    try {
        const userID = req.userID;
        const challengeID = req.params.challengeID;

        const data = await deleteChallenge(userID, challengeID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}





const challengeController = { create_challenge, fetch_challenges, update_challenge, delete_challenge, activate_challenge }
const taskControllers = { create_task, update_task, fetch_task, delete_task, updateProgress };

module.exports = { ...taskControllers, ...challengeController }