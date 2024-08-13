/** ---------------- WORKOUT PLAN SECTION ---------------- */

/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: Routes for admin to update workout plans
 */

/**
 * @swagger
 * /api/v1/plan/create:
 *   post:
 *     summary: Creates a workout plan from JSON data
 *     description: Creates and saves a new workout plan using the provided JSON data, including weeks, days, categories, and exercises. The route is protected and requires admin privileges.
 *     tags:
 *       - Plans
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
 *                   $ref: '#/components/schemas/Plan'
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

/**
 * @swagger
 * /api/v1/plan/create/json:
 *   post:
 *     summary: Create a workout plan using JSON
 *     description: Uploads a JSON file to create a workout plan with nested weeks, days, categories, and exercises.
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               planData:
 *                 type: string
 *                 format: binary
 *                 description: JSON file containing the workout plan data
 *     responses:
 *       200:
 *         description: Workout plan saved successfully
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
 *                   $ref: '#/components/schemas/Plan'
 *       400:
 *         description: No JSON file provided
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
 *                   example: No JSON file provided
 *       500:
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
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/v1/plan/fetch:
 *   get:
 *     summary: Fetches workout plans
 *     description: Fetches workout plans based on the provided ID. If no ID is provided, it fetches all plans. This endpoint is protected and requires user authentication.
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: planID
 *         schema:
 *           type: string
 *         description: The ID of the workout plan to fetch
 *         required: false
 *         example: "60d5f2e91c9d44000014d2c7"
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location where the training can be performed (e.g., Home)
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Filter by difficulty level of the plan (e.g., Beginner)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type of training (e.g., strength, cardio)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by keywords related to the workout or plan name
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
 *                     $ref: '#/components/schemas/Plan'
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

/**
 * @swagger
 * /api/v1/plan/overview:
 *   get:
 *     summary: Fetches plan overview details
 *     description: Retrieves detailed information about workout plans. Can optionally filter by various parameters.
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: planID
 *         schema:
 *           type: string
 *         description: The ID of the plan to retrieve. If not provided, retrieves all plans.
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location where the training can be performed (e.g., Home)
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Filter by difficulty level of the plan (e.g., Beginner)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type of training (e.g., strength, cardio)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by keywords related to the workout or plan name
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
 *                           example: ["60d5f2e91c9d44000014d2c8", "60d5f2e91c9d44000014d2c9"]
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

/**
 * @swagger
 * /api/v1/plan/{planID}:
 *   put:
 *     summary: Update a workout plan
 *     description: Updates the details of an existing workout plan by plan ID. This endpoint is protected and requires admin authentication.
 *     tags:
 *       - Plans
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

/**
 * @swagger
 * /api/v1/plan/{planID}:
 *   delete:
 *     summary: Delete a workout plan
 *     description: Deletes a workout plan by plan ID. This endpoint is protected and requires admin authentication.
 *     tags:
 *       - Plans
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


/** ---------------- WORKOUT WEEK SECTION ---------------- */

/**
 * @swagger
 * /api/v1/plan/week/{weekID}:
 *   get:
 *     summary: Fetch week plan
 *     description: Retrieves the details of a specific week plan by its ID. This endpoint is protected and requires user authentication.
 *     tags:
 *       - Plans - WEEK
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

/**
 * @swagger
 * /api/v1/plan/week/{weekID}:
 *   put:
 *     summary: Update a week plan
 *     description: Updates the details of a specific week plan by its ID. This endpoint is protected and requires admin authentication.
 *     tags:
 *       - Plans - WEEK
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


/** ---------------- WORKOUT DAY SECTION ---------------- */

/**
* @swagger
* /api/v1/plan/day/{dayID}:
*   get:
*     summary: Fetch a specific day plan by ID
*     tags: 
*       - Plans - DAY
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: dayID
*         required: true
*         schema:
*           type: string
*         description: The ID of the day plan to fetch
*     responses:
*       200:
*         description: Day data fetched successfully
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
*                   example: "Day data fetched successfully"
*                 day:
*                   type: object
*                   properties:
*                     _id:
*                       type: string
*                       example: "60b8d295c8aeb43a2b6c05c7"
*                     day:
*                       type: integer
*                       example: 1
*                     day_name:
*                       type: string
*                       example: "Monday"
*                     day_banner_image:
*                       type: string
*                       example: "https://example.com/banner.jpg"
*                     intro_video:
*                       type: string
*                       example: "https://example.com/video.mp4"
*                     day_of_week:
*                       type: string
*                       example: "Monday"
*                     estimated_duration:
*                       type: string
*                       example: "45 minutes"
*                     categories:
*                       type: array
*                       items:
*                         type: string
*                         example: "60b8d295c8aeb43a2b6c05d7"
*       400:
*         description: Invalid parameter
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
*                   example: "Invalid parameter"
*       500:
*         description: Internal Server Error
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
*                   example: "Internal Server Error"
*/

/**
 * @swagger
 * /api/v1/plan/day/{dayID}:
 *   put:
 *     summary: Update a specific day plan by ID
 *     tags: 
 *       - Plans - DAY
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the day plan to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: number
 *                 example: 1
 *               day_name:
 *                 type: string
 *                 example: "Monday"
 *               day_banner_image:
 *                 type: string
 *                 example: "https://example.com/banner.jpg"
 *               intro_video:
 *                 type: string
 *                 example: "https://example.com/video.mp4"
 *               day_of_week:
 *                 type: string
 *                 example: "Monday"
 *               estimated_duration:
 *                 type: string
 *                 example: "45 minutes"
 *     responses:
 *       200:
 *         description: Day plan updated successfully
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
 *                   example: "Day plan updated successfully"
 *                 dayPlan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b8d295c8aeb43a2b6c05c7"
 *                     day:
 *                       type: integer
 *                       example: 1
 *                     day_name:
 *                       type: string
 *                       example: "Monday"
 *                     day_banner_image:
 *                       type: string
 *                       example: "https://example.com/banner.jpg"
 *                     intro_video:
 *                       type: string
 *                       example: "https://example.com/video.mp4"
 *                     day_of_week:
 *                       type: string
 *                       example: "Monday"
 *                     estimated_duration:
 *                       type: string
 *                       example: "45 minutes"
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60b8d295c8aeb43a2b6c05d7"
 *       400:
 *         description: Plan not found
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
 *                   example: "Plan not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */


/** ---------------- WORKOUT CATEGORY SECTION ---------------- */

/**
 * @swagger
 * /api/v1/plan/category/{categoryID}:
 *   get:
 *     summary: Fetch a category by ID
 *     tags: 
 *       - CATEGORY
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to fetch
 *       - in: query
 *         name: populate
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Pass it as true if the response need to be populated.
 *     responses:
 *       200:
 *         description: Category fetched successfully
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
 *                   example: "Category fetched successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b8d295c8aeb43a2b6c05d7"
 *                     sub_category:
 *                       type: string
 *                       example: "Warm up"
 *                     circuit_rest_time:
 *                       type: number
 *                       example: 60
 *                     circuit_reps:
 *                       type: number
 *                       example: 3
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60b8d295c8aeb43a2b6c05d7"
 *       400:
 *         description: Category not found
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
 *                   example: "Category not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/plan/category/{categoryID}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - CATEGORY
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             sub_category:
 *               type: string
 *               example: "Warm up"
 *             circuit_rest_time:
 *               type: number
 *               example: 60
 *             circuit_reps:
 *               type: number
 *               example: 3
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: "Category updated successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b8d295c8aeb43a2b6c05d7"
 *                     sub_category:
 *                       type: string
 *                       example: "Warm up"
 *                     circuit_rest_time:
 *                       type: number
 *                       example: 60
 *                     circuit_reps:
 *                       type: number
 *                       example: 3
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60b8d295c8aeb43a2b6c05d7"
 *       400:
 *         description: Category not found
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
 *                   example: "Category not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */


/** ---------------- WORKOUT EXERCISE SECTION ---------------- */

/**
 * @swagger
 * /api/v1/plan/exercise/{exerciseID}:
 *   get:
 *     summary: Fetch an exercise by its ID
 *     tags:
 *       - EXERCISE
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise to fetch
 *     responses:
 *       200:
 *         description: Exercise fetched successfully
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
 *                   example: "Exercise fetched successfully"
 *                 exercise:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b8d295c8aeb43a2b6c05d7"
 *                     name:
 *                       type: string
 *                       example: "Push Ups"
 *                     exercise_number:
 *                       type: number
 *                       example: 1
 *                     exercise_type:
 *                       type: string
 *                       example: "Normal"
 *                     time_based:
 *                       type: string
 *                       example: "Yes"
 *                     weighted:
 *                       type: string
 *                       example: "No"
 *                     sets:
 *                       type: number
 *                       example: 3
 *                     reps:
 *                       type: array
 *                       items:
 *                         type: number
 *                         example: 10
 *                     set_time:
 *                       type: string
 *                       example: "30 seconds"
 *                     superset_names:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Jumping Jacks"
 *                     rest_time:
 *                       type: number
 *                       example: 60
 *                     video_url:
 *                       type: string
 *                       example: "http://example.com/video.mp4"
 *                     image_url:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *       400:
 *         description: Invalid parameter or Exercise not found
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
 *                   example: "Invalid parameter or Exercise not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/plan/exercise/{exerciseID}:
 *   put:
 *     summary: Update an exercise
 *     tags:
 *       - EXERCISE
 *     security:
 *       - bearerAuth: []
 *     description: Updates the details of a specific exercise.
 *     parameters:
 *       - name: exerciseID
 *         in: path
 *         required: true
 *         description: The ID of the exercise to update
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: The updated exercise details
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the exercise
 *             exercise_number:
 *               type: integer
 *               description: The exercise number
 *             exercise_type:
 *               type: string
 *               description: The type of exercise (e.g., Normal, Dropset)
 *             time_based:
 *               type: string
 *               description: Time-based information
 *             weighted:
 *               type: string
 *               description: Indicates if the exercise is weighted
 *             sets:
 *               type: integer
 *               description: Number of sets
 *             reps:
 *               type: array
 *               items:
 *                 type: integer
 *               description: Repetitions per set
 *             set_time:
 *               type: string
 *               description: Time for each set
 *             superset_names:
 *               type: array
 *               items:
 *                 type: string
 *               description: Names of supersets
 *             rest_time:
 *               type: integer
 *               description: Rest time between sets
 *             video_url:
 *               type: string
 *               description: URL for the exercise video
 *             image_url:
 *               type: string
 *               description: URL for the exercise image
 *     responses:
 *       200:
 *         description: Exercise updated successfully
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
 *                   example: Exercise updated successfully
 *                 exercise:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b8d295c8aeb43a2b6c05d7"
 *                     name:
 *                       type: string
 *                       example: "Push Ups"
 *                     exercise_number:
 *                       type: number
 *                       example: 1
 *                     exercise_type:
 *                       type: string
 *                       example: "Normal"
 *                     time_based:
 *                       type: string
 *                       example: "Yes"
 *                     weighted:
 *                       type: string
 *                       example: "No"
 *                     sets:
 *                       type: number
 *                       example: 3
 *                     reps:
 *                       type: array
 *                       items:
 *                         type: number
 *                         example: 10
 *                     set_time:
 *                       type: string
 *                       example: "30 seconds"
 *                     superset_names:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Jumping Jacks"
 *                     rest_time:
 *                       type: number
 *                       example: 60
 *                     video_url:
 *                       type: string
 *                       example: "http://example.com/video.mp4"
 *                     image_url:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *       400:
 *         description: Invalid request body or missing exerciseID
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
 *                   example: Invalid request body or Missing exerciseID
 *       404:
 *         description: Exercise not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Exercise not found
 *       500:
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


/** ---------------- FEATURED WORKOUT SECTION ---------------- */
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
 *     summary: Toggle featured status of a plan
 *     tags:
 *       - Featured
 *     security:
 *       - bearerAuth: []
 *     description: Toggles the featured status of a specified plan. If the plan is currently featured, it will be unfeatured, and vice versa.
 *     parameters:
 *       - name: planID
 *         in: path
 *         required: true
 *         description: The ID of the plan whose featured status is to be toggled
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully toggled the featured status of the plan
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
 *                   example: Changed featured status
 *                 featuredPlan:
 *                   type: object
 *                   properties:
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
 *       400:
 *         description: Plan not found or invalid request
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
 *                   example: Plan not found or invalid request
 *       500:
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

/**
 * @swagger
 * /api/v1/plan/featured:
 *   get:
 *     summary: Retrieve featured workout plans
 *     description: Fetches a list of workout plans marked as featured.
 *     tags:
 *       - Featured
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with featured plans
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
 *                   example: "Fetched featured plans"
 *                 featuredPlans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       plan_name:
 *                         type: string
 *                         example: "Summer Body Transformation"
 *                       description:
 *                         type: string
 *                         example: "A comprehensive plan to get in shape for summer."
 *                       banner_image:
 *                         type: string
 *                         example: "https://example.com/banner.jpg"
 *                       plan_video:
 *                         type: string
 *                         example: "https://example.com/intro.mp4"
 *                       workout_keywords:
 *                         type: string
 *                         example: "cardio, strength"
 *                       goal_orientation:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["flexibility", "strength"]
 *                       target_age_group:
 *                         type: string
 *                         example: "30-40"
 *                       training_type:
 *                         type: string
 *                         example: "HIIT"
 *                       location:
 *                         type: string
 *                         example: "Home"
 *                       level:
 *                         type: string
 *                         example: "Intermediate"
 *                       estimated_duration:
 *                         type: string
 *                         example: "6 weeks"
 *                       rest_between_exercises_seconds:
 *                         type: integer
 *                         example: 60
 *                       average_calories_burned_per_minute:
 *                         type: number
 *                         format: float
 *                         example: 8.5
 *                       weeks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             week:
 *                               type: integer
 *                               example: 1
 *                             days:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   day:
 *                                     type: integer
 *                                     example: 1
 *                                   day_name:
 *                                     type: string
 *                                     example: "Leg Day"
 *                                   day_banner_image:
 *                                     type: string
 *                                     example: "https://example.com/day-banner.jpg"
 *                                   intro_video:
 *                                     type: string
 *                                     example: "https://example.com/day-intro.mp4"
 *                                   day_of_week:
 *                                     type: string
 *                                     example: "Monday"
 *                                   estimated_duration:
 *                                     type: string
 *                                     example: "45 minutes"
 *                                   categories:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         sub_category:
 *                                           type: string
 *                                           example: "Cardio"
 *                                         circuit_rest_time:
 *                                           type: integer
 *                                           example: 60
 *                                         circuit_reps:
 *                                           type: integer
 *                                           example: 3
 *                                         exercises:
 *                                           type: array
 *                                           items:
 *                                             type: object
 *                                             properties:
 *                                               name:
 *                                                 type: string
 *                                                 example: "Push-up"
 *                                               exercise_number:
 *                                                 type: integer
 *                                                 example: 1
 *                                               exercise_type:
 *                                                 type: string
 *                                                 example: "Strength"
 *                                               time_based:
 *                                                 type: string
 *                                                 example: "30 seconds"
 *                                               weighted:
 *                                                 type: string
 *                                                 example: "No"
 *                                               sets:
 *                                                 type: integer
 *                                                 example: 3
 *                                               reps:
 *                                                 type: array
 *                                                 items:
 *                                                   type: integer
 *                                                 example: [10, 12, 15]
 *                                               set_time:
 *                                                 type: string
 *                                                 example: "1 minute"
 *                                               superset_names:
 *                                                 type: array
 *                                                 items:
 *                                                   type: string
 *                                                 example: ["Chest Superset"]
 *                                               rest_time:
 *                                                 type: integer
 *                                                 example: 60
 *                                               video_url:
 *                                                 type: string
 *                                                 example: "https://example.com/exercise-video.mp4"
 *                                               image_url:
 *                                                 type: string
 *                                                 example: "https://example.com/exercise-image.jpg"
 *       500:
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
 *                   example: "Internal Server Error"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */


/** ---------------- TRENDING WORKOUT SECTION ---------------- */
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
 *     summary: Toggle the trending status of a plan
 *     description: Changes the trending status of a specified workout plan.
 *     tags:
 *       - Trending
 *     parameters:
 *       - name: planID
 *         in: path
 *         description: The ID of the plan to update
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated the trending status of the plan
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
 *                   example: "Changed trending status"
 *                 trendingPlan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the plan
 *                     plan_name:
 *                       type: string
 *                       description: Name of the plan
 *                     description:
 *                       type: string
 *                       description: Description of the plan
 *                     banner_image:
 *                       type: string
 *                       description: URL of the banner image for the plan
 *                     plan_video:
 *                       type: string
 *                       description: URL of the video for the plan
 *                     workout_keywords:
 *                       type: string
 *                       description: Keywords related to the workout
 *                     goal_orientation:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Goals associated with the plan
 *                     target_age_group:
 *                       type: string
 *                       description: Target age group for the plan
 *                     training_type:
 *                       type: string
 *                       description: Type of training (e.g., strength, cardio)
 *                     location:
 *                       type: string
 *                       description: Location where the training can be performed (e.g., Home)
 *                     level:
 *                       type: string
 *                       description: Difficulty level of the plan (e.g., Beginner)
 *                     estimated_duration:
 *                       type: string
 *                       description: Estimated duration of the plan
 *                     rest_between_exercises_seconds:
 *                       type: number
 *                       description: Rest time between exercises in seconds
 *                     average_calories_burned_per_minute:
 *                       type: number
 *                       description: Average calories burned per minute
 *                     weeks:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of week plan IDs
 *                     isTrending:
 *                       type: boolean
 *                       description: Whether the plan is trending
 *                     isFeatured:
 *                       type: boolean
 *                       description: Whether the plan is featured
 *                     views:
 *                       type: number
 *                       description: Number of views for the plan
 *                     selectedBy:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of user IDs who have selected the plan
 *       500:
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
 *                   example: "Internal Server Error"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/plan/trending:
 *   get:
 *     summary: Retrieve trending workout plans
 *     description: Fetches a list of workout plans marked as trending.
 *     tags:
 *       - Trending
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the trending plans
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
 *                   example: "Fetched trending plans"
 *                 trendingPlans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5f3c0c15b2c001c8e4c42"
 *                       plan_name:
 *                         type: string
 *                         example: "Summer Body Transformation"
 *                       description:
 *                         type: string
 *                         example: "A comprehensive plan to get in shape for summer."
 *                       banner_image:
 *                         type: string
 *                         example: "https://example.com/banner.jpg"
 *                       plan_video:
 *                         type: string
 *                         example: "https://example.com/intro.mp4"
 *                       workout_keywords:
 *                         type: string
 *                         example: "cardio, strength"
 *                       goal_orientation:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["flexibility", "strength"]
 *                       target_age_group:
 *                         type: string
 *                         example: "30-40"
 *                       training_type:
 *                         type: string
 *                         example: "HIIT"
 *                       location:
 *                         type: string
 *                         example: "Home"
 *                       level:
 *                         type: string
 *                         example: "Intermediate"
 *                       estimated_duration:
 *                         type: string
 *                         example: "6 weeks"
 *                       rest_between_exercises_seconds:
 *                         type: integer
 *                         example: 60
 *                       average_calories_burned_per_minute:
 *                         type: number
 *                         format: float
 *                         example: 8.5
 *                       weeks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             week:
 *                               type: integer
 *                               example: 1
 *                             days:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   day:
 *                                     type: integer
 *                                     example: 1
 *                                   day_name:
 *                                     type: string
 *                                     example: "Leg Day"
 *                                   day_banner_image:
 *                                     type: string
 *                                     example: "https://example.com/day-banner.jpg"
 *                                   intro_video:
 *                                     type: string
 *                                     example: "https://example.com/day-intro.mp4"
 *                                   day_of_week:
 *                                     type: string
 *                                     example: "Monday"
 *                                   estimated_duration:
 *                                     type: string
 *                                     example: "45 minutes"
 *                                   categories:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         sub_category:
 *                                           type: string
 *                                           example: "Cardio"
 *                                         circuit_rest_time:
 *                                           type: integer
 *                                           example: 60
 *                                         circuit_reps:
 *                                           type: integer
 *                                           example: 3
 *                                         exercises:
 *                                           type: array
 *                                           items:
 *                                             type: object
 *                                             properties:
 *                                               name:
 *                                                 type: string
 *                                                 example: "Push-up"
 *                                               exercise_number:
 *                                                 type: integer
 *                                                 example: 1
 *                                               exercise_type:
 *                                                 type: string
 *                                                 example: "Strength"
 *                                               time_based:
 *                                                 type: string
 *                                                 example: "30 seconds"
 *                                               weighted:
 *                                                 type: string
 *                                                 example: "No"
 *                                               sets:
 *                                                 type: integer
 *                                                 example: 3
 *                                               reps:
 *                                                 type: array
 *                                                 items:
 *                                                   type: integer
 *                                                 example: [10, 12, 15]
 *                                               set_time:
 *                                                 type: string
 *                                                 example: "1 minute"
 *                                               superset_names:
 *                                                 type: array
 *                                                 items:
 *                                                   type: string
 *                                                 example: ["Chest Superset"]
 *                                               rest_time:
 *                                                 type: integer
 *                                                 example: 60
 *                                               video_url:
 *                                                 type: string
 *                                                 example: "https://example.com/exercise-video.mp4"
 *                                               image_url:
 *                                                 type: string
 *                                                 example: "https://example.com/exercise-image.jpg"
 *       500:
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
 *                   example: "Internal Server Error"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */


/** ---------------- IMAGE UPLOAD ---------------------------- */

/**
 * @swagger
 * /api/v1/plan/files/upload:
 *   post:
 *     summary: Upload a new file and returns url
 *     tags:
 *       - FILE UPLOAD - Images/Videos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 required: true
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
 *                   example: File uploaded successfully
 *                 url:
 *                   type: string
 *                   example: "http://example.com/file.jpg"
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


/** ---------------- USER WORKOUT SECTION -------------------- */

/**
 * @swagger
 * /api/v1/user-plan/select-plan/{planID}:
 *   post:
 *     summary: Select a workout plan for a user
 *     description: Assigns a workout plan to a user and initializes their exercises.
 *     tags:
 *       - User - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the workout plan to select
 *     responses:
 *       201:
 *         description: Workout plan selected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Workout plan selected successfully
 *                 UserPlan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     user:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109cb
 *                     plan:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109cc
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           exerciseID:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109cd
 *                           completed:
 *                             type: boolean
 *                             example: false
 *                           completion_date:
 *                             type: string
 *                             format: date-time
 *                             example: null
 *                     completedExercises:
 *                       type: integer
 *                       example: 0
 *                     totalExercises:
 *                       type: integer
 *                       example: 10
 *                     completionPercentage:
 *                       type: number
 *                       format: float
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-06-22T07:48:15.352Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-06-22T07:48:15.352Z
 *       400:
 *         description: Plan not found
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
 *       500:
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
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/v1/user-plan/update-progress/{exerciseID}:
 *   put:
 *     summary: Update exercise completion status
 *     description: Updates the completion status of a specific exercise for a user and recalculates the workout completion percentage.
 *     tags:
 *       - User - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exercise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: Completion status of the exercise
 *                 example: true
 *               setData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     set:
 *                       type: number
 *                       example: 1
 *                     weight:
 *                       type: number
 *                       example: 53
 *                     reps:
 *                       type: number
 *                       example: 5
 *     responses:
 *       200:
 *         description: Exercise status updated successfully
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
 *                   example: Exercise status updated successfully
 *                 UserPlan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     user:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109cb
 *                     plan:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109cc
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           exerciseID:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109cd
 *                           completed:
 *                             type: boolean
 *                             example: true
 *                           completion_date:
 *                             type: string
 *                             format: date-time
 *                             example: null
 *                     completedExercises:
 *                       type: integer
 *                       example: 5
 *                     totalExercises:
 *                       type: integer
 *                       example: 10
 *                     completionPercentage:
 *                       type: number
 *                       format: float
 *                       example: 50
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-06-22T07:48:15.352Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-06-22T07:48:15.352Z
 *       400:
 *         description: No matching document found to update
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
 *                   example: No matching document found to update
 *       500:
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
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/v1/user-plan:
 *   get:
 *     summary: Get workout progress for a user
 *     description: Retrieves the workout progress for a user, optionally filtered by plan ID.
 *     tags:
 *       - User - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: planID
 *         schema:
 *           type: string
 *         description: ID of the workout plan to filter by (optional)
 *     responses:
 *       200:
 *         description: Workout progress retrieved successfully
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
 *                   example: Workout progress retrieved successfully
 *                 plans:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Plan'
 *       400:
 *         description: User workout plan not found
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
 *                   example: User workout plan not found
 *       500:
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
 *                   example: Internal server error
 */




/**
 * @swagger
 * /api/v1/workouts/{workoutID}/exercises:
 *   get:
 *     summary: Get exercises searatly {exercises, circuit, superset}
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         schema:
 *           type: string
 *         description: ID of the workout plan
 */

