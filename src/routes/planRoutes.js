const express = require('express');
const { adminProtect } = require('../middleware/authMiddleware');
const { createWorkoutPlan, fetchWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan } = require('../controllers/planController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Workout-plan
 *   description: Routes for admin to update workout plans
 */

/**
 * @swagger
 * /api/v1/plan/create:
 *   post:
 *     summary: Create a new workout plan
 *     tags: [Workout-plan]
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
router.post('/create', adminProtect, createWorkoutPlan)

/**
 * @swagger
 * /api/v1/plan/fetch:
 *   get:
 *     summary: Fetch all workout plans / fetch single workout plan using ID
 *     tags: [Workout-plan]
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
router.get('/fetch', fetchWorkoutPlan)

/**
 * @swagger
 * /api/v1/plan/update/{planID}:
 *   patch:
 *     summary: Update a new workout plan using planID
 *     tags: [Workout-plan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         description: "The ID of the workout plan to update a single workout plan"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanSchema'
 *     responses:
 *       200:
 *         description: Updated workout plan
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.patch('/update/:planID', adminProtect, updateWorkoutPlan);

/**
 * @swagger
 * /api/v1/plan/delete/{planID}:
 *   delete:
 *     summary: Delete a workout plan
 *     tags: [Workout-plan]
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