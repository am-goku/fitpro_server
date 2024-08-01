const { selectWorkoutPlan, updateExerciseCompletion, getWorkoutProgress } = require("../helpers/userPlanHelper");
const responseHandler = require("../utils/responseHandler");


/**
 * Selects a workout plan for a user.
 *
 * @param {Object} req - The request object containing parameters and user information.
 * @param {string} req.params.planID - The ID of the workout plan to select.
 * @param {string} req.userID - The ID of the user selecting the plan.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {Promise} - A promise that resolves to the response data.
 * @throws Will throw an error if the plan selection fails.
 */
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


/**
 * Updates the completion status of an exercise for a user.
 *
 * @param {Object} req - The request object containing parameters and user information.
 * @param {string} req.params.exerciseID - The ID of the exercise to update.
 * @param {string} req.userID - The ID of the user updating the exercise status.
 * @param {Object} req.body - The request body containing the new status.
 * @param {string} req.body.status - The new completion status of the exercise.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {Promise} - A promise that resolves to the response data.
 * @throws Will throw an error if the exercise status update fails.
 */
async function updateProgress(req, res) {
    try {
        const exerciseID = req.params.exerciseID;
        const userID = req.userID;
        const status = req.body.status;
        const setData = req.body.setData;

        const data = await updateExerciseCompletion(exerciseID, userID, status, setData);

        return responseHandler(res, data);
    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


/**
 * Fetches the progress of a user for a specific workout plan.
 *
 * @param {Object} req - The request object containing parameters and user information.
 * @param {string} req.params.planID - The ID of the workout plan to fetch progress for.
 * @param {string} req.userID - The ID of the user fetching the progress.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {Promise} - A promise that resolves to the response data.
 * The response data will contain the progress information for the specified workout plan and user.
 * If an error occurs during the fetch operation, the promise will reject with an error object.
 * The error object will contain a status code (500) and a message indicating the error.
 */
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