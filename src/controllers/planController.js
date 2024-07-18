const { createPlan, fetchPlan, updatePlan, deletePlan } = require("../helpers/planHelper");
const responseHandler = require("../utils/responseHandler");


/**
 * Creates a new workout plan.
 *
 * @param {Object} req - The request object containing the plan data.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - The response object with status and message.
 *
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if there is a problem with the database operation.
 */
async function createWorkoutPlan(req, res) {
    try {
        const body = req.body;

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });

        const data = await createPlan(body);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return responseHandler(res, data);
    }
}


/**
 * Fetches a workout plan from the database based on the provided planID.
 *
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - The response object with status and data.
 *
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching a workout plan with ID 123
 * fetchWorkoutPlan({ query: { planID: 123 } }, res);
 */
async function fetchWorkoutPlan(req, res) {
    try {
        const id = req.query.planID;

        const data = await fetchPlan(id);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return responseHandler(res, data);
    }
}


/**
 * Updates a workout plan in the database based on the provided planID.
 *
 * @param {Object} req - The request object containing the planID and updated plan data.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - The response object with status and data.
 *
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if the planID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Updating a workout plan with ID 123
 * updateWorkoutPlan({ params: { planID: 123 }, body: { planData: "New plan data" } }, res);
 */
async function updateWorkoutPlan(req, res) {
    try {
        const id = req.params.planID;
        const body = req.body;

        console.log(id);

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });
        if (!id) return responseHandler(res, { status: 200, message: "Invalid planID." });

        const data = await updatePlan(id, body);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return responseHandler(res, data);
    }
}


/**
 * Deletes a workout plan from the database based on the provided planID.
 *
 * @param {Object} req - The request object containing the planID.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - The response object with status and data.
 *
 * @throws Will throw an error if the planID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Deleting a workout plan with ID 123
 * deleteWorkoutPlan({ params: { planID: 123 } }, res);
 */
async function deleteWorkoutPlan(req, res) {
    try {
        const id = req.params.planID;

        if (!id) return responseHandler(res, { status: 200, message: "Invalid planID." });

        const data = await deletePlan(id);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return responseHandler(res, data);
    }
}


/**
 * Exports the functions for managing workout plans.
 *
 * @module controllers/planController
 */
module.exports = { createWorkoutPlan, fetchWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan }