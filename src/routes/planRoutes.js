const express = require('express');
const { adminProtect, userProtect } = require('../middleware/authMiddleware');
const { fetchWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan, updateWorkoutWeekPlan, updateWorkoutDayPlan, updateWorkoutCategory, updateWorkoutExercise, fetchWorkoutOverview, createJsonWorkoutPlan, createWorkoutPlan, addFeaturedPlan, fetchFeaturedPlans, addTrendingPlan, fetchTrendingPlans, createWeekPlan, createDayPlan, createCategory, createExercise, fetchWeekPlan, fetchDayPlan, fetchCategory, fetchExercise } = require('../controllers/planController');
const upload = require('../utils/multerConfig');

const router = express.Router();


////////////////////////////////////////////////////////////
/////////////////////// WORKOUT PLANS //////////////////////

/**
 * @swagger
 * tags:
 *   name: Workout-plan
 *   description: Routes for admin to update workout plans - MOSTLY OVERVIEW
 */

/**
 * @swagger
 * /api/v1/plan/create/json:
 *   post:
 *     summary: Creates a workout plan from JSON data
 *     description: Creates and saves a new workout plan using the provided JSON data, including weeks, days, categories, and exercises. The route is protected and requires admin privileges.
 *     tags:
 *       - Workout-plan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_name:
 *                 type: string
 *                 description: The name of the workout plan.
 *                 example: "Summer Body Transformation"
 *               description:
 *                 type: string
 *                 description: A brief description of the workout plan.
 *                 example: "A comprehensive plan to get in shape for summer."
 *               banner_image:
 *                 type: string
 *                 description: URL of the banner image for the workout plan.
 *                 example: "https://example.com/banner.jpg"
 *               plan_video:
 *                 type: string
 *                 description: URL of the video introducing the workout plan.
 *                 example: "https://example.com/intro.mp4"
 *               workout_keywords:
 *                 type: string
 *                 description: Keywords related to the workout plan.
 *                 example: "cardio, strength"
 *               goal_orientation:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Goals that the workout plan is oriented towards.
 *                 example: ["flexibility", "strength"]
 *               target_age_group:
 *                 type: string
 *                 description: Target age group for the workout plan.
 *                 example: "30-40"
 *               training_type:
 *                 type: string
 *                 description: Type of training included in the plan.
 *                 example: "HIIT"
 *               location:
 *                 type: string
 *                 description: Location where the workout can be performed.
 *                 example: "Home"
 *               level:
 *                 type: string
 *                 description: Difficulty level of the workout plan.
 *                 example: "Intermediate"
 *               estimated_duration:
 *                 type: string
 *                 description: Estimated total duration of the workout plan.
 *                 example: "6 weeks"
 *               rest_between_exercises_seconds:
 *                 type: integer
 *                 description: Rest time in seconds between exercises.
 *                 example: 60
 *               average_calories_burned_per_minute:
 *                 type: number
 *                 format: float
 *                 description: Average calories burned per minute during the workout.
 *                 example: 8.5
 *               weeks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     week:
 *                       type: integer
 *                       description: Week number in the workout plan.
 *                       example: 1
 *                     days:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           day:
 *                             type: integer
 *                             description: Day number in the week.
 *                             example: 1
 *                           day_name:
 *                             type: string
 *                             description: Name of the day.
 *                             example: "Leg Day"
 *                           day_banner_image:
 *                             type: string
 *                             description: URL of the banner image for the day.
 *                             example: "https://example.com/day-banner.jpg"
 *                           intro_video:
 *                             type: string
 *                             description: URL of the introductory video for the day.
 *                             example: "https://example.com/day-intro.mp4"
 *                           day_of_week:
 *                             type: string
 *                             description: Day of the week.
 *                             example: "Monday"
 *                           estimated_duration:
 *                             type: string
 *                             description: Estimated duration of the day's workout.
 *                             example: "45 minutes"
 *                           categories:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 sub_category:
 *                                   type: string
 *                                   description: Sub-category of the workout.
 *                                   example: "Cardio"
 *                                 circuit_rest_time:
 *                                   type: integer
 *                                   description: Rest time between circuits in seconds.
 *                                   example: 60
 *                                 circuit_reps:
 *                                   type: integer
 *                                   description: Number of repetitions for the circuit.
 *                                   example: 3
 *                                 exercises:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       name:
 *                                         type: string
 *                                         description: Name of the exercise.
 *                                         example: "Push-up"
 *                                       exercise_number:
 *                                         type: integer
 *                                         description: Number of the exercise.
 *                                         example: 1
 *                                       exercise_type:
 *                                         type: string
 *                                         description: Type of exercise.
 *                                         example: "Strength"
 *                                       time_based:
 *                                         type: string
 *                                         description: Time-based format (if applicable).
 *                                         example: "30 seconds"
 *                                       weighted:
 *                                         type: string
 *                                         description: Indicates if the exercise is weighted.
 *                                         example: "No"
 *                                       sets:
 *                                         type: integer
 *                                         description: Number of sets for the exercise.
 *                                         example: 3
 *                                       reps:
 *                                         type: array
 *                                         items:
 *                                           type: integer
 *                                         description: Number of repetitions for each set.
 *                                         example: [10, 12, 15]
 *                                       set_time:
 *                                         type: string
 *                                         description: Time duration of each set (if applicable).
 *                                         example: "1 minute"
 *                                       superset_names:
 *                                         type: array
 *                                         items:
 *                                           type: string
 *                                         description: Names of supersets associated with the exercise.
 *                                         example: ["Chest Superset"]
 *                                       rest_time:
 *                                         type: integer
 *                                         description: Rest time between sets in seconds.
 *                                         example: 60
 *                                       video_url:
 *                                         type: string
 *                                         description: URL of the exercise video.
 *                                         example: "https://example.com/exercise-video.mp4"
 *                                       image_url:
 *                                         type: string
 *                                         description: URL of the exercise image.
 *                                         example: "https://example.com/exercise-image.jpg"
 *     responses:
 *       '200':
 *         description: Workout plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Workout plan saved successfully
 *                 plan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the workout plan.
 *                       example: 60d5f2e91c9d44000014d2c7
 *                     plan_name:
 *                       type: string
 *                       description: The name of the workout plan.
 *                       example: "Summer Body Transformation"
 *                     description:
 *                       type: string
 *                       description: A brief description of the workout plan.
 *                       example: "A comprehensive plan to get in shape for summer."
 *                     banner_image:
 *                       type: string
 *                       description: URL of the banner image for the workout plan.
 *                       example: "https://example.com/banner.jpg"
 *                     plan_video:
 *                       type: string
 *                       description: URL of the video introducing the workout plan.
 *                       example: "https://example.com/intro.mp4"
 *                     workout_keywords:
 *                       type: string
 *                       description: Keywords related to the workout plan.
 *                       example: "cardio, strength"
 *                     goal_orientation:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Goals that the workout plan is oriented towards.
 *                       example: ["flexibility", "strength"]
 *                     target_age_group:
 *                       type: string
 *                       description: Target age group for the workout plan.
 *                       example: "30-40"
 *                     training_type:
 *                       type: string
 *                       description: Type of training included in the plan.
 *                       example: "HIIT"
 *                     location:
 *                       type: string
 *                       description: Location where the workout can be performed.
 *                       example: "Home"
 *                     level:
 *                       type: string
 *                       description: Difficulty level of the workout plan.
 *                       example: "Intermediate"
 *                     estimated_duration:
 *                       type: string
 *                       description: Estimated total duration of the workout plan.
 *                       example: "6 weeks"
 *                     rest_between_exercises_seconds:
 *                       type: integer
 *                       description: Rest time in seconds between exercises.
 *                       example: 60
 *                     average_calories_burned_per_minute:
 *                       type: number
 *                       format: float
 *                       description: Average calories burned per minute during the workout.
 *                       example: 8.5
 *                     weeks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           week:
 *                             type: integer
 *                             description: Week number in the workout plan.
 *                             example: 1
 *                           days:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 day:
 *                                   type: integer
 *                                   description: Day number in the week.
 *                                   example: 1
 *                                 day_name:
 *                                   type: string
 *                                   description: Name of the day.
 *                                   example: "Leg Day"
 *                                 day_banner_image:
 *                                   type: string
 *                                   description: URL of the banner image for the day.
 *                                   example: "https://example.com/day-banner.jpg"
 *                                 intro_video:
 *                                   type: string
 *                                   description: URL of the introductory video for the day.
 *                                   example: "https://example.com/day-intro.mp4"
 *                                 day_of_week:
 *                                   type: string
 *                                   description: Day of the week.
 *                                   example: "Monday"
 *                                 estimated_duration:
 *                                   type: string
 *                                   description: Estimated duration of the day's workout.
 *                                   example: "45 minutes"
 *                                 categories:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       sub_category:
 *                                         type: string
 *                                         description: Sub-category of the workout.
 *                                         example: "Cardio"
 *                                       circuit_rest_time:
 *                                         type: integer
 *                                         description: Rest time between circuits in seconds.
 *                                         example: 60
 *                                       circuit_reps:
 *                                         type: integer
 *                                         description: Number of repetitions for the circuit.
 *                                         example: 3
 *                                       exercises:
 *                                         type: array
 *                                         items:
 *                                           type: object
 *                                           properties:
 *                                             name:
 *                                               type: string
 *                                               description: Name of the exercise.
 *                                               example: "Push-up"
 *                                             exercise_number:
 *                                               type: integer
 *                                               description: Number of the exercise.
 *                                               example: 1
 *                                             exercise_type:
 *                                               type: string
 *                                               description: Type of exercise.
 *                                               example: "Strength"
 *                                             time_based:
 *                                               type: string
 *                                               description: Time-based format (if applicable).
 *                                               example: "30 seconds"
 *                                             weighted:
 *                                               type: string
 *                                               description: Indicates if the exercise is weighted.
 *                                               example: "No"
 *                                             sets:
 *                                               type: integer
 *                                               description: Number of sets for the exercise.
 *                                               example: 3
 *                                             reps:
 *                                               type: array
 *                                               items:
 *                                                 type: integer
 *                                               description: Number of repetitions for each set.
 *                                               example: [10, 12, 15]
 *                                             set_time:
 *                                               type: string
 *                                               description: Time duration of each set (if applicable).
 *                                               example: "1 minute"
 *                                             superset_names:
 *                                               type: array
 *                                               items:
 *                                                 type: string
 *                                               description: Names of supersets associated with the exercise.
 *                                               example: ["Chest Superset"]
 *                                             rest_time:
 *                                               type: integer
 *                                               description: Rest time between sets in seconds.
 *                                               example: 60
 *                                             video_url:
 *                                               type: string
 *                                               description: URL of the exercise video.
 *                                               example: "https://example.com/exercise-video.mp4"
 *                                             image_url:
 *                                               type: string
 *                                               description: URL of the exercise image.
 *                                               example: "https://example.com/exercise-image.jpg"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/create/json', adminProtect, createJsonWorkoutPlan)

/**
 * @swagger
 * /api/v1/plan/create:
 *   post:
 *     summary: Creates a new workout plan
 *     description: Creates and saves a new workout plan using the provided files and plan details. This endpoint is protected and requires admin privileges.
 *     tags:
 *       - Workout-plan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               plan_video:
 *                 type: string
 *                 format: binary
 *                 description: Video introducing the workout plan.
 *               banner_image:
 *                 type: string
 *                 format: binary
 *                 description: Banner image for the workout plan.
 *               plan_name:
 *                 type: string
 *                 description: The name of the workout plan.
 *                 example: "Summer Body Transformation"
 *               description:
 *                 type: string
 *                 description: A brief description of the workout plan.
 *                 example: "A comprehensive plan to get in shape for summer."
 *               workout_keywords:
 *                 type: string
 *                 description: Keywords related to the workout plan.
 *                 example: "cardio, strength"
 *               goal_orientation:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Goals that the workout plan is oriented towards.
 *                 example: ["flexibility", "strength"]
 *               target_age_group:
 *                 type: string
 *                 description: Target age group for the workout plan.
 *                 example: "30-40"
 *               training_type:
 *                 type: string
 *                 description: Type of training included in the plan.
 *                 example: "HIIT"
 *               location:
 *                 type: string
 *                 description: Location where the workout can be performed.
 *                 example: "Home"
 *               level:
 *                 type: string
 *                 description: Difficulty level of the workout plan.
 *                 example: "Intermediate"
 *               estimated_duration:
 *                 type: string
 *                 description: Estimated total duration of the workout plan.
 *                 example: "6 weeks"
 *               rest_between_exercises_seconds:
 *                 type: integer
 *                 description: Rest time in seconds between exercises.
 *                 example: 60
 *               average_calories_burned_per_minute:
 *                 type: number
 *                 format: float
 *                 description: Average calories burned per minute during the workout.
 *                 example: 8.5
 *     responses:
 *       '200':
 *         description: Workout plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Workout plan saved successfully
 *                 plan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the workout plan.
 *                       example: 60d5f2e91c9d44000014d2c7
 *                     plan_name:
 *                       type: string
 *                       description: The name of the workout plan.
 *                       example: "Summer Body Transformation"
 *                     description:
 *                       type: string
 *                       description: A brief description of the workout plan.
 *                       example: "A comprehensive plan to get in shape for summer."
 *                     banner_image:
 *                       type: string
 *                       description: URL of the banner image for the workout plan.
 *                       example: "https://example.com/banner.jpg"
 *                     plan_video:
 *                       type: string
 *                       description: URL of the video introducing the workout plan.
 *                       example: "https://example.com/intro.mp4"
 *                     workout_keywords:
 *                       type: string
 *                       description: Keywords related to the workout plan.
 *                       example: "cardio, strength"
 *                     goal_orientation:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Goals that the workout plan is oriented towards.
 *                       example: ["flexibility", "strength"]
 *                     target_age_group:
 *                       type: string
 *                       description: Target age group for the workout plan.
 *                       example: "30-40"
 *                     training_type:
 *                       type: string
 *                       description: Type of training included in the plan.
 *                       example: "HIIT"
 *                     location:
 *                       type: string
 *                       description: Location where the workout can be performed.
 *                       example: "Home"
 *                     level:
 *                       type: string
 *                       description: Difficulty level of the workout plan.
 *                       example: "Intermediate"
 *                     estimated_duration:
 *                       type: string
 *                       description: Estimated total duration of the workout plan.
 *                       example: "6 weeks"
 *                     rest_between_exercises_seconds:
 *                       type: integer
 *                       description: Rest time in seconds between exercises.
 *                       example: 60
 *                     average_calories_burned_per_minute:
 *                       type: number
 *                       format: float
 *                       description: Average calories burned per minute during the workout.
 *                       example: 8.5
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/create', adminProtect, upload.fields([{ name: 'plan_video' }, { name: 'banner_image' }]), createWorkoutPlan);

/**
 * @swagger
 * /api/v1/plan/fetch:
 *   get:
 *     summary: Fetches workout plans
 *     description: Fetches workout plans based on the provided ID. If no ID is provided, it fetches all plans. This endpoint is protected and requires user authentication.
 *     tags:
 *       - Workout-plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the workout plan to fetch
 *         required: false
 *         example: "60d5f2e91c9d44000014d2c7"
 *     responses:
 *       '200':
 *         description: Plans fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Plans fetched successfully
 *                 plans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the workout plan.
 *                         example: "60d5f2e91c9d44000014d2c7"
 *                       plan_name:
 *                         type: string
 *                         description: The name of the workout plan.
 *                         example: "Summer Body Transformation"
 *                       description:
 *                         type: string
 *                         description: A brief description of the workout plan.
 *                         example: "A comprehensive plan to get in shape for summer."
 *                       banner_image:
 *                         type: string
 *                         description: URL of the banner image for the workout plan.
 *                         example: "https://example.com/image.jpg"
 *                       plan_video:
 *                         type: string
 *                         description: URL of the video for the workout plan.
 *                         example: "https://example.com/video.mp4"
 *                       workout_keywords:
 *                         type: string
 *                         description: Keywords related to the workout plan.
 *                         example: "cardio, strength"
 *                       goal_orientation:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Goals that the workout plan is oriented towards.
 *                         example: ["flexibility", "strength"]
 *                       target_age_group:
 *                         type: string
 *                         description: Target age group for the workout plan.
 *                         example: "30-40"
 *                       training_type:
 *                         type: string
 *                         description: Type of training included in the plan.
 *                         example: "HIIT"
 *                       location:
 *                         type: string
 *                         description: Location where the workout can be performed.
 *                         example: "Home"
 *                       level:
 *                         type: string
 *                         description: Difficulty level of the workout plan.
 *                         example: "Intermediate"
 *                       estimated_duration:
 *                         type: string
 *                         description: Estimated total duration of the workout plan.
 *                         example: "6 weeks"
 *                       rest_between_exercises_seconds:
 *                         type: integer
 *                         description: Rest time in seconds between exercises.
 *                         example: 60
 *                       average_calories_burned_per_minute:
 *                         type: number
 *                         format: float
 *                         description: Average calories burned per minute during the workout.
 *                         example: 8.5
 *                       weeks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: Unique identifier for the week.
 *                               example: "60d5f2e91c9d44000014d2c8"
 *                             week:
 *                               type: integer
 *                               description: The week number.
 *                               example: 1
 *                             days:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                     description: Unique identifier for the day.
 *                                     example: "60d5f2e91c9d44000014d2c9"
 *                                   day:
 *                                     type: integer
 *                                     description: The day number.
 *                                     example: 1
 *                                   day_name:
 *                                     type: string
 *                                     description: Name of the day.
 *                                     example: "Day 1"
 *                                   day_banner_image:
 *                                     type: string
 *                                     description: URL of the banner image for the day.
 *                                     example: "https://example.com/image.jpg"
 *                                   intro_video:
 *                                     type: string
 *                                     description: URL of the intro video for the day.
 *                                     example: "https://example.com/video.mp4"
 *                                   day_of_week:
 *                                     type: string
 *                                     description: Day of the week.
 *                                     example: "Monday"
 *                                   estimated_duration:
 *                                     type: string
 *                                     description: Estimated duration of the day.
 *                                     example: "45 minutes"
 *                                   categories:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         _id:
 *                                           type: string
 *                                           description: Unique identifier for the category.
 *                                           example: "60d5f2e91c9d44000014d2ca"
 *                                         sub_category:
 *                                           type: string
 *                                           description: Sub-category of the exercises.
 *                                           example: "Warm-up"
 *                                         circuit_rest_time:
 *                                           type: integer
 *                                           description: Rest time in seconds between circuits.
 *                                           example: 30
 *                                         circuit_reps:
 *                                           type: integer
 *                                           description: Number of repetitions for the circuit.
 *                                           example: 3
 *                                         exercises:
 *                                           type: array
 *                                           items:
 *                                             type: object
 *                                             properties:
 *                                               _id:
 *                                                 type: string
 *                                                 description: Unique identifier for the exercise.
 *                                                 example: "60d5f2e91c9d44000014d2cb"
 *                                               name:
 *                                                 type: string
 *                                                 description: Name of the exercise.
 *                                                 example: "Push-ups"
 *                                               exercise_number:
 *                                                 type: integer
 *                                                 description: Exercise number.
 *                                                 example: 1
 *                                               exercise_type:
 *                                                 type: string
 *                                                 description: Type of exercise.
 *                                                 example: "Strength"
 *                                               time_based:
 *                                                 type: string
 *                                                 description: Whether the exercise is time-based.
 *                                                 example: "No"
 *                                               weighted:
 *                                                 type: string
 *                                                 description: Whether the exercise is weighted.
 *                                                 example: "Yes"
 *                                               sets:
 *                                                 type: integer
 *                                                 description: Number of sets.
 *                                                 example: 3
 *                                               reps:
 *                                                 type: array
 *                                                 items:
 *                                                   type: integer
 *                                                 description: Number of repetitions per set.
 *                                                 example: [12, 12, 12]
 *                                               set_time:
 *                                                 type: string
 *                                                 description: Duration of each set.
 *                                                 example: "30 seconds"
 *                                               superset_names:
 *                                                 type: array
 *                                                 items:
 *                                                   type: string
 *                                                 description: Names of the exercises in the superset.
 *                                                 example: ["Push-ups", "Pull-ups"]
 *                                               rest_time:
 *                                                 type: integer
 *                                                 description: Rest time in seconds between sets.
 *                                                 example: 30
 *                                               video_url:
 *                                                 type: string
 *                                                 description: URL of the exercise video.
 *                                                 example: "https://example.com/video.mp4"
 *                                               image_url:
 *                                                 type: string
 *                                                 description: URL of the exercise image.
 *                                                 example: "https://example.com/image.jpg"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/fetch', userProtect, fetchWorkoutPlan)

/**
 * @swagger
 * /api/v1/plan/overview:
 *   get:
 *     summary: Fetches plan overview details
 *     description: Retrieves detailed information about workout plans. Can optionally filter by plan ID.
 *     tags:
 *       - Workout-plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the plan to retrieve. If not provided, retrieves all plans.
 *     responses:
 *       '200':
 *         description: Successfully fetched plan details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Data Plans fetched successfully
 *                 plans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the plan
 *                       plan_name:
 *                         type: string
 *                         description: Name of the plan
 *                       description:
 *                         type: string
 *                         description: Description of the plan
 *                       banner_image:
 *                         type: string
 *                         description: URL of the banner image for the plan
 *                       plan_video:
 *                         type: string
 *                         description: URL of the video for the plan
 *                       workout_keywords:
 *                         type: string
 *                         description: Keywords related to the workout
 *                       goal_orientation:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Goals associated with the plan
 *                       target_age_group:
 *                         type: string
 *                         description: Target age group for the plan
 *                       training_type:
 *                         type: string
 *                         description: Type of training (e.g., strength, cardio)
 *                       location:
 *                         type: string
 *                         description: Location where the training can be performed (e.g., Home)
 *                       level:
 *                         type: string
 *                         description: Difficulty level of the plan (e.g., Beginner)
 *                       estimated_duration:
 *                         type: string
 *                         description: Estimated duration of the plan
 *                       rest_between_exercises_seconds:
 *                         type: number
 *                         description: Rest time between exercises in seconds
 *                       average_calories_burned_per_minute:
 *                         type: number
 *                         description: Average calories burned per minute
 *                       weeks:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of week plan IDs
 *                       isTrending:
 *                         type: boolean
 *                         description: Whether the plan is trending
 *                       isFeatured:
 *                         type: boolean
 *                         description: Whether the plan is featured
 *                       views:
 *                         type: number
 *                         description: Number of views for the plan
 *                       selectedBy:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of user IDs who have selected the plan
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/overview', userProtect, fetchWorkoutOverview);

/**
 * @swagger
 * /api/v1/plan/{planID}:
 *   put:
 *     summary: Update a workout plan
 *     description: Updates the details of an existing workout plan by plan ID. This endpoint is protected and requires admin authentication.
 *     tags:
 *       - Workout-plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout plan to update
 *         example: "60d5f2e91c9d44000014d2c7"
 *     requestBody:
 *       description: JSON object containing the fields to update in the workout plan
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_name:
 *                 type: string
 *                 example: "Summer Body Transformation"
 *               description:
 *                 type: string
 *                 example: "A comprehensive plan to get in shape for summer."
 *               banner_image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               plan_video:
 *                 type: string
 *                 example: "https://example.com/video.mp4"
 *               workout_keywords:
 *                 type: string
 *                 example: "cardio, strength"
 *               goal_orientation:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["flexibility", "strength"]
 *               target_age_group:
 *                 type: string
 *                 example: "30-40"
 *               training_type:
 *                 type: string
 *                 example: "HIIT"
 *               location:
 *                 type: string
 *                 example: "Home"
 *               level:
 *                 type: string
 *                 example: "Intermediate"
 *               estimated_duration:
 *                 type: string
 *                 example: "6 weeks"
 *               rest_between_exercises_seconds:
 *                 type: integer
 *                 example: 60
 *               average_calories_burned_per_minute:
 *                 type: number
 *                 format: float
 *                 example: 8.5
 *               isTrending:
 *                 type: boolean
 *                 example: true
 *               isFeatured:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       '200':
 *         description: Workout plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Workout plan updated successfully
 *                 plan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the workout plan.
 *                       example: "60d5f2e91c9d44000014d2c7"
 *                     plan_name:
 *                       type: string
 *                       description: The name of the workout plan.
 *                       example: "Summer Body Transformation"
 *                     description:
 *                       type: string
 *                       description: A brief description of the workout plan.
 *                       example: "A comprehensive plan to get in shape for summer."
 *                     banner_image:
 *                       type: string
 *                       description: URL of the banner image for the workout plan.
 *                       example: "https://example.com/image.jpg"
 *                     plan_video:
 *                       type: string
 *                       description: URL of the video for the workout plan.
 *                       example: "https://example.com/video.mp4"
 *                     workout_keywords:
 *                       type: string
 *                       description: Keywords related to the workout plan.
 *                       example: "cardio, strength"
 *                     goal_orientation:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Goals that the workout plan is oriented towards.
 *                       example: ["flexibility", "strength"]
 *                     target_age_group:
 *                       type: string
 *                       description: Target age group for the workout plan.
 *                       example: "30-40"
 *                     training_type:
 *                       type: string
 *                       description: Type of training included in the plan.
 *                       example: "HIIT"
 *                     location:
 *                       type: string
 *                       description: Location where the workout can be performed.
 *                       example: "Home"
 *                     level:
 *                       type: string
 *                       description: Difficulty level of the workout plan.
 *                       example: "Intermediate"
 *                     estimated_duration:
 *                       type: string
 *                       description: Estimated total duration of the workout plan.
 *                       example: "6 weeks"
 *                     rest_between_exercises_seconds:
 *                       type: integer
 *                       description: Rest time in seconds between exercises.
 *                       example: 60
 *                     average_calories_burned_per_minute:
 *                       type: number
 *                       format: float
 *                       description: Average calories burned per minute during the workout.
 *                       example: 8.5
 *                     weeks:
 *                       type: array
 *                       items:
 *                         type: string
 *                         description: IDs of the weeks included in the plan.
 *                         example: ["60d5f2e91c9d44000014d2c8"]
 *                     isTrending:
 *                       type: boolean
 *                       description: Indicates if the plan is trending.
 *                       example: true
 *                     isFeatured:
 *                       type: boolean
 *                       description: Indicates if the plan is featured.
 *                       example: false
 *                     views:
 *                       type: integer
 *                       description: Number of views of the plan.
 *                       example: 100
 *                     selectedBy:
 *                       type: array
 *                       items:
 *                         type: string
 *                         description: IDs of users who selected the plan.
 *                         example: ["60d5f2e91c9d44000014d2c9"]
 *       '400':
 *         description: Invalid planID or request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid planID or request body
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.put('/:planID', adminProtect, updateWorkoutPlan);

/**
 * @swagger
 * /api/v1/plan/{planID}:
 *   delete:
 *     summary: Delete a workout plan
 *     description: Deletes a workout plan by plan ID. This endpoint is protected and requires admin authentication.
 *     tags:
 *       - Workout-plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout plan to delete
 *         example: "60d5f2e91c9d44000014d2c7"
 *     responses:
 *       '200':
 *         description: Plan deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Plan deleted successfully
 *       '400':
 *         description: Invalid planID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Plan not found
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.delete('/:planID', adminProtect, deleteWorkoutPlan);


////////////////////////////////////////////////////////////
/////////////////////// WORKOUT WEEKS //////////////////////

/**
 * @swagger
 * /api/v1/plan/{planID}/week:
 *   post:
 *     summary: Add a week to a workout plan
 *     description: Adds a new week plan to an existing workout plan. This endpoint is protected and requires admin authentication.
 *     tags:
 *       - Workout-plan - WEEK
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout plan
 *         example: "60d5f2e91c9d44000014d2c7"
 *       - in: body
 *         name: weekBody
 *         description: The week details to add to the workout plan
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - week
 *           properties:
 *             week:
 *               type: number
 *               example: 1
 *     responses:
 *       '200':
 *         description: Week plan added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Week plan added successfully
 *                 week:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5f2e91c9d44000014d2ca"
 *                     week:
 *                       type: number
 *                       example: 1
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["60d5f2e91c9d44000014d2c8", "60d5f2e91c9d44000014d2c9"]
 *                     createdAt:
 *                       type: string
 *                       example: "2023-07-23T19:22:00Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2023-07-23T19:22:00Z"
 *       '400':
 *         description: Invalid planID or week details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Plan not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post('/:planID/week', adminProtect, createWeekPlan);

/**
 * @swagger
 * /api/v1/plan/week/{weekID}:
 *   get:
 *     summary: Fetch week plan
 *     description: Retrieves the details of a specific week plan by its ID. This endpoint is protected and requires user authentication.
 *     tags:
 *       - Workout-plan - WEEK
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: weekID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the week plan
 *         example: "60d5f2e91c9d44000014d2c7"
 *     responses:
 *       '200':
 *         description: Week data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Week data fetched successfully
 *                 week:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5f2e91c9d44000014d2ca"
 *                     week:
 *                       type: number
 *                       example: 1
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["60d5f2e91c9d44000014d2c8", "60d5f2e91c9d44000014d2c9"]
 *                     createdAt:
 *                       type: string
 *                       example: "2023-07-23T19:22:00Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2023-07-23T19:22:00Z"
 *       '400':
 *         description: Invalid parameter or week data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid parameter or Week data not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/week/:weekID', userProtect, fetchWeekPlan)

/**
 * @swagger
 * /api/v1/plan/week/{weekID}:
 *   put:
 *     summary: Update a week plan
 *     description: Updates the details of a specific week plan by its ID. This endpoint is protected and requires admin authentication.
 *     tags:
 *       - Workout-plan - WEEK
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: weekID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the week plan to be updated
 *         example: "60d5f2e91c9d44000014d2c7"
 *       - in: body
 *         name: weekBody
 *         description: The week plan data to update
 *         schema:
 *           type: object
 *           properties:
 *             week:
 *               type: number
 *               example: 1
 *     responses:
 *       '200':
 *         description: Week plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Week plan updated successfully
 *                 weekPlan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5f2e91c9d44000014d2ca"
 *                     week:
 *                       type: number
 *                       example: 1
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["60d5f2e91c9d44000014d2c8", "60d5f2e91c9d44000014d2c9"]
 *                     createdAt:
 *                       type: string
 *                       example: "2023-07-23T19:22:00Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2023-07-23T19:22:00Z"
 *       '400':
 *         description: Invalid parameter or week data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Plan not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.put('/week/:weekID', adminProtect, updateWorkoutWeekPlan);

////////////////////////////////////////////////////////////
/////////////////////// WORKOUT DAYS ///////////////////////

/**
 * @swagger
 * /api/v1/plan/week/{weekID}/day:
 *   post:
 *     summary: Create a new day in a week of a workout-plan
 *     tags: [Workout-plan - DAY]
 *     parameters:
 *       - in: path
 *         name: weekID
 *         required: true
 *         description: The id of week which the day should push to.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               exe_image:
 *                 type: string
 *                 format: binary
 *               exe_video:
 *                 type: string
 *                 format: binary
 *               day_banner_image:
 *                 type: string
 *                 format: binary
 *               intro_video:
 *                 type: string
 *                 format: binary
 *               day:
 *                 type: number
 *               day_name:
 *                 type: string
 *               day_of_week:
 *                 type: string
 *               estimated_duration:
 *                 type: string
 *             required:
 *               - day
 *               - day_name
 *     responses:
 *       200:
 *         description: Created day in a week of a workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/week/:weekID/day', adminProtect, upload.fields([{ name: 'intro_video' }, { name: 'day_banner_image' }]), createDayPlan);

/**
 * @swagger
 * /api/v1/plan/day/{dayID}:
 *   get:
 *     summary: Fetch a day in a workout-plan
 *     tags: [Workout-plan - DAY]
 *     parameters:
 *       - in: path
 *         name: dayID
 *         required: true
 *         description: The id of the day
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched a day in a workout plan
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                day:
 *                  type: number
 *                day_name:
 *                  type: string
 *                day_banner_image:
 *                  type: string
 *                intro_video:
 *                  type: string
 *                day_of_week:
 *                  type: string
 *                estimated_duration:
 *                  type: string
 *                categories:
 *                  type: array
 *                  items:
 *                    category: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.get('/day/:dayID', userProtect, fetchDayPlan);

/**
 * @swagger
 * /api/v1/plan/day/{dayID}:
 *   put:
 *     summary: Update a day-plan for workout using dayID
 *     tags: [Workout-plan - DAY]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayID
 *         required: true
 *         description: "The _id of the day to update a single day's workout plan"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                day:
 *                  type: number
 *                day_name:
 *                  type: string
 *                day_banner_image:
 *                  type: string
 *                day_of_week:
 *                  type: string
 *                estimated_duration:
 *                  type: string
 *     responses:
 *       200:
 *         description: Day plan has been updated
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.put('/day/:dayID', adminProtect, updateWorkoutDayPlan);


///////////////////////////////////////////////////////////////
/////////////////////// WORKOUT CATEGORY //////////////////////

/**
 * @swagger
 * /api/v1/plan/day/{dayID}/category:
 *   post:
 *     summary: Create a new category in a day of a workout-plan
 *     tags: [Workout-plan - CATEGORY]
 *     parameters:
 *       - in: path
 *         name: dayID
 *         required: true
 *         description: The id of a day which the category should push to
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sub_category:
 *                 type: string
 *               circuit_rest_time:
 *                 type: number
 *               circuit_reps:
 *                 type: number
 *             required:
 *               - sub_category
 *     responses:
 *       200:
 *         description: Created Category in a workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/day/:dayID/category', adminProtect, createCategory);

/**
 * @swagger
 * /api/v1/plan/category/{categoryID}:
 *   get:
 *     summary: Fetch a category in a workout-plan
 *     tags: [Workout-plan - CATEGORY]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         description: The id of the day
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched a Category in a workout plan
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sub_category:
 *                  type: string
 *                circuit_rest_time:
 *                  type: number
 *                circuit_reps:
 *                  type: number
 *                exercises:
 *                  type: array
 *                  items:
 *                    exercise: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.get('/category/:categoryID', userProtect, fetchCategory);

/**
 * @swagger
 * /api/v1/plan/category/{categoryID}:
 *   put:
 *     summary: Update a category using categoryID
 *     tags: [Workout-plan - CATEGORY]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         description: "The _id of the category to update a category"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                sub_category:
 *                  type: string
 *                circuit_rest_time:
 *                  type: number
 *                circuit_reps:
 *                  type: number
 *     responses:
 *       200:
 *         description: Category has been updated
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.put('/category/:categoryID', adminProtect, updateWorkoutCategory);


///////////////////////////////////////////////////////////////
/////////////////////// WORKOUT EXERCISE //////////////////////
/**
 * @swagger
 * /api/v1/plan/category/{categoryID}/exercise:
 *   post:
 *     summary: Create a new exercise to a category in a workout-plan
 *     tags: [Workout-plan - EXERCISE]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         description: The id of a category which the exercise should push to
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               exercise_number:
 *                 type: number
 *               exercise_type:
 *                 type: string
 *               time_based:
 *                 type: string
 *               weighted:
 *                 type: string
 *               sets:
 *                 type: number
 *               reps:
 *                 type: array
 *                 items:
 *                   type: number
 *               set_time:
 *                 type: string
 *               superset_names:
 *                 type: array
 *                 items:
 *                   type: string
 *               rest_time:
 *                 type: number
 *     responses:
 *       200:
 *         description: Created Category in a workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/category/:categoryID/exercise', adminProtect, upload.fields([{ name: 'exe_video' }, { name: 'exe_image' }]), createExercise);

/**
 * @swagger
 * /api/v1/plan/exercise/{exerciseID}:
 *   get:
 *     summary: Fetch an exercise in a workout-plan
 *     tags: [Workout-plan - EXERCISE]
 *     parameters:
 *       - in: path
 *         name: exerciseID
 *         required: true
 *         description: The id of the exercise
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched an exercise in a workout plan
 *         content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/ExerciseSchema'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.get('/exercise/:exerciseID', userProtect, fetchExercise);

/**
 * @swagger
 * /api/v1/plan/exercise/{exerciseID}:
 *   put:
 *     summary: Update an exercise using exerciseID
 *     tags: [Workout-plan - EXERCISE]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseID
 *         required: true
 *         description: "The _id of the exercise to update an exercise"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                exercise_number:
 *                  type: number
 *                exercise_type:
 *                  type: string
 *                time_based:
 *                  type: string
 *                weighted:
 *                  type: string
 *                sets:
 *                  type: number
 *                reps:
 *                  type: array
 *                  items:
 *                    type: number
 *                set_time:
 *                  type: string
 *                superset_names:
 *                  type: array
 *                  items:
 *                    type: string
 *                rest_time:
 *                  type: number
 *                video_url:
 *                  type: string
 *                image_url:
 *                  type: string
 *     responses:
 *       200:
 *         description: Exercise has been updated
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.put('/exercise/:exerciseID', adminProtect, updateWorkoutExercise);


/**
 * @swagger
 * tags:
 *   name: Featured
 *   description: Routes for managing featured plans
 */

/**
 * @swagger
 * /api/v1/plan/featured/{planID}:
 *   post:
 *     summary: Update an plan's Featured status
 *     tags: [Featured]
 *     description: Call it for once for turning true again for false
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         description: _id of the plan to update featured status
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Plan status has been updated
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/featured/:planID', adminProtect, addFeaturedPlan);

/**
 * @swagger
 * /api/v1/plan/featured:
 *   get:
 *     summary: Fetch featured plans
 *     tags: [Featured]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Plans fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanSchema'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.get('/featured', userProtect, fetchFeaturedPlans);


/**
 * @swagger
 * tags:
 *   name: Trending
 *   description: Routes for managing trending plans
 */

/**
 * @swagger
 * /api/v1/plan/trending/{planID}:
 *   post:
 *     summary: Update an plan's Trending status
 *     tags: [Trending]
 *     description: Call it for once for turning true again for false
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         description: _id of the plan to update trending status
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Plan status has been updated
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/trending/:planID', adminProtect, addTrendingPlan);

/**
 * @swagger
 * /api/v1/plan/trending:
 *   get:
 *     summary: Fetch trending plans
 *     tags: [Trending]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Plans fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanSchema'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.get('/trending', userProtect, fetchTrendingPlans);



module.exports = router;