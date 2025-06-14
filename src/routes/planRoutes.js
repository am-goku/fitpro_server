/**
 * This file contains the routes for the workout plan management system.
 * It includes routes for creating, fetching, updating, and deleting workout plans,
 * as well as managing workout weeks, days, categories, and exercises.
 * Additionally, it handles file uploads for images and videos.
 *
 * @module routes/planRoutes
 * @requires express
 * @requires middleware/authMiddleware
 * @requires controllers/planController
 * @requires utils/multerConfig
 * @requires controllers/imageController
 */

const express = require('express');
const { adminProtect, userProtect } = require('../middleware/authMiddleware');
const {
    fetchWorkoutPlan, updateWorkoutPlan,
    deleteWorkoutPlan, updateWorkoutWeekPlan,
    updateWorkoutDayPlan, updateWorkoutCategory,
    updateWorkoutExercise, fetchWorkoutOverview,
    createJsonWorkoutPlan, addFeaturedPlan,
    fetchFeaturedPlans, addTrendingPlan,
    fetchTrendingPlans, fetchWeekPlan,
    fetchDayPlan, fetchCategory, fetchExercise,
    createUsingJSON,
    fetchDailyExercises
} = require('../controllers/planController');
const upload = require('../utils/multerConfig');
const { uploadNewFile } = require('../controllers/imageController');

const router = express.Router();


/////////////////////// WORKOUT PLANS //////////////////////
/**
 * Route for creating a new workout plan from a JSON file.
 *
 * @name POST/create
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {createJsonWorkoutPlan} controller - Controller function for creating a workout plan from JSON
 */
router.post('/create', adminProtect, createJsonWorkoutPlan);

/**
 * Route for creating a new workout plan from a JSON file.
 *
 * @function createJsonWorkoutPlanRoute
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path '/create/json'
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {upload.single} middleware - Multer middleware for handling a single file upload with the field name 'planData'
 * @param {createUsingJSON} controller - Controller function for creating a workout plan from JSON
 *
 * @returns {function} - Express route handler function
 */
router.post('/create/json', adminProtect, upload.single('planData'), createUsingJSON)

/**
 * Route for fetching all workout plans.
 *
 * @name GET/fetch
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchWorkoutPlan} controller - Controller function for fetching workout plans
 */
router.get('/fetch', userProtect, fetchWorkoutPlan);

/**
 * Route for fetching a summary of all workout plans.
 *
 * @name GET/overview
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchWorkoutOverview} controller - Controller function for fetching workout plan overview
 */
router.get('/overview', userProtect, fetchWorkoutOverview);

/**
 * Route for updating an existing workout plan.
 *
 * @name PUT/:planID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {updateWorkoutPlan} controller - Controller function for updating a workout plan
 */
router.put('/:planID', adminProtect, updateWorkoutPlan);

/**
 * Route for deleting an existing workout plan.
 *
 * @name DELETE/:planID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {deleteWorkoutPlan} controller - Controller function for deleting a workout plan
 */
router.delete('/:planID', adminProtect, deleteWorkoutPlan);


/////////////////////// WORKOUT WEEKS //////////////////////

/**
 * Route for fetching a specific workout week.
 *
 * @name GET/week/:weekID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchWeekPlan} controller - Controller function for fetching a workout week
 */
router.get('/week/:weekID', userProtect, fetchWeekPlan);

/**
 * Route for updating an existing workout week.
 *
 * @name PUT/week/:weekID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {updateWorkoutWeekPlan} controller - Controller function for updating a workout week
 */
router.put('/week/:weekID', adminProtect, updateWorkoutWeekPlan);


/////////////////////// WORKOUT DAYS ///////////////////////

/**
 * Route for fetching a specific workout day.
 *
 * @name GET/day/:dayID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchDayPlan} controller - Controller function for fetching a workout day
 */
router.get('/day/:dayID', userProtect, fetchDayPlan);

/**
 * Route for updating an existing workout day.
 *
 * @name PUT/day/:dayID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {updateWorkoutDayPlan} controller - Controller function for updating a workout day
 */
router.put('/day/:dayID', adminProtect, updateWorkoutDayPlan);

router.get('/day/:dayID/exercises', userProtect, fetchDailyExercises);


/////////////////////// WORKOUT CATEGORY //////////////////////

/**
 * Route for fetching a specific workout category.
 *
 * @name GET/category/:categoryID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchCategory} controller - Controller function for fetching a workout category
 */
router.get('/category/:categoryID', userProtect, fetchCategory);

/**
 * Route for updating an existing workout category.
 *
 * @name PUT/category/:categoryID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {updateWorkoutCategory} controller - Controller function for updating a workout category
 */
router.put('/category/:categoryID', adminProtect, updateWorkoutCategory);


/////////////////////// WORKOUT EXERCISE //////////////////////

/**
 * Route for fetching a specific workout exercise.
 *
 * @name GET/exercise/:exerciseID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchExercise} controller - Controller function for fetching a workout exercise
 */
router.get('/exercise/:exerciseID', userProtect, fetchExercise);

/**
 * Route for updating an existing workout exercise.
 *
 * @name PUT/exercise/:exerciseID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {updateWorkoutExercise} controller - Controller function for updating a workout exercise
 */
router.put('/exercise/:exerciseID', adminProtect, updateWorkoutExercise);


/////////////////////// FEATURED PLANS ////////////////////////
/**
 * Route for adding a workout plan to the featured plans list.
 *
 * @name POST/featured/:planID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {addFeaturedPlan} controller - Controller function for adding a workout plan to featured plans
 */
router.post('/featured/:planID', adminProtect, addFeaturedPlan);

/**
 * Route for fetching the list of featured workout plans.
 *
 * @name GET/featured
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchFeaturedPlans} controller - Controller function for fetching featured workout plans
 */
router.get('/featured', userProtect, fetchFeaturedPlans);


/////////////////////// TRENDING PLANS ////////////////////////
/**
 * Route for adding a workout plan to the trending plans list.
 *
 * @name POST/trending/:planID
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {adminProtect} middleware - Admin authentication middleware
 * @param {addTrendingPlan} controller - Controller function for adding a workout plan to trending plans
 */
router.post('/trending/:planID', adminProtect, addTrendingPlan);

/**
 * Route for fetching the list of trending workout plans.
 *
 * @name GET/trending
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {userProtect} middleware - User authentication middleware
 * @param {fetchTrendingPlans} controller - Controller function for fetching trending workout plans
 */
router.get('/trending', userProtect, fetchTrendingPlans);


////////////////////////////// FILE UPLOAD SECTION /////////////////////
/**
 * Route for uploading a new file.
 *
 * @name POST/files/upload
 * @function
 * @memberof module:routes/planRoutes
 * @param {string} path - Express path
 * @param {upload.fields} middleware - Multer middleware for handling file uploads
 * @param {uploadNewFile} controller - Controller function for uploading a new file
 */
router.post('/files/upload', upload.fields([{ name: 'file' }]), uploadNewFile);





module.exports = router;