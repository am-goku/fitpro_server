const express = require('express');
const router = express.Router();
const { createUserWorkoutController, readUserWorkoutController, updateExerciseCompletionController, updateImagInWorkout } = require('../controllers/workoutController'); // Adjust the path if needed
const { createWorkoutController, fetchWorkoutController, deleteWorkoutController } = require('../controllers/workoutController'); // Adjust the path if needed
const { adminProtect, userProtect } = require('../middleware/authMiddleware');
const upload = require('../utils/multerConfig');


router.post('/', adminProtect, createWorkoutController);

router.get('/', userProtect, fetchWorkoutController);

router.delete('/:workoutID', adminProtect, deleteWorkoutController);

router.post('/user-workouts/:workoutID', userProtect, createUserWorkoutController);

router.get('/user-workouts', userProtect, readUserWorkoutController);

router.patch('/user-workouts/:workoutID/exercises/:exerciseID', userProtect, updateExerciseCompletionController);

router.patch('/user-workouts/:workoutID', userProtect, upload.single('image'), updateImagInWorkout);


module.exports = router;