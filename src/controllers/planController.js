const { createPlan, createWeekPlan, createDayPlan, createExercise } = require("../helpers/workoutPlanHelper");
const responseHandler = require("../utils/responseHandler");


/**
 * Creates a new workout plan based on the provided request body.
 *
 * @param {Object} req - The request object containing the request body.
 * @param {Object} res - The response object to send the response.
 *
 * @returns {Promise} A promise that resolves to the response data or rejects with an error.
 *
 * @throws Will throw an error if the request body is invalid.
 *
 * @example
 * createWorkoutPlan(req, res)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
async function createWorkoutPlan(req, res) {
    try {
        const body = req.body;

        if (!body) return responseHandler(res, { status: 400, message: "Invalid request body" });

        const data = await createPlan(body);

        return responseHandler(res, data)

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}


/**
 * Creates a new weekly plan for a specific workout plan.
 *
 * @param {Object} req - The request object containing the request body.
 * @param {Object} res - The response object to send the response.
 *
 * @returns {Promise} A promise that resolves to the response data or rejects with an error.
 *
 * @throws Will throw an error if the request body is invalid or if the plan ID is missing.
 *
 * @example
 * createWeeklyPlan(req, res)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
async function createWeeklyPlan(req, res) {
    try {
        const { weekNumber, planID } = req.body;

        console.log(planID, weekNumber);

        if (!weekNumber || !planID) return responseHandler(res, { status: 400, message: "Invalid request body or plan ID" });

        const data = await createWeekPlan(weekNumber, planID);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}


/**
* Creates a new daily plan for a specific workout plan.
*
* @param {Object} req - The request object containing the request body.
* @param {Object} res - The response object to send the response.
*
* @returns {Promise} A promise that resolves to the response data or rejects with an error.
* @throws Will throw an error if the request body is invalid.
*
* @example
* createDailyPlan(req, res)
* .then(data => console.log(data))
* .catch(error => console.error(error));
* @function createDailyPlan
 */
async function createDailyPlan(req, res) {
    try {

        const body = req.body;

        if (!body) return responseHandler(res, { status: 400, message: "Invalid request body" });

        const data = await createDayPlan(body)

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}

async function createNewExercise(req, res) {
    try {
        const body = req.body;

        if (!body) return responseHandler(res, { status: 400, message: "Invalid request body" });

        const data = await createExercise(body);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}


module.exports = { createWorkoutPlan, createWeeklyPlan, createDailyPlan, createNewExercise }