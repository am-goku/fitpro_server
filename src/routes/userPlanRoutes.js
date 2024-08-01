/**
 * Router configuration for workout-related endpoints.
 *
 * @module routers/workoutRouter
 * @requires express
 * @requires middleware/authMiddleware
 * @requires controllers/UserPlanController
 */

const { Router } = require('express');
const { userProtect } = require('../middleware/authMiddleware');
const { selectPlan, updateProgress, fetchProgress } = require('../controllers/userPlanController');
const router = Router();

/**
 * POST request to select a workout plan.
 *
 * @name POST/select-plan/:planID
 * @function
 * @param {string} planID - The ID of the workout plan to select.
 * @returns {void}
 */
router.post('/select-plan/:planID', userProtect, selectPlan);

/**
 * PUT request to update the progress of an exercise.
 *
 * @name PUT/update-progress/:exerciseID
 * @function
 * @param {string} exerciseID - The ID of the exercise to update progress for.
 * @returns {void}
 */
router.put('/update-progress/:exerciseID', userProtect, updateProgress);

/**
 * GET request to fetch the progress of the logged-in user.
 *
 * @name GET/
 * @function
 * @returns {object} - The progress of the logged-in user.
 */
router.get('/', userProtect, fetchProgress);

module.exports = router;