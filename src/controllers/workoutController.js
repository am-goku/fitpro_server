const { selectWorkoutPlan, updateExerciseCompletion, getWorkoutProgress } = require("../helpers/workoutHelper");
const responseHandler = require("../utils/responseHandler");


async function selectPlan(req, res) {
    try {
        const planID = req.params.planID;
        const userID = req.userID;

        const data = await selectWorkoutPlan(planID, userID);

        return responseHandler(res, data);
    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


async function updateProgress(req, res) {
    try {
        const exerciseID = req.params.exerciseID;
        const userID = req.userID;

        const data = await updateExerciseCompletion(exerciseID, userID);

        return responseHandler(res, data);
    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


async function fetchProgress(req, res) {
    try {
        const planID = req.params.planID;
        const userID = req.userID;

        const data = await getWorkoutProgress(userID, planID);

        return responseHandler(res, data);
    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


module.exports = { selectPlan, updateProgress, fetchProgress };