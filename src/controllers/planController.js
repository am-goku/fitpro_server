const { fetchPlan, updatePlan, deletePlan, updateWeek, updateDay, updateCategory, updateExercise, fetchPlanOverview, createJsonPlan, createPlan } = require("../helpers/planHelper");
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
async function createJsonWorkoutPlan(req, res) {
    try {
        const body = req.body;

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });

        const data = await createJsonPlan(body);

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
 * Creates a new workout plan in the database.
 *
 * @function createWorkoutPlan
 * @param {Object} req - The request object containing the plan data.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if there is a problem with the database operation.
 */
async function createWorkoutPlan(req, res) {
    try {
        const body = req.body;
        const files = req.files;

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });

        const data = await createPlan(files, body);

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
 * Fetches a workout plan overview from the database based on the provided planID.
 *
 * @function fetchWorkoutOverview
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching a workout plan overview with ID 123
 * fetchWorkoutOverview({ query: { planID: 123 } }, res);
 */
async function fetchWorkoutOverview(req, res) {
    try {
        const id = req.query.planID;

        const data = await fetchPlanOverview(id);

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
 * Updates a workout week plan in the database based on the provided weekID.
 *
 * @function updateWorkoutWeekPlan
 * @param {Object} req - The request object containing the weekID and updated week data.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - The response object with status and data.
 *
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if the weekID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Updating a workout week plan with ID 123
 * updateWorkoutWeekPlan({ params: { weekID: 123 }, body: { weekData: "New week data" } }, res);
 */
async function updateWorkoutWeekPlan(req, res) {
    try {
        const id = req.params.weekID;
        const body = req.body;

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });
        if (!id) return responseHandler(res, { status: 200, message: "Invalid weekID." });

        const data = await updateWeek(id, body);

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
 * Updates a workout day plan in the database based on the provided dayID.
 * 
 * @function updateWorkoutDayPlan
 * @param {Object} req - The request object containing the dayID and updated day data.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 * 
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if the dayID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 * 
 * @example
 * // Updating a workout day plan with ID 123
 * updateWorkoutDayPlan({ params: { dayID: 123 }, body: { dayData: "New day data" } }, res);
 */
async function updateWorkoutDayPlan(req, res) {
    try {
        const id = req.params.dayID;
        const body = req.body;

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });
        if (!id) return responseHandler(res, { status: 200, message: "Invalid dayID." });

        const data = await updateDay(id, body);

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
 * Updates a workout category in the database based on the provided categoryID.
 *
 * @function updateWorkoutCategory
 * @param {Object} req - The request object containing the categoryID and updated category data.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if the categoryID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Updating a workout category with ID 123
 * updateWorkoutCategory({ params: { categoryID: 123 }, body: { categoryData: "New category data" } }, res);
 */
async function updateWorkoutCategory(req, res) {
    try {
        const id = req.params.categoryID;
        const body = req.body;

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });
        if (!id) return responseHandler(res, { status: 200, message: "Invalid categoryID." });

        const data = await updateCategory(id, body);

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
 * Updates a workout exercise in the database based on the provided exerciseID.
 *
 * @function updateWorkoutExercise
 * @param {Object} req - The request object containing the exerciseID and updated exercise data.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if the exerciseID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Updating a workout exercise with ID 123
 * updateWorkoutExercise({ params: { exerciseID: 123 }, body: { exerciseData: "New exercise data" } }, res);
 */
async function updateWorkoutExercise(req, res) {
    try {
        const id = req.params.exerciseID;
        const body = req.body;

        if (!body) return responseHandler(res, { status: 200, message: "Invalid request body." });
        if (!id) return responseHandler(res, { status: 200, message: "Invalid exerciseID." });

        const data = await updateExercise(id, body);

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
module.exports = { createJsonWorkoutPlan, createWorkoutPlan, fetchWorkoutPlan, fetchWorkoutOverview, updateWorkoutPlan, deleteWorkoutPlan, updateWorkoutWeekPlan, updateWorkoutDayPlan, updateWorkoutCategory, updateWorkoutExercise }