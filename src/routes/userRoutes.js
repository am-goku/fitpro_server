const express = require('express');
const { updateUserProfile } = require('../controllers/userController');
const { userProtect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const responseHandler = require('../utils/responseHandler');

const router = express.Router();

// router.use(userProtect)


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
 *   name: Profile
 *   description: Routes to user profile
 */

/**
 * @swagger
 * /api/v1/user/update:
 *   post:
 *     summary: To Update User Profile ( All body datas are not necessary, remove unnecessary body data )
 *     tags: [Profile]
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
 * /api/v1/user/clear:
 *   delete:
 *     summary: To Update User Profile ( All body datas are not necessary, remove unnecessary body data )
 *     tags: [helpers]
 *     responses:
 *       200:
 *         description: All users deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.delete('/clear', async (req, res) => {
    try {
        await User.deleteMany({});

        const data = {
            status: 200,
            message: "All users deleted successfully"
        }

        return responseHandler(res, data);
    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
})


module.exports = router;