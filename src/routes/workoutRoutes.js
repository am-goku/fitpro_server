const express = require('express');
const router = express.Router();
const { createUserWorkoutController, readUserWorkoutController, updateExerciseCompletionController } = require('../controllers/workoutController'); // Adjust the path if needed
const { createWorkoutController, fetchWorkoutController, deleteWorkoutController } = require('../controllers/workoutController'); // Adjust the path if needed
const { adminProtect, userProtect } = require('../middleware/authMiddleware');

// Route to create a new workout
router.post('/', adminProtect, createWorkoutController);

// Route to fetch a specific workout by ID or all workouts
router.get('/', userProtect, fetchWorkoutController);

// Route to delete a workout by ID
router.delete('/:workoutID', adminProtect, deleteWorkoutController);

router.post('/user-workouts/:workoutID', userProtect, createUserWorkoutController);

router.get('/user-workouts', userProtect, readUserWorkoutController);

router.patch('/user-workouts/:workoutID/exercises/:exerciseID', userProtect, updateExerciseCompletionController);


module.exports = router;