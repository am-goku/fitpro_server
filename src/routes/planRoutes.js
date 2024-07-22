const express = require('express');
const { adminProtect, userProtect } = require('../middleware/authMiddleware');
const { fetchWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan, updateWorkoutWeekPlan, updateWorkoutDayPlan, updateWorkoutCategory, updateWorkoutExercise, fetchWorkoutOverview, createJsonWorkoutPlan, createWorkoutPlan } = require('../controllers/planController');
const upload = require('../utils/multerConfig');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Workout-plan - CREATE
 *   description: Routes to workout plans
 */

/**
 * @swagger
 * /api/v1/plan/create/json:
 *   post:
 *     summary: Create a new workout plan using JSON
 *     tags: [Workout-plan - CREATE]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanSchema'
 *     responses:
 *       200:
 *         description: Created workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 * components:
 *   schemas:
 *     ExerciseSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         exercise_number:
 *           type: number
 *         exercise_type:
 *           type: string
 *         time_based:
 *           type: string
 *         weighted:
 *           type: string
 *         sets:
 *           type: number
 *         reps:
 *           type: array
 *           items:
 *             type: number
 *         set_time:
 *           type: string
 *         superset_names:
 *           type: array
 *           items:
 *             type: string
 *         rest_time:
 *           type: number
 *         video_url:
 *           type: string
 *         image_url:
 *           type: string
 *     CategorySchema:
 *       type: object
 *       properties:
 *         sub_category:
 *           type: string
 *         circuit_rest_time:
 *           type: number
 *         circuit_reps:
 *           type: number
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseSchema'
 *     DaySchema:
 *       type: object
 *       properties:
 *         day:
 *           type: number
 *         day_name:
 *           type: string
 *         day_banner_image:
 *           type: string
 *         day_of_week:
 *           type: string
 *         estimated_duration:
 *           type: string
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CategorySchema'
 *     WeekSchema:
 *       type: object
 *       properties:
 *         week:
 *           type: number
 *         days:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DaySchema'
 *     PlanSchema:
 *       type: object
 *       properties:
 *         plan_name:
 *           type: string
 *         description:
 *           type: string
 *         banner_image:
 *           type: string
 *         workout_keywords:
 *           type: string
 *         goal_orientation:
 *           type: array
 *           items:
 *             type: string
 *         target_age_group:
 *           type: string
 *         training_type:
 *           type: string
 *         location:
 *           type: string
 *         level:
 *           type: string
 *         estimated_duration:
 *           type: string
 *         rest_between_exercises_seconds:
 *           type: number
 *         average_calories_burned_per_minute:
 *           type: number
 *         weeks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WeekSchema'
 *       required:
 *         - workout_name
 */
router.post('/create/json', adminProtect, createJsonWorkoutPlan)

/**
 * @swagger
 * /api/v1/plan/create:
 *   post:
 *     summary: Create a new workout plan (Overview)
 *     tags: [Workout-plan - CREATE]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner_image:
 *                 type: string
 *                 format: binary
 *               plan_video:
 *                 type: string
 *                 format: binary
 *               plan_name:
 *                 type: string
 *               description:
 *                 type: string
 *               workout_keywords:
 *                 type: string
 *               goal_orientation:
 *                 type: array
 *                 items:
 *                   type: string
 *               target_age_group:
 *                 type: string
 *               training_type:
 *                 type: string
 *               location:
 *                 type: string
 *               level:
 *                 type: string
 *               estimated_duration:
 *                 type: string
 *               rest_between_exercises_seconds:
 *                 type: number
 *               average_calories_burned_per_minute:
 *                 type: number
 *             required:
 *               - plan_name
 *     responses:
 *       200:
 *         description: Created workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/create', adminProtect, upload.fields([{ name: 'banner_image' }, { name: 'plan_video' }]), createWorkoutPlan);


/**
 * @swagger
 * tags:
 *   name: Workout-plan - READ
 *   description: Routes for admin to update workout plans
 */

/**
 * @swagger
 * /api/v1/plan/fetch:
 *   get:
 *     summary: Fetch all workout plans / fetch single workout plan using ID
 *     tags: [Workout-plan - READ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: planID
 *         required: false
 *         schema:
 *           type: string
 *         description: "The ID of the workout plan to fetch a single workout plan"
 *     responses:
 *       200:
 *         description: Workout plan / plans successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanSchema'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.get('/fetch', userProtect, fetchWorkoutPlan)

/**
 * @swagger
 * /api/v1/plan/overview:
 *   get:
 *     summary: Fetch all workout Overviews of plans / fetch single workout Overview of a plan using ID
 *     tags: [Workout-plan - READ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: planID
 *         required: false
 *         schema:
 *           type: string
 *         description: "The ID of the workout plan to fetch a single workout overview"
 *     responses:
 *       200:
 *         description: Workout overview of a plan / plans successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan_name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 banner_image:
 *                   type: string
 *                 workout_keywords:
 *                   type: string
 *                 goal_orientation:
 *                   type: array
 *                   items:
 *                     type: string
 *                 target_age_group:
 *                   type: string
 *                 training_type:
 *                   type: string
 *                 location:
 *                   type: string
 *                 level:
 *                   type: string
 *                 estimated_duration:
 *                   type: string
 *                 rest_between_exercises_seconds:
 *                   type: number
 *                 average_calories_burned_per_minute:
 *                   type: number
 *                 weeks:
 *                   type: array
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.get('/overview', userProtect, fetchWorkoutOverview);


/**
 * @swagger
 * tags:
 *   name: Workout-plan - UPDATE
 *   description: Routes for admin to update workout plans
 */

/**
 * @swagger
 * /api/v1/plan/update/{planID}:
 *   put:
 *     summary: Update a new workout-plan using planID - OVERVIEW ONLY
 *     tags: [Workout-plan - UPDATE]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         description: "The _id of the workout plan to update a single workout plan"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                plan_name:
 *                  type: string
 *                description:
 *                  type: string
 *                banner_image:
 *                  type: string
 *                workout_keywords:
 *                  type: string
 *                goal_orientation:
 *                  type: array
 *                  items:
 *                    type: string
 *                target_age_group:
 *                  type: string
 *                training_type:
 *                  type: string
 *                location:
 *                  type: string
 *                level:
 *                  type: string
 *                estimated_duration:
 *                  type: string
 *                rest_between_exercises_seconds:
 *                  type: number
 *                average_calories_burned_per_minute:
 *                  type: number
 *     responses:
 *       200:
 *         description: Updated workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.put('/update/:planID', adminProtect, updateWorkoutPlan);

/**
 * @swagger
 * /api/v1/plan/update/week/{weekID}:
 *   put:
 *     summary: Update a week-plan for workout using weekID
 *     tags: [Workout-plan - UPDATE]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: weekID
 *         required: true
 *         description: "The _id of the week to update a single week's workout plan"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                week:
 *                  type: number
 *     responses:
 *       200:
 *         description: Week plan has been updated
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.put('/update/week/:weekID', adminProtect, updateWorkoutWeekPlan);

/**
 * @swagger
 * /api/v1/plan/update/day/{dayID}:
 *   put:
 *     summary: Update a day-plan for workout using dayID
 *     tags: [Workout-plan - UPDATE]
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
router.put('/update/day/:dayID', adminProtect, updateWorkoutDayPlan);

/**
 * @swagger
 * /api/v1/plan/update/category/{categoryID}:
 *   put:
 *     summary: Update a category using categoryID
 *     tags: [Workout-plan - UPDATE]
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
router.put('/update/category/:categoryID', adminProtect, updateWorkoutCategory);

/**
 * @swagger
 * /api/v1/plan/update/exercise/{exerciseID}:
 *   put:
 *     summary: Update an exercise using exerciseID
 *     tags: [Workout-plan - UPDATE]
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
router.put('/update/exercise/:exerciseID', adminProtect, updateWorkoutExercise);


/**
 * @swagger
 * tags:
 *   name: Workout-plan - DELETE
 *   description: Routes for admin to update workout plans
 */

/**
 * @swagger
 * /api/v1/plan/delete/{planID}:
 *   delete:
 *     summary: Delete a workout plan
 *     tags: [Workout-plan - DELETE]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         description: "The ID of the workout plan to delete a single workout plan"
 *     responses:
 *       200:
 *         description: Deleted workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.delete('/delete/:planID', adminProtect, deleteWorkoutPlan);

module.exports = router;