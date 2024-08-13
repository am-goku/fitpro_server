const express = require('express');
const router = express.Router();
const { createUserWorkoutController, readUserWorkoutController, updateExerciseCompletionController, updateImagInWorkout, updateCategories, fetchPopulatedExercises, createWorkoutJSON } = require('../controllers/workoutController'); // Adjust the path if needed
const { createWorkoutController, fetchWorkoutController, deleteWorkoutController } = require('../controllers/workoutController'); // Adjust the path if needed
const { adminProtect, userProtect } = require('../middleware/authMiddleware');
const upload = require('../utils/multerConfig');


router.post('/', adminProtect, createWorkoutController);

router.post('/json', adminProtect, upload.single("workout"), createWorkoutJSON)

router.get('/', userProtect, fetchWorkoutController);

router.delete('/:workoutID', adminProtect, deleteWorkoutController);

router.post('/user-workouts/:workoutID', userProtect, createUserWorkoutController);

router.get('/user-workouts', userProtect, readUserWorkoutController);

router.patch('/user-workouts/:workoutID/exercises/:exerciseID', userProtect, updateExerciseCompletionController);

router.patch('/user-workouts/:workoutID', userProtect, upload.single('image'), updateImagInWorkout);

router.get('/:workoutID/exercises', userProtect, fetchPopulatedExercises)


// Temporary functions for testing and client side development
// TODO: Need to remove this function and related APIs after use
router.post('/user-workouts/categories/:categoryID', userProtect, updateCategories)
router.get('/user-workouts/completed-categories', userProtect, updateCategories)


module.exports = router;