const { fetchPlan, updatePlan, deletePlan, updateWeek, updateDay, updateCategory, updateExercise, fetchPlanOverview, createJsonPlan, createPlan, setFeaturedPlanStatus, setTrendingPlanStatus, getTrendingPlans, getFeaturedPlans, addWeek, addDay, addCategory, addExercise } = require("../helpers/planHelper");
const responseHandler = require("../utils/responseHandler");



/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////CREATE PLANS SECTION//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

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
 * Creates a new week plan within a specific workout plan.
 *
 * @function createWeekPlan
 * @param {Object} req - The request object containing the planID and the week data.
 * @param {Object} req.params - The parameters object containing the planID.
 * @param {number} req.params.planID - The ID of the workout plan.
 * @param {Object} req.body - The body object containing the week data.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 * @throws Will throw an error if there is a problem with the database operation.
 */
async function createWeekPlan(req, res) {
    try {
        const planID = req.params.planID;
        const body = req.body;

        const data = await addWeek(planID, body);

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
 * Creates a new day plan within a specific week.
 *
 * @function createDayPlan
 * @param {Object} req - The request object containing the weekID, day data, and file data.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the weekID is not provided.
 * @throws Will throw an error if the request body is invalid.
 * @throws Will throw an error if there is a problem with the database operation.
 */
async function createDayPlan(req, res) {
    try {
        const weekID = req.params.weekID;
        const body = req.body;
        const files = req.files;

        const data = await addDay(weekID, body, files);

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
 * Creates a new category within a specific day of a workout plan.
 *
 * @function createCategory
 * @param {Object} req - The request object containing the dayID and category data.
 * @param {number} req.params.dayID - The ID of the day within the workout plan.
 * @param {Object} req.body - The data for the new category.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the dayID or category data is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 */
async function createCategory(req, res) {
    try {
        const dayID = req.params.dayID;
        const body = req.body;

        const data = await addCategory(dayID, body);

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
 * Creates a new exercise in a workout plan category.
 *
 * @function createExercise
 * @param {Object} req - The request object containing the categoryID, exercise data, and files.
 * @param {number} req.params.categoryID - The ID of the category where the exercise will be created.
 * @param {Object} req.body - The exercise data to be created.
 * @param {Object} req.files - The files associated with the exercise.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the categoryID, exercise data, or files are not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 */
async function createExercise(req, res) {
    try {
        const categoryID = req.params.categoryID;
        const body = req.body;
        const files = req.files;

        const data = await addExercise(categoryID, body, files);

        return responseHandler(res, data);
    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return responseHandler(res, data);
    }
}


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////FETCH PLANS SECTION///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////UPDATE PLANS SECTION//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////TRENDING AND FEATURED PLANS///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/**
 * Adds a featured status to a workout plan in the database.
 *
 * @function addFeaturedPlan
 * @param {Object} req - The request object containing the planID.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the planID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Adding featured status to a workout plan with ID 123
 * addFeaturedPlan({ params: { planID: 123 } }, res);
 */
async function addFeaturedPlan(req, res) {
    try {
        const planID = req.params.planID;

        const data = await setFeaturedPlanStatus(planID);

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
 * Adds a trending status to a workout plan in the database.
 *
 * @function addTrendingPlan
 * @param {Object} req - The request object containing the planID.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the planID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Adding trending status to a workout plan with ID 123
 * addTrendingPlan({ params: { planID: 123 } }, res);
 */
async function addTrendingPlan(req, res) {
    try {
        const planID = req.params.planID;

        const data = await setTrendingPlanStatus(planID);

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
 * Fetches trending workout plans from the database.
 *
 * @function fetchTrendingPlans
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching trending workout plans
 * fetchTrendingPlans(req, res);
 */
async function fetchTrendingPlans(req, res) {
    try {
        const data = await getTrendingPlans();

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
 * Fetches featured workout plans from the database.
 *
 * @function fetchFeaturedPlans
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching featured workout plans
 * fetchFeaturedPlans(req, res);
 */
async function fetchFeaturedPlans(req, res) {
    try {
        const data = await getFeaturedPlans();

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
const workoutCreate = { createJsonWorkoutPlan, createWorkoutPlan, createWeekPlan, createDayPlan, createCategory, createExercise }
const workoutFetch = { fetchWorkoutPlan, fetchWorkoutOverview }
const specialPlans = { addFeaturedPlan, addTrendingPlan, fetchFeaturedPlans, fetchTrendingPlans }
const workoutUpdate = { updateWorkoutPlan, deleteWorkoutPlan, updateWorkoutWeekPlan, updateWorkoutDayPlan, updateWorkoutCategory, updateWorkoutExercise }
module.exports = { ...specialPlans, ...workoutCreate, ...workoutFetch, ...workoutUpdate }