const express = require('express');
const { updateUserProfile, fetchUserData, newBookmark, fetchBookmark, deleteBookmark, getUser, newProfilePic, transformationController } = require('../controllers/userController');
const { userProtect } = require('../middleware/authMiddleware');
const upload = require('../utils/multerConfig');

const router = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * 
 */


/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Fetches user data by ID
 *     description: Retrieves detailed information about a user by their ID. The password field is excluded from the response.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched user data
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
 *                   example: User data fetched successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the user
 *                     name:
 *                       type: string
 *                       description: Name of the user
 *                     profilePic:
 *                       type: string
 *                       description: URL of the user's profile picture
 *                     email:
 *                       type: string
 *                       description: Email address of the user
 *                     isVerified:
 *                       type: boolean
 *                       description: Whether the user's email is verified
 *                     role:
 *                       type: string
 *                       description: Role of the user (e.g., user or admin)
 *                     age:
 *                       type: number
 *                       description: Age of the user
 *                     gender:
 *                       type: string
 *                       description: Gender of the user (e.g., male, female, other)
 *                     height:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: number
 *                           description: Height value
 *                         unit:
 *                           type: string
 *                           description: Unit of height (cm or ft)
 *                     weight:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: number
 *                           description: Weight value
 *                         unit:
 *                           type: string
 *                           description: Unit of weight (kg or lb)
 *                     goal:
 *                       type: string
 *                       description: Fitness goal of the user
 *                     experience:
 *                       type: string
 *                       description: Fitness experience level of the user
 *                     workoutType:
 *                       type: string
 *                       description: Type of workout preferred by the user
 *                     workoutFrequency:
 *                       type: number
 *                       description: Frequency of workouts per week
 *       '404':
 *         description: User not found
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
 *                   example: User not found
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
router.get('/', userProtect, getUser);

/**
 * @swagger
 * /api/v1/user/fetch:
 *   get:
 *     summary: Fetches user(s) based on ID
 *     description: Retrieves user data. If an ID is provided, it fetches the specific user; otherwise, it fetches all users.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: false
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve. If not provided, fetches all users.
 *     responses:
 *       '200':
 *         description: Successfully fetched user(s)
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
 *                   example: User fetched successfully
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the user
 *                       name:
 *                         type: string
 *                         description: Name of the user
 *                       profilePic:
 *                         type: string
 *                         description: URL of the user's profile picture
 *                       email:
 *                         type: string
 *                         description: Email address of the user
 *                       isVerified:
 *                         type: boolean
 *                         description: Whether the user's email is verified
 *                       role:
 *                         type: string
 *                         description: Role of the user (e.g., user or admin)
 *                       age:
 *                         type: number
 *                         description: Age of the user
 *                       gender:
 *                         type: string
 *                         description: Gender of the user (e.g., male, female, other)
 *                       height:
 *                         type: object
 *                         properties:
 *                           value:
 *                             type: number
 *                             description: Height value
 *                           unit:
 *                             type: string
 *                             description: Unit of height (cm or ft)
 *                       weight:
 *                         type: object
 *                         properties:
 *                           value:
 *                             type: number
 *                             description: Weight value
 *                           unit:
 *                             type: string
 *                             description: Unit of weight (kg or lb)
 *                       goal:
 *                         type: string
 *                         description: Fitness goal of the user
 *                       experience:
 *                         type: string
 *                         description: Fitness experience level of the user
 *                       workoutType:
 *                         type: string
 *                         description: Type of workout preferred by the user
 *                       workoutFrequency:
 *                         type: number
 *                         description: Frequency of workouts per week
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
router.get('/fetch', userProtect, fetchUserData)

/**
 * @swagger
 * /api/v1/user/update:
 *   put:
 *     summary: Updates user profile information
 *     description: Updates the profile data for a user identified by their ID. Returns the updated user data. The password field is excluded from the response.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   name:
 *                     type: string
 *                     description: Updated name of the user
 *                   profilePic:
 *                     type: string
 *                     description: Updated URL of the user's profile picture
 *                   email:
 *                     type: string
 *                     description: Updated email address of the user
 *                   isVerified:
 *                     type: boolean
 *                     description: Updated verification status of the user's email
 *                   role:
 *                     type: string
 *                     description: Updated role of the user (e.g., user or admin)
 *                   age:
 *                     type: number
 *                     description: Updated age of the user
 *                   gender:
 *                     type: string
 *                     description: Updated gender of the user (e.g., male, female, other)
 *                   height:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: number
 *                         description: Updated height value
 *                       unit:
 *                         type: string
 *                         description: Updated unit of height (cm or ft)
 *                   weight:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: number
 *                         description: Updated weight value
 *                       unit:
 *                         type: string
 *                         description: Updated unit of weight (kg or lb)
 *                   goal:
 *                     type: string
 *                     description: Updated fitness goal of the user
 *                   experience:
 *                     type: string
 *                     description: Updated fitness experience level of the user
 *                   workoutType:
 *                     type: string
 *                     description: Updated type of workout preferred by the user
 *                   workoutFrequency:
 *                     type: number
 *                     description: Updated frequency of workouts per week
 *             required:
 *               - userID
 *               - userData
 *     responses:
 *       '200':
 *         description: Successfully updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the user
 *                     name:
 *                       type: string
 *                       description: Updated name of the user
 *                     profilePic:
 *                       type: string
 *                       description: Updated URL of the user's profile picture
 *                     email:
 *                       type: string
 *                       description: Updated email address of the user
 *                     isVerified:
 *                       type: boolean
 *                       description: Updated verification status of the user's email
 *                     role:
 *                       type: string
 *                       description: Updated role of the user
 *                     age:
 *                       type: number
 *                       description: Updated age of the user
 *                     gender:
 *                       type: string
 *                       description: Updated gender of the user
 *                     height:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: number
 *                           description: Updated height value
 *                         unit:
 *                           type: string
 *                           description: Updated unit of height (cm or ft)
 *                     weight:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: number
 *                           description: Updated weight value
 *                         unit:
 *                           type: string
 *                           description: Updated unit of weight (kg or lb)
 *                     goal:
 *                       type: string
 *                       description: Updated fitness goal of the user
 *                     experience:
 *                       type: string
 *                       description: Updated fitness experience level of the user
 *                     workoutType:
 *                       type: string
 *                       description: Updated type of workout preferred by the user
 *                     workoutFrequency:
 *                       type: number
 *                       description: Updated frequency of workouts per week
 *       '404':
 *         description: User not found
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
 *                   example: User not found
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
router.put('/update', userProtect, updateUserProfile)

/**
 * @swagger
 * /api/v1/user/profile-pic:
 *   put:
 *     summary: Uploads a new profile picture for a user
 *     description: Updates the user's profile picture with a new image. The image is uploaded and its URL is saved in the user's profile.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *                 description: The new profile picture to upload.
 *             required:
 *               - profilePic
 *     responses:
 *       '200':
 *         description: Successfully updated the profile picture
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
 *                   example: Profile picture updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the user
 *                     name:
 *                       type: string
 *                       description: Name of the user
 *                     profilePic:
 *                       type: string
 *                       description: URL of the updated profile picture
 *                     email:
 *                       type: string
 *                       description: Email address of the user
 *                     isVerified:
 *                       type: boolean
 *                       description: Whether the user's email is verified
 *                     role:
 *                       type: string
 *                       description: Role of the user (e.g., user or admin)
 *                     age:
 *                       type: number
 *                       description: Age of the user
 *                     gender:
 *                       type: string
 *                       description: Gender of the user
 *                     height:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: number
 *                           description: Height value
 *                         unit:
 *                           type: string
 *                           description: Unit of height (cm or ft)
 *                     weight:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: number
 *                           description: Weight value
 *                         unit:
 *                           type: string
 *                           description: Unit of weight (kg or lb)
 *                     goal:
 *                       type: string
 *                       description: Fitness goal of the user
 *                     experience:
 *                       type: string
 *                       description: Fitness experience level of the user
 *                     workoutType:
 *                       type: string
 *                       description: Type of workout preferred by the user
 *                     workoutFrequency:
 *                       type: number
 *                       description: Frequency of workouts per week
 *       '404':
 *         description: User not found
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
 *                   example: User not found
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
router.put('/profile-pic', userProtect, upload.fields([{ name: 'profilePic' }]), newProfilePic)

/**
 * @swagger
 * /api/v1/user/image/transformation:
 *   post:
 *     summary: Uploads before and after images for transformations
 *     description: Uploads images representing transformations (before and after) and updates the user's fitness profile with these images.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               before:
 *                 type: string
 *                 format: binary
 *                 description: The image of the user's fitness state before transformation.
 *               after:
 *                 type: string
 *                 format: binary
 *                 description: The image of the user's fitness state after transformation.
 *             required:
 *               - before
 *               - after
 *     responses:
 *       '200':
 *         description: Successfully updated fitness profile with transformation images
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
 *                   example: Transformation added successfully
 *                 fitnessProfile:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the fitness profile
 *                     userID:
 *                       type: string
 *                       description: User ID associated with the fitness profile
 *                     bookmarks:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Array of bookmarked day plans
 *                     transformations:
 *                       type: object
 *                       properties:
 *                         before:
 *                           type: string
 *                           description: URL of the image showing the fitness state before transformation
 *                         after:
 *                           type: string
 *                           description: URL of the image showing the fitness state after transformation
 *                         date:
 *                           type: string
 *                           format: date
 *                           description: Date of the transformation
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
router.post('/image/transformation', userProtect, upload.fields([{name: 'before'}, {name: 'after'}]), transformationController)


/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: Routes to user bookmarks
*/

/**
 * @swagger
 * /api/v1/user/bookmarks/{dayID}:
 *   post:
 *     summary: Adds a bookmark for a specific day
 *     description: Adds a bookmark to the user's fitness profile for a given day. The bookmark is associated with the dayID and is added to the user's list of bookmarks.
 *     tags:
 *       - Bookmarks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the day to be bookmarked.
 *         example: 60d5f2e91c9d44000014d2c6
 *     responses:
 *       '200':
 *         description: Successfully added bookmark
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
 *                   example: Bookmark added successfully
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the day
 *                       day:
 *                         type: integer
 *                         description: Day number
 *                       day_name:
 *                         type: string
 *                         description: Name of the day
 *                       day_banner_image:
 *                         type: string
 *                         description: URL of the day’s banner image
 *                       intro_video:
 *                         type: string
 *                         description: URL of the introductory video for the day
 *                       day_of_week:
 *                         type: string
 *                         description: Day of the week (e.g., Monday, Tuesday)
 *                       estimated_duration:
 *                         type: string
 *                         description: Estimated duration of the day’s workout
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of category IDs associated with the day
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
router.post('/bookmarks/:dayID', userProtect, newBookmark);

/**
 * @swagger
 * /api/v1/user/bookmarks:
 *   get:
 *     summary: Retrieves all bookmarks for a user
 *     description: Fetches all bookmarked days for the authenticated user. If no bookmarks are found, an empty array is returned.
 *     tags:
 *       - Bookmarks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched bookmarks
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
 *                   example: Bookmarks fetched successfully
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the day
 *                       day:
 *                         type: integer
 *                         description: Day number
 *                       day_name:
 *                         type: string
 *                         description: Name of the day
 *                       day_banner_image:
 *                         type: string
 *                         description: URL of the day’s banner image
 *                       intro_video:
 *                         type: string
 *                         description: URL of the introductory video for the day
 *                       day_of_week:
 *                         type: string
 *                         description: Day of the week (e.g., Monday, Tuesday)
 *                       estimated_duration:
 *                         type: string
 *                         description: Estimated duration of the day’s workout
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of category IDs associated with the day
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
router.get('/bookmarks', userProtect, fetchBookmark);

/**
 * @swagger
 * /api/v1/user/bookmarks/{dayID}:
 *   delete:
 *     summary: Removes a bookmark for a specific day
 *     description: Removes a bookmark from the user's fitness profile for a given day. The bookmark associated with the dayID is removed from the user's list of bookmarks.
 *     tags:
 *       - Bookmarks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the day to be removed from bookmarks.
 *         example: 60d5f2e91c9d44000014d2c6
 *     responses:
 *       '200':
 *         description: Successfully removed bookmark
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
 *                   example: Bookmark removed successfully
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the day
 *                       day:
 *                         type: integer
 *                         description: Day number
 *                       day_name:
 *                         type: string
 *                         description: Name of the day
 *                       day_banner_image:
 *                         type: string
 *                         description: URL of the day’s banner image
 *                       intro_video:
 *                         type: string
 *                         description: URL of the introductory video for the day
 *                       day_of_week:
 *                         type: string
 *                         description: Day of the week (e.g., Monday, Tuesday)
 *                       estimated_duration:
 *                         type: string
 *                         description: Estimated duration of the day’s workout
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of category IDs associated with the day
 *       '404':
 *         description: Bookmark not found
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
 *                   example: Bookmark not found
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
router.delete('/bookmarks/:dayID', userProtect, deleteBookmark);


module.exports = router;