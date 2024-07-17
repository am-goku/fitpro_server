const express = require('express');
const { loginAdmin } = require('../controllers/authController');

const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin routes
 */

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Admin login ( Will return user data and access token )
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', loginAdmin);









module.exports = router;