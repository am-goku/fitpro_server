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
 * tags:
 *   name: User
 *   description: Routes to user features
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *         profilePic:
 *           type: string
 *           format: uri
 *         email:
 *           type: string
 *           format: email
 *         otp:
 *           type: string
 *         otpExpires:
 *           type: string
 *           format: date-time
 *         isVerified:
 *           type: boolean
 *           default: false
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           default: user
 *         age:
 *           type: integer
 *         gender:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *             - other
 *         height:
 *           type: object
 *           properties:
 *             value:
 *               type: number
 *               minimum: 0
 *             unit:
 *               type: string
 *               enum:
 *                 - cm
 *                 - ft
 *         weight:
 *           type: object
 *           properties:
 *             value:
 *               type: number
 *               minimum: 0
 *             unit:
 *               type: string
 *               enum:
 *                 - kg
 *                 - lb
 *         goal:
 *           type: string
 *         experience:
 *           type: string
 *         workoutType:
 *           type: string
 *         workoutFrequency:
 *           type: integer
 *       required:
 *         - email
 *     FitnessProfile:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *           format: uuid
 *         bookmarks:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *       required:
 *         - userID
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: To fetch a single user's data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User-data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
 * 
 * components:
 *      schemas:
 *       ApiResponse:
 *          type: object
 *          properties:
 *            status:
 *              type: number
 *              example: 200
 *            message:
 *              type: string
 *            user:
 *              $ref: '#/components/schemas/User'
 */
router.get('/', userProtect, getUser);

/**
 * @swagger
 * /api/v1/user/fetch:
 *   get:
 *     summary: To fetch User Profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         description: id of the user to fetch
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/fetchUserResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
 * 
 * components:
 *      schemas:
 *       fetchUserResponse:
 *          type: object
 *          properties:
 *            status:
 *              type: number
 *              example: 200
 *            message:
 *              type: string
 *            users:
 *              items:
 *                 $ref: '#/components/schemas/User'
 *            user:
 *              $ref: '#/components/schemas/User'
 */
router.get('/fetch', userProtect, fetchUserData)

/**
 * @swagger
 * /api/v1/user/update:
 *   put:
 *     summary: To Update User Profile ( All body datas are not necessary, remove unnecessary body data )
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - gender
 *               - weight
 *               - height
 *               - goal
 *               - experience
 *               - workoutType
 *               - workoutFrequency
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               weight:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                   unit:
 *                     type: string
 *                     enum: ['kg', 'lb']
 *               height:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                   unit:
 *                     type: string
 *                     enum: ['cm', 'ft']
 *               goal:
 *                 type: string
 *                 enum: ['loose weight', 'be healthier', 'build muscles']
 *               experience:
 *                 type: string
 *                 enum: ['beginner', 'loose weight', 'build muscles']
 *               workoutType:
 *                 type: string
 *                 enum: ['commercial gym', 'home gym', 'body weight']
 *               workoutFrequency:
 *                 type: number
 *                 enum: [3, 4, 5, 6]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
 */
router.put('/update', userProtect, updateUserProfile)

/**
 * @swagger
 * /api/v1/user/profile-pic:
 *   put:
 *     summary: To update the profile-pic of a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile Picture successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
 */
router.put('/profile-pic', userProtect, upload.fields([{ name: 'profilePic' }]), newProfilePic)

/**
 * @swagger
 * /api/v1/user/image/transformation:
 *   post:
 *     summary: Upload transformation images for a user
 *     description: Allows users to upload 'before' and 'after' transformation images. The images are associated with the user's fitness profile.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # assuming you're using JWT tokens
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               before:
 *                 type: string
 *                 format: binary
 *                 description: The 'before' transformation image file.
 *               after:
 *                 type: string
 *                 format: binary
 *                 description: The 'after' transformation image file.
 *           required:
 *             - before
 *             - after
 *     responses:
 *       '200':
 *         description: Transformation images uploaded successfully
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
 *                     userID:
 *                       type: string
 *                       example: "60d5f3d9b3e5e40f8c8f5c09"
 *                     transformations:
 *                       type: object
 *                       properties:
 *                         before:
 *                           type: string
 *                           example: "https://example.com/images/before.jpg"
 *                         after:
 *                           type: string
 *                           example: "https://example.com/images/after.jpg"
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-07-23T18:25:43.511Z"
 *       '400':
 *         description: Bad request, invalid user or upload failed
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
 *                   example: "No user found"
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
 *                   example: "An error occurred"
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
 *     summary: To set new bookmark
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayID
 *         description: id of the day to set bookmark
 *         required: true
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Bookmarks added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
*/
router.post('/bookmarks/:dayID', userProtect, newBookmark);

/**
 * @swagger
 * /api/v1/user/bookmarks:
 *   get:
 *     summary: To fetch user bookmarks
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Bookmarks fetched successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
*/
router.get('/bookmarks', userProtect, fetchBookmark);

/**
 * @swagger
 * /api/v1/user/bookmarks/{dayID}:
 *   delete:
 *     summary: To remove a bookmark
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayID
 *         description: id of the day to remove from bookmarks
 *         required: true
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Bookmarks removed successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
*/
router.delete('/bookmarks/:dayID', userProtect, deleteBookmark);


module.exports = router;