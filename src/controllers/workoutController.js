const { createUserWorkout, readUserWorkout, updateExerciseCompletion } = require('../helpers/workoutHelper'); // Adjust the path if needed
const { createWorkout, fetchWorkout, deleteWorkout } = require('../helpers/workoutHelper');
const responseHandler = require('../utils/responseHandler');

// Controller function to create a new workout
async function createWorkoutController(req, res) {
    try {
        const workoutData = req.body; // Assumes workout data is sent in the request body
        const result = await createWorkout(workoutData);

        return responseHandler(res, result);
    } catch (error) {
        return responseHandler(res, {
            status: 500,
            message: error.message
        });
    }
}

// Controller function to fetch a workout or all workouts
async function fetchWorkoutController(req, res) {
    try {
        const workoutID = req.query.workoutID || null; // Assumes ID is passed in the route parameters
        const populate = req.query.populate === 'true'; // Assumes populate is passed as a query parameter
        const result = await fetchWorkout(workoutID, populate);

        return responseHandler(res, result);
    } catch (error) {
        return responseHandler(res, {
            status: 500,
            message: error.message
        });
    }
}

// Controller function to delete a workout
async function deleteWorkoutController(req, res) {
    try {
        const workoutID = req.params.workoutID; // Assumes ID is passed in the route parameters
        const result = await deleteWorkout(workoutID);

        return responseHandler(res, result);
    } catch (error) {
        return responseHandler(res, {
            status: 500,
            message: error.message
        });
    }
}





async function createUserWorkoutController(req, res) {
    const { workoutID } = req.params;
    const userID = req.userID
    const data = await createUserWorkout(userID, workoutID);
    return responseHandler(res, data);
}

async function readUserWorkoutController(req, res) {
    const { workoutID, populate } = req.query;
    const userID = req.userID;

    try {
        const data = await readUserWorkout(userID, workoutID, populate);
        responseHandler(res, data);
    } catch (error) {
        responseHandler(res, { status: 500, message: error.message });
    }
}

async function updateExerciseCompletionController(req, res) {
    const { workoutID, exerciseID } = req.params;
    const userID = req.userID;
    const { completed, completionDate } = req.body;
    const data = await updateExerciseCompletion(userID, workoutID, exerciseID, completed, completionDate);
    return responseHandler(res, data);
}




module.exports = {
    createWorkoutController,
    fetchWorkoutController,
    deleteWorkoutController,
    createUserWorkoutController,
    readUserWorkoutController,
    updateExerciseCompletionController
};
