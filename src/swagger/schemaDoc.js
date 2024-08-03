/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user
 *         name:
 *           type: string
 *           description: The name of the user
 *           minLength: 3
 *           maxLength: 50
 *         profilePic:
 *           type: string
 *           description: URL of the user's profile picture
 *         email:
 *           type: string
 *           description: The email address of the user
 *         isVerified:
 *           type: boolean
 *           description: Indicates if the user's email is verified
 *         role:
 *           type: string
 *           description: The role of the user (e.g., user, admin)
 *           enum:
 *             - user
 *             - admin
 *         age:
 *           type: integer
 *           description: The age of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *           enum:
 *             - male
 *             - female
 *             - other
 *         height:
 *           type: object
 *           properties:
 *             value:
 *               type: integer
 *               description: The height value
 *               minimum: 0
 *             unit:
 *               type: string
 *               description: The unit of height measurement (e.g., cm, ft)
 *               enum:
 *                 - cm
 *                 - ft
 *         weight:
 *           type: object
 *           properties:
 *             value:
 *               type: integer
 *               description: The weight value
 *               minimum: 0
 *             unit:
 *               type: string
 *               description: The unit of weight measurement (e.g., kg, lb)
 *               enum:
 *                 - kg
 *                 - lb
 *         goal:
 *           type: string
 *           description: The user's fitness goal
 *         experience:
 *           type: string
 *           description: The user's fitness experience level
 *         workoutType:
 *           type: string
 *           description: The type of workout preferred by the user
 *         workoutFrequency:
 *           type: integer
 *           description: The frequency of workouts per week
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated
 *       required:
 *         - name
 *         - email
 * 
 *
 *     Plan:
 *       type: object
 *       required:
 *         - _id
 *         - plan_name
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the plan
 *           example: 60d0fe4f5311236168a109ca
 *         plan_name:
 *           type: string
 *           description: The name of the plan
 *           example: Full Body Workout
 *         description:
 *           type: string
 *           description: The description of the plan
 *           example: A comprehensive workout plan for all muscle groups
 *         banner_image:
 *           type: string
 *           description: URL of the banner image
 *           example: https://example.com/banner.jpg
 *         plan_video:
 *           type: string
 *           description: URL of the plan video
 *           example: https://example.com/plan.mp4
 *         workout_keywords:
 *           type: string
 *           description: Keywords related to the workout
 *           example: strength, endurance
 *         goal_orientation:
 *           type: array
 *           items:
 *             type: string
 *           description: Goals the plan is oriented towards
 *           example: [ "Flexibility", "Mobility" ]
 *         target_age_group:
 *           type: string
 *           description: Age group targeted by the plan
 *           example: 60+
 *         training_type:
 *           type: string
 *           description: Type of training the plan focuses on
 *           example: Strength
 *         location:
 *           type: string
 *           description: Where the training should be performed
 *           example: Home
 *         level:
 *           type: string
 *           description: Difficulty level of the plan
 *           example: Intermediate
 *         estimated_duration:
 *           type: string
 *           description: Estimated duration of the plan
 *           example: 6 weeks
 *         rest_between_exercises_seconds:
 *           type: number
 *           description: Rest time between exercises in seconds
 *           example: 60
 *         average_calories_burned_per_minute:
 *           type: number
 *           description: Average calories burned per minute
 *           example: 8
 *         weeks:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Week'
 *         isTrending:
 *           type: boolean
 *           description: Indicates if the plan is trending
 *           example: true
 *         isFeatured:
 *           type: boolean
 *           description: Indicates if the plan is featured
 *           example: false
 *         views:
 *           type: number
 *           description: Number of views for the plan
 *           example: 120
 *         selectedBy:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who have selected the plan
 *           example: [ "60d0fe4f5311236168a109cc" ]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the plan was created
 *           example: 2024-07-25T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the plan was last updated
 *           example: 2024-07-26T12:00:00Z
 * 
 * 
 *     Week:
 *       type: object
 *       required:
 *         - _id
 *         - week
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the week
 *           example: 60d0fe4f5311236168a109cd
 *         week:
 *           type: number
 *           description: The week number
 *           example: 1
 *         days:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Day'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the week was created
 *           example: 2024-07-25T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the week was last updated
 *           example: 2024-07-26T12:00:00Z
 * 
 * 
 * 
 *     Day:
 *       type: object
 *       required:
 *         - _id
 *         - day
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the day
 *           example: 60d0fe4f5311236168a109cf
 *         day:
 *           type: number
 *           description: The day number
 *           example: 1
 *         day_name:
 *           type: string
 *           description: The name of the day
 *           example: Monday
 *         day_banner_image:
 *           type: string
 *           description: URL of the day banner image
 *           example: https://example.com/day_banner.jpg
 *         intro_video:
 *           type: string
 *           description: URL of the introduction video
 *           example: https://example.com/intro.mp4
 *         day_of_week:
 *           type: string
 *           description: The day of the week
 *           example: Monday
 *         estimated_duration:
 *           type: string
 *           description: Estimated duration of the day
 *           example: 60 minutes
 *         categories:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Category'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the day was created
 *           example: 2024-07-25T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the day was last updated
 *           example: 2024-07-26T12:00:00Z
 * 
 * 
 * 
 *     Category:
 *       type: object
 *       required:
 *         - _id
 *         - sub_category
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the category
 *           example: 60d0fe4f5311236168a109d1
 *         sub_category:
 *           type: string
 *           description: The name of the sub-category
 *           example: Warm up
 *         circuit_rest_time:
 *           type: number
 *           description: Rest time between circuits in seconds
 *           example: 30
 *         circuit_reps:
 *           type: number
 *           description: Number of reps for circuits
 *           example: 10
 *         exercises:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Exercise'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the category was created
 *           example: 2024-07-25T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the category was last updated
 *           example: 2024-07-26T12:00:00Z
 * 
 * 
 * 
 *     Exercise:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the exercise
 *         name:
 *           type: string
 *           description: The name of the exercise
 *         exercise_number:
 *           type: integer
 *           description: The number of the exercise
 *         exercise_type:
 *           type: string
 *           description: The type of the exercise (e.g., Normal, Dropset, Superset)
 *         time_based:
 *           type: string
 *           description: Indicates if the exercise is time-based
 *         weighted:
 *           type: string
 *           description: Indicates if the exercise is weighted
 *         sets:
 *           type: integer
 *           description: The number of sets for the exercise
 *         reps:
 *           type: array
 *           items:
 *             type: integer
 *           description: The number of repetitions for each set
 *         set_time:
 *           type: string
 *           description: The time duration for each set
 *         superset_names:
 *           type: array
 *           items:
 *             type: string
 *           description: Names of exercises in a superset
 *         rest_time:
 *           type: integer
 *           description: The rest time between sets
 *         video_url:
 *           type: string
 *           description: URL for a video demonstration of the exercise
 *         image_url:
 *           type: string
 *           description: URL for an image of the exercise
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the exercise was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the exercise was last updated
 *       required:
 *         - name 
 * 
 * 
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FitnessProfile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the fitness profile
 *           example: 60d0fe4f5311236168a109ca
 *         userID:
 *           type: string
 *           description: The ID of the user associated with this fitness profile
 *           example: 60d0fe4f5311236168a109cb
 *         bookmarks:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs of bookmarked day plans
 *             example: [ "60d0fe4f5311236168a109cc" ]
 *         transformations:
 *           type: object
 *           properties:
 *             before:
 *               type: string
 *               description: Description of the user's body before transformation
 *               example: "Before weight loss"
 *             after:
 *               type: string
 *               description: Description of the user's body after transformation
 *               example: "After weight loss"
 *             before_date:
 *               type: string
 *               description: Date of the 'before' transformation
 *               example: "2024-01-01"
 *         progressCards:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL of the progress image
 *                 example: "http://example.com/image.jpg"
 *               date:
 *                 type: string
 *                 description: Date of the progress card
 *                 example: "2024-01-15"
 *         weight:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 enum: [ "kg", "lb" ]
 *                 description: Unit of measurement for weight
 *                 example: "kg"
 *               value:
 *                 type: number
 *                 description: Weight value
 *                 example: 70
 *               date:
 *                 type: string
 *                 description: Date of the weight measurement
 *                 example: "2024-01-01"
 *         height:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 enum: [ "cm", "ft" ]
 *                 description: Unit of measurement for height
 *                 example: "cm"
 *               value:
 *                 type: number
 *                 description: Height value
 *                 example: 175
 *               date:
 *                 type: string
 *                 description: Date of the height measurement
 *                 example: "2024-01-01"
 *         biceps:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 enum: [ "cm", "inch" ]
 *                 description: Unit of measurement for biceps
 *                 example: "cm"
 *               value:
 *                 type: number
 *                 description: Biceps measurement value
 *                 example: 35
 *               date:
 *                 type: string
 *                 description: Date of the biceps measurement
 *                 example: "2024-01-01"
 *         waist:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 enum: [ "cm", "inch" ]
 *                 description: Unit of measurement for waist
 *                 example: "cm"
 *               value:
 *                 type: number
 *                 description: Waist measurement value
 *                 example: 80
 *               date:
 *                 type: string
 *                 description: Date of the waist measurement
 *                 example: "2024-01-01"
 *         chest:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 enum: [ "cm", "inch" ]
 *                 description: Unit of measurement for chest
 *                 example: "cm"
 *               value:
 *                 type: number
 *                 description: Chest measurement value
 *                 example: 95
 *               date:
 *                 type: string
 *                 description: Date of the chest measurement
 *                 example: "2024-01-01"
 *         thigh:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 enum: [ "cm", "inch" ]
 *                 description: Unit of measurement for thigh
 *                 example: "cm"
 *               value:
 *                 type: number
 *                 description: Thigh measurement value
 *                 example: 55
 *               date:
 *                 type: string
 *                 description: Date of the thigh measurement
 *                 example: "2024-01-01"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the profile was created
 *           example: "2024-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the profile was last updated
 *           example: "2024-01-01T12:00:00Z"
 * 
 * 
 * 
 *     Gallery:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the gallery
 *           example: "My Vacation"
 *         description:
 *           type: string
 *           description: Description of the gallery
 *           example: "Photos from my summer vacation."
 *         user:
 *           type: string
 *           description: ID of the user who created the gallery
 *           example: "60d0fe4f5311236168a109ca"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *           example: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the gallery was created
 *           example: "2023-07-24T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the gallery was last updated
 *           example: "2023-07-24T14:48:00.000Z"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - user
 *         - title
 *         - time
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d0he4f5311236298a109bn
 *         user:
 *           type: string
 *           description: The ID of the user
 *           example: 60d0fe4f5311236168a109ca
 *         title:
 *           type: string
 *           description: The title of the TODO
 *           example: Buy groceries
 *         description:
 *           type: string
 *           description: The description of the TODO
 *           example: Buy milk, eggs, and bread
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags for the TODO
 *           example: ["shopping", "urgent"]
 *         priority:
 *           type: integer
 *           enum: [1, 2, 3]
 *           description: The priority of the TODO
 *           example: 1
 *         day:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Weekly", "Daily"]
 *           description: The days for the TODO
 *           example: ["Monday", "Wednesday"]
 *         time:
 *           type: object
 *           properties:
 *             hour:
 *               type: integer
 *               description: The hour of the time
 *               example: 10
 *             minute:
 *               type: integer
 *               description: The minute of the time
 *               example: 30
 *             am_pm:
 *               type: string
 *               description: AM or PM
 *               example: AM
 *         isCompleted:
 *           type: boolean
 *           description: Completion status of the TODO
 *           example: false
 *       timestamps: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPlan:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *         user:
 *           type: string
 *           description: The ID of the user
 *           example: 60d0fe4f5311236168a109cb
 *         plan:
 *           type: string
 *           description: The ID of the workout plan
 *           example: 60d0fe4f5311236168a109cc
 *         exercises:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               exerciseID:
 *                 type: string
 *                 description: The ID of the exercise
 *                 example: 60d0fe4f5311236168a109cd
 *               completed:
 *                 type: boolean
 *                 description: Completion status of the exercise
 *                 example: false
 *               completion_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the exercise was completed
 *                 example: null
 *         completedExercises:
 *           type: number
 *           description: Number of completed exercises
 *           example: 0
 *         totalExercises:
 *           type: number
 *           description: Total number of exercises in the workout plan
 *           example: 10
 *         completionPercentage:
 *           type: number
 *           format: float
 *           description: Percentage of completed exercises
 *           example: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the document was created
 *           example: 2021-06-22T07:48:15.352Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the document was last updated
 *           example: 2021-06-22T07:48:15.352Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     LifeGoal:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *         user:
 *           type: string
 *           description: The ID of the user
 *           example: 60d0fe4f5311236168a109cb
 *         title:
 *           type: string
 *           description: Title of the life goal
 *           example: Learn to play guitar
 *         description:
 *           type: string
 *           description: Description of the life goal
 *           example: I want to learn to play acoustic guitar within a year.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             description: Tags associated with the life goal
 *             example: music, personal development
 *         priority:
 *           type: integer
 *           description: Priority level of the life goal (1 is highest, 3 is lowest)
 *           enum: [1, 2, 3]
 *           example: 2
 *         deadline:
 *           type: string
 *           format: date-time
 *           description: Deadline for achieving the life goal
 *           example: 2024-12-31T23:59:59.000Z
 *         completed:
 *           type: boolean
 *           description: Completion status of the life goal
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the document was created
 *           example: 2023-07-30T07:48:15.352Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the document was last updated
 *           example: 2023-07-30T07:48:15.352Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the task
 *         userID:
 *           type: string
 *           description: The ID of the user who created the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         duration:
 *           type: object
 *           properties:
 *             value:
 *               type: number
 *               description: The duration value for the task
 *             unit:
 *               type: string
 *               enum: ['mins', 'seconds', 'hours', 'litre', 'steps', 'pages']
 *               description: The unit of the duration value
 *         progress:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: The status of the task for the given date
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date the progress was recorded
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed
 *         score:
 *           type: number
 *           description: The score for the task
 *         percentage:
 *           type: number
 *           description: The percentage of task completion
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the task was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the task was last updated
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Challenge:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the challenge
 *         userID:
 *           type: string
 *           description: The ID of the user who created the challenge
 *         title:
 *           type: string
 *           description: The title of the challenge
 *         duration:
 *           type: number
 *           description: The duration of the challenge in days
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the tasks associated with the challenge
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the challenge
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the challenge
 *         active:
 *           type: boolean
 *           description: Whether the challenge is currently active
 *         completed:
 *           type: boolean
 *           description: Whether the challenge has been completed
 *         beforeAndAfter:
 *           type: object
 *           properties:
 *             before:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   description: The URL of the before image
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The date the before image was taken
 *             after:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   description: The URL of the after image
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The date the after image was taken
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the challenge was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the challenge was last updated
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         workout_name:
 *           type: string
 *         description:
 *           type: string
 *         banner_image:
 *           type: string
 *         workout_video:
 *           type: string
 *         workout_keywords:
 *           type: string
 *         goal_orientation:
 *           type: string
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
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 */


/** 
 * @swagger
 * components:
 *  schemas:
 *    UserWorkout:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The unique identifier of the user workout
 *        user:
 *          type: string
 *          description: The ID of the user
 *        workout:
 *          type: string
 *          description: The ID of the workout
 *        exercises:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              exercise:
 *                type: string
 *                description: The ID of the exercise
 *              completed:
 *                type: boolean
 *                description: Indicates if the exercise has been completed
 *              completion_date:
 *                type: string
 *                format: date-time
 *                description: The date when the exercise was completed
 *        minutes:
 *          type: integer
 *          description: The time spent on the exercise
 *        calories:
 *          type: integer
 *          description: The calories that the user have burned
 *        image:
 *          type: string
 *          description: Image of the user after workout
 *        completedExercises:
 *          type: integer
 *          description: The number of completed exercises
 *        totalExercises:
 *          type: integer
 *          description: The total number of exercises in the workout
 *        completionPercentage:
 *          type: number
 *          format: float
 *          description: The percentage of completion for the workout
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: The date and time when the user workout was created
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: The date and time when the user workout was last updated
 *      required:
 *        - user
 *        - workout
 *        - totalExercises
 */





