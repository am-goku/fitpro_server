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
        const workoutID = req.params.workoutID || null; // Assumes ID is passed in the route parameters
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
    const result = await createUserWorkout(userID, workoutID);
    responseHandler(res, result);
}

async function readUserWorkoutController(req, res) {
    const { workoutID } = req.params;
    const userID = req.userID;
    const { populate } = req.query; // Convert to boolean as needed
    const result = await readUserWorkout(userID, workoutID, populate === 'true');
    responseHandler(res, result);
}

async function updateExerciseCompletionController(req, res) {
    const { workoutID, exerciseID } = req.params;
    const userID = req.userID;
    const { completed, completionDate } = req.body;
    const result = await updateExerciseCompletion(userID, workoutID, exerciseID, completed, completionDate);
    responseHandler(res, result);
}




module.exports = {
    createWorkoutController,
    fetchWorkoutController,
    deleteWorkoutController,
    createUserWorkoutController,
    readUserWorkoutController,
    updateExerciseCompletionController
};
