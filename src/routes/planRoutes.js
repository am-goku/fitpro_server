const express = require('express');
const { createWorkoutPlan, createWeeklyPlan, createDailyPlan, createNewExercise } = require('../controllers/planController');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Workout Plans
 *   description: Routes for admin to update workout plans
 */

/**
 * @swagger
 * /api/v1/plan/create:
 *   post:
 *     summary: Admin can add a new workout plans
 *     tags: [Admin - Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planName:
 *                 type: string
 *                 example: "Beginner Cardio"
 *               category:
 *                 type: string
 *                 example: "Cardio"
 *               duration:
 *                 type: number
 *                 example: 12
 *               daysPerWeek:
 *                 type: number
 *                 example: 3
 *               timePerDay:
 *                 type: string
 *                 example: "30 minutes"
 *               level:
 *                 type: string
 *                 example: "Beginner"
 *               location:
 *                 type: string
 *                 example: "Gym"
 *               description:
 *                 type: string
 *                 example: "A beginner level cardio workout plan."
 *               uploads:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["link_to_image1.jpg", "link_to_image2.jpg"]
 *             required:
 *               - planName
 *               - category
 *               - duration
 *               - daysPerWeek
 *               - timePerDay
 *               - level
 *     responses:
 *       '201':
 *         description: Successfully created a workout plan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109ca"
 *                 planName:
 *                   type: string
 *                   example: "Beginner Cardio"
 *                 category:
 *                   type: string
 *                   example: "Cardio"
 *                 duration:
 *                   type: number
 *                   example: 12
 *                 daysPerWeek:
 *                   type: number
 *                   example: 3
 *                 timePerDay:
 *                   type: string
 *                   example: "30 minutes"
 *                 level:
 *                   type: string
 *                   example: "Beginner"
 *                 location:
 *                   type: string
 *                   example: "Gym"
 *                 description:
 *                   type: string
 *                   example: "A beginner level cardio workout plan."
 *                 uploads:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["link_to_image1.jpg", "link_to_image2.jpg"]
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post('/create', adminProtect, createWorkoutPlan);


/**
 * @swagger
 * /api/v1/plan/create/week-plan:
 *   post:
 *     summary: Admin can add a new week plan
 *     tags: [Admin - Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weekNumber:
 *                 type: number
 *                 example: 1
 *               planID:
 *                 type: string
 *                 example: 6697a6e717e852492580bebe
 *             required:
 *               - weekNumber
 *               - planID
 *     responses:
 *       '201':
 *         description: Successfully created a week plan
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post('/create/week-plan', adminProtect, createWeeklyPlan);

/**
 * @swagger
 * /api/v1/plan/create/day-plan:
 *   post:
 *     summary: API to create a day-of-week plan
 *     tags: [Admin - Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dayNumber:
 *                 type: number
 *                 example: 1
 *               dayName:
 *                 type: string
 *                 example: Arms day
 *               duration:
 *                 type: string
 *                 example: ""
 *               subCategory:
 *                 type: string
 *                 example: ""
 *               bannerImage:
 *                 type: string
 *                 example: ""
 *               introVideo:
 *                 type: string
 *                 example: ""
 *               weekID:
 *                 type: string
 *                 example: 6697b371bf4177f7ff229b0c
 *             required:
 *               - dayNumber
 *               - dayName
 *               - duration
 *               - subCategory
 *               - bannerImage
 *               - introVideo
 *               - weekID
 *     responses:
 *       '201':
 *         description: Successfully created a day plan
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post('/create/day-plan', adminProtect, createDailyPlan);

/**
 * @swagger
 * /api/v1/plan/create/exercise:
 *   post:
 *     summary: API to create a new exercise to a day-of-week
 *     tags: [Admin - Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exerciseName:
 *                 type: string
 *                 example: ""
 *               type:
 *                 type: string
 *                 example: ""
 *               exerciseA:
 *                 type: string
 *                 example: ""
 *               exerciseB:
 *                 type: string
 *                 example: ""
 *               weighted:
 *                 type: boolean
 *                 example: false
 *               sets:
 *                 type: number
 *                 example: 4
 *               reps:
 *                 type: [number]
 *                 example: [10, 8, 6, 2]
 *               timeBased:
 *                 type: boolean
 *                 example: true
 *               setTime:
 *                 type: string
 *                 example: ""
 *               interExerciseRest:
 *                 type: string
 *                 example: ""
 *               restTime:
 *                 type: string
 *                 example: ""
 *               dayID:
 *                 type: string
 *                 example: 6697b664d638f5c61b48d2db
 *             required:
 *               - exerciseName
 *               - type
 *               - exerciseA
 *               - exerciseB
 *               - weighted
 *               - sets
 *               - reps
 *               - timeBased
 *               - setTime
 *               - interExerciseRest
 *               - restTime
 *               - dayID
 *     responses:
 *       '201':
 *         description: Successfully created new exercise to a day plan
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post('/create/exercise', adminProtect, createNewExercise)

module.exports = router;