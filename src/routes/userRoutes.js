const express = require('express');
const { updateUserProfile, fetchUserData, newBookmark, fetchBookmark, deleteBookmark } = require('../controllers/userController');
const { userProtect } = require('../middleware/authMiddleware');

const router = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Routes to user features
 */

/**
 * @swagger
 * /api/v1/user/update:
 *   post:
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
router.post('/update', userProtect, updateUserProfile)


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
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Unverified account
 *       500:
 *         description: Server error
 */
router.get('/fetch', userProtect, fetchUserData)




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