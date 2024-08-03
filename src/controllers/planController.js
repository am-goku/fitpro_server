const { fetchPlan, updatePlan, deletePlan, updateWeek, updateDay, updateCategory, updateExercise, fetchPlanOverview, createJsonPlan, createPlan, setFeaturedPlanStatus, setTrendingPlanStatus, getTrendingPlans, getFeaturedPlans, addWeek, addDay, addCategory, addExercise, getWeek, getDay, getCategory, getExercise } = require("../helpers/planHelper");
const responseHandler = require("../utils/responseHandler");


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////CREATE PLANS SECTION//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * Creates a new workout plan using JSON data provided in a file.
 *
 * @param {Object} req - The request object containing the uploaded file.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if no JSON file is provided.
 * @throws Will throw an error if there is a problem with the database operation.
 */
async function createUsingJSON(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return responseHandler(
                res,
                { status: 400, message: "No JSON file provided" }
            )
        }

        const bufferBody = file.buffer.toString();

        const plan = JSON.parse(bufferBody);

        const { weeks, ...planBody } = plan;
        const newWeeks = []; // Initialize an empty array for the weeks

        weeks.forEach(weekObj => {
            weekObj.week.forEach(weekNumber => {
                const weekData = {
                    week: weekNumber,
                    days: weekObj.days // Clone each day object
                };
                newWeeks.push(weekData);
            });
        });

        const newPlan = {
            ...planBody,
            weeks: newWeeks
        }

        const data = await createJsonPlan(newPlan);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message
        }

        return responseHandler(res, data)
    }
}


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

        if (!body) return responseHandler(res, { status: 400, message: "Invalid request body." });

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
        const { planID, ...filterBody } = req.query;

        const data = await fetchPlan(planID, filterBody);

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
 * Fetches a workout week plan from the database based on the provided weekID.
 *
 * @function fetchWeekPlan
 * @param {Object} req - The request object containing the parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the weekID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching a workout week plan with ID 123
 * fetchWeekPlan({ params: { id: 123 } }, res);
 */
async function fetchWeekPlan(req, res) {
    try {
        const id = req.params.weekID;
        if (!id) {
            return responseHandler(res, { status: 400, message: "Invalid parameter" })
        }
        const data = await getWeek(id);

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
 * Fetches a workout day plan from the database based on the provided dayID.
 *
 * @function fetchDayPlan
 * @param {Object} req - The request object containing the dayID as a parameter.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the dayID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching a workout day plan with ID 123
 * fetchDayPlan({ params: { id: 123 } }, res);
 */
async function fetchDayPlan(req, res) {
    try {
        const id = req.params.dayID;
        if (!id) {
            return responseHandler(res, { status: 400, message: "Invalid parameter" })
        }
        const data = await getDay(id);

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
 * Fetches a workout category from the database based on the provided categoryID.
 *
 * @function fetchCategory
 * @param {Object} req - The request object containing the categoryID.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the categoryID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching a workout category with ID 123
 * fetchCategory({ params: { categoryID: 123 } }, res);
 */
async function fetchCategory(req, res) {
    try {
        const id = req.params.categoryID;
        const populate = req.query.populate;
        if (!id) {
            return responseHandler(res, { status: 400, message: "Invalid parameter" })
        }
        const data = await getCategory(id, populate);

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
 * Fetches a workout exercise from the database based on the provided exerciseID.
 *
 * @function fetchExercise
 * @param {Object} req - The request object containing the exerciseID.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<Object>} - A promise that resolves to the response object with status and data.
 *
 * @throws Will throw an error if the exerciseID is not provided.
 * @throws Will throw an error if there is a problem with the database operation.
 *
 * @example
 * // Fetching a workout exercise with ID 123
 * fetchExercise({ params: { exerciseID: 123 } }, res);
 */
async function fetchExercise(req, res) {
    try {
        const id = req.params.exerciseID;
        if (!id) {
            return responseHandler(res, { status: 400, message: "Invalid parameter" })
        }
        const data = await getExercise(id);

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
        const { planID, ...filterBody } = req.query;

        const data = await fetchPlanOverview(planID, filterBody);

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

        if (!id) {
            return responseHandler(res, { status: 400, message: "Missing exerciseID." });
        }

        if (Object.keys(body).length === 0) {
            return responseHandler(res, { status: 400, message: "Request body cannot be empty." });
        }

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
const workoutCreate = { createJsonWorkoutPlan, createUsingJSON }
const workoutFetch = { fetchWorkoutPlan, fetchWorkoutOverview, fetchWeekPlan, fetchDayPlan, fetchCategory, fetchExercise }
const specialPlans = { addFeaturedPlan, addTrendingPlan, fetchFeaturedPlans, fetchTrendingPlans }
const workoutUpdate = { updateWorkoutPlan, deleteWorkoutPlan, updateWorkoutWeekPlan, updateWorkoutDayPlan, updateWorkoutCategory, updateWorkoutExercise }
module.exports = { ...specialPlans, ...workoutCreate, ...workoutFetch, ...workoutUpdate }
