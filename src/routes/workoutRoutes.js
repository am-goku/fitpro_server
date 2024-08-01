const express = require('express');
const router = express.Router();
const { createUserWorkoutController, readUserWorkoutController, updateExerciseCompletionController } = require('../controllers/workoutController'); // Adjust the path if needed
const { createWorkoutController, fetchWorkoutController, deleteWorkoutController } = require('../controllers/workoutController'); // Adjust the path if needed

// Route to create a new workout
router.post('/', createWorkoutController);

// Route to fetch a specific workout by ID or all workouts
router.get('/', fetchWorkoutController);

// Route to delete a workout by ID
router.delete('/:workoutID', deleteWorkoutController);

router.post('/user-workouts/:workoutID', createUserWorkoutController);

router.get('/user-workouts', readUserWorkoutController);

router.patch('/user-workouts/:workoutID/exercises/:exerciseID', updateExerciseCompletionController);


module.exports = router;