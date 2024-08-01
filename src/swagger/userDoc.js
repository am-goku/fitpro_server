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
 *               before_date:
 *                 type: string
 *                 description: The date of image of the user's fitness state before transformation
 *             required:
 *               - before
 *               - after
 *               - before_date
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

/**
 * @swagger
 * /api/v1/user/gallery:
 *   post:
 *     summary: Create a new gallery
 *     tags:
 *       - Gallery
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the gallery
 *                 example: "My Vacation"
 *               description:
 *                 type: string
 *                 description: Description of the gallery
 *                 example: "Photos from my summer vacation."
 *     responses:
 *       200:
 *         description: Gallery created successfully
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
 *                   example: "Gallery created successfully"
 *                 gallery:
 *                   $ref: '#/components/schemas/Gallery'
 *       400:
 *         description: User not found
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
 *                   example: "User not found"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/user/gallery:
 *   get:
 *     summary: Fetch user galleries
 *     tags:
 *       - Gallery
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: galleryID
 *         in: query
 *         schema:
 *           type: string
 *         description: ID of the specific gallery to fetch. If not provided, fetches all galleries for the user.
 *     responses:
 *       200:
 *         description: Galleries fetched successfully
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
 *                   example: "Galleries fetched successfully"
 *                 gallery:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Gallery'
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/user/gallery/{galleryID}:
 *   delete:
 *     summary: Delete a gallery
 *     tags:
 *       - Gallery
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: galleryID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gallery to delete
 *     responses:
 *       200:
 *         description: Gallery deleted successfully
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
 *                   example: "Gallery deleted successfully"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/user/gallery/{galleryID}/image:
 *   post:
 *     summary: Add a new image to a gallery
 *     tags:
 *       - Gallery
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: galleryID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gallery to add images to
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *                   example: "Image uploaded successfully"
 *                 gallery:
 *                   $ref: '#/components/schemas/Gallery'
 *       400:
 *         description: Gallery not found
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
 *                   example: "Gallery not found"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/user/gallery/{galleryID}/image:
 *   delete:
 *     summary: Delete images from a gallery
 *     tags:
 *       - Gallery
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: galleryID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gallery from which to delete images
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs to delete
 *                 example: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
 *     responses:
 *       200:
 *         description: Image(s) deleted successfully
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
 *                   example: "Image(s) deleted successfully"
 *                 gallery:
 *                   $ref: '#/components/schemas/Gallery'
 *       400:
 *         description: Gallery not found
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
 *                   example: "Gallery not found"
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
 *                   example: "Internal server error"
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
 *                           example: ["60d5f2e91c9d44000014d2c8", "60d5f2e91c9d44000014d2c9"]
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

/**
 * @swagger
 * /api/v1/user/todo:
 *   post:
 *     summary: Create a new TODO
 *     tags: [TODO]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the TODO
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 description: The description of the TODO
 *                 example: Buy milk, eggs, and bread
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the TODO
 *                 example: ["shopping", "urgent"]
 *               priority:
 *                 type: integer
 *                 description: The priority of the TODO (1, 2, or 3)
 *                 example: 1
 *               day:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 *                 description: The days for the TODO
 *                 example: ["Monday", "Wednesday"]
 *               time:
 *                 type: object
 *                 properties:
 *                   hour:
 *                     type: integer
 *                     description: The hour of the time
 *                     example: 10
 *                   minute:
 *                     type: integer
 *                     description: The minute of the time
 *                     example: 30
 *                   am_pm:
 *                     type: string
 *                     description: AM or PM
 *                     example: AM
 *     responses:
 *       201:
 *         description: TODO created successfully
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
 *                   example: Todo created successfully
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       500:
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
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/user/todo:
 *   get:
 *     summary: Fetch TODOs
 *     tags: [TODO]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: todoID
 *         schema:
 *           type: string
 *         description: The ID of the TODO to fetch (optional)
 *     responses:
 *       200:
 *         description: TODO fetched successfully
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
 *                   example: Todo fetched successfully
 *                 todo:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *       500:
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
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/user/todo/{todoID}:
 *   put:
 *     summary: Update a TODO
 *     tags: [TODO]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoID
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the TODO
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 description: The description of the TODO
 *                 example: Buy milk, eggs, and bread
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the TODO
 *                 example: ["shopping", "urgent"]
 *               priority:
 *                 type: integer
 *                 description: The priority of the TODO (1, 2, or 3)
 *                 example: 1
 *               day:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 *                 description: The days for the TODO
 *                 example: ["Monday", "Wednesday"]
 *               time:
 *                 type: object
 *                 properties:
 *                   hour:
 *                     type: integer
 *                     description: The hour of the time
 *                     example: 10
 *                   minute:
 *                     type: integer
 *                     description: The minute of the time
 *                     example: 30
 *                   am_pm:
 *                     type: string
 *                     description: AM or PM
 *                     example: AM
 *               isCompleted:
 *                 type: boolean
 *                 description: Completion status of the TODO
 *                 example: false
 *     responses:
 *       200:
 *         description: TODO updated successfully
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
 *                   example: Todo updated successfully
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       500:
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
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/user/todo/{todoID}:
 *   delete:
 *     summary: Delete a TODO
 *     tags: [TODO]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TODO to delete
 *     responses:
 *       200:
 *         description: TODO deleted successfully
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
 *                   example: Todo deleted successfully
 *       500:
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
 *                   example: Internal Server Error
 */




/**
 * @swagger
 * /api/v1/user/goal:
 *   post:
 *     summary: Create a new life goal
 *     description: Creates a new life goal for the authenticated user.
 *     tags:
 *       - LifeGoals
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the life goal
 *                 example: Learn to play guitar
 *               description:
 *                 type: string
 *                 description: Description of the life goal
 *                 example: I want to learn to play acoustic guitar within a year.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Tags associated with the life goal
 *                   example: music, personal development
 *               priority:
 *                 type: integer
 *                 description: Priority level of the life goal (1 is highest, 3 is lowest)
 *                 enum: [1, 2, 3]
 *                 example: 2
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: Deadline for achieving the life goal
 *                 example: 2024-12-31T23:59:59.000Z
 *               completed:
 *                 type: boolean
 *                 description: Completion status of the life goal
 *                 example: false
 *     responses:
 *       201:
 *         description: Goal created successfully
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
 *                   example: Goal created successfully
 *                 goal:
 *                   $ref: '#/components/schemas/LifeGoal'
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
 * /api/v1/user/goal:
 *   get:
 *     summary: Fetch life goals for a user
 *     description: Retrieves life goals for the authenticated user, optionally filtered by goal ID.
 *     tags:
 *       - LifeGoals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: goalID
 *         schema:
 *           type: string
 *         description: ID of the specific goal to retrieve (optional)
 *     responses:
 *       200:
 *         description: Goals fetched successfully
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
 *                   example: Goals fetched successfully
 *                 goals:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LifeGoal'
 *       400:
 *         description: No goals found
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
 *                   example: No goals found
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
 * /api/v1/user/goal/{goalID}:
 *   put:
 *     summary: Update a life goal
 *     description: Updates the details of an existing life goal for the authenticated user.
 *     tags:
 *       - LifeGoals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the goal to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the life goal
 *                 example: Learn to play guitar
 *               description:
 *                 type: string
 *                 description: Description of the life goal
 *                 example: I want to learn to play acoustic guitar within a year.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Tags associated with the life goal
 *                   example: music, personal development
 *               priority:
 *                 type: integer
 *                 description: Priority level of the life goal (1 is highest, 3 is lowest)
 *                 enum: [1, 2, 3]
 *                 example: 2
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: Deadline for achieving the life goal
 *                 example: 2024-12-31T23:59:59.000Z
 *               completed:
 *                 type: boolean
 *                 description: Completion status of the life goal
 *                 example: false
 *     responses:
 *       200:
 *         description: Goal updated successfully
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
 *                   example: Goal updated successfully
 *                 goal:
 *                   $ref: '#/components/schemas/LifeGoal'
 *       400:
 *         description: Goal not found
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
 *                   example: Goal not found
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
 * /api/v1/user/goal/{goalID}:
 *   delete:
 *     summary: Delete a life goal
 *     description: Deletes a life goal for the authenticated user.
 *     tags:
 *       - LifeGoals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the goal to delete
 *     responses:
 *       200:
 *         description: Goal deleted successfully
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
 *                   example: Goal deleted successfully
 *       404:
 *         description: Goal not found
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
 *                   example: Invalid parameter. Goal not found
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
 * /api/v1/user/measurements:
 *   post:
 *     summary: Update user measurements
 *     description: Updates the fitness profile measurements for the authenticated user.
 *     tags:
 *       - FitnessProfile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: ["kg", "lb"]
 *                       example: "kg"
 *                     value:
 *                       type: number
 *                       example: 70.5
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-30"
 *               height:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: ["cm", "ft"]
 *                       example: "cm"
 *                     value:
 *                       type: number
 *                       example: 175
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-30"
 *               biceps:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: ["cm", "inch"]
 *                       example: "cm"
 *                     value:
 *                       type: number
 *                       example: 30
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-30"
 *               waist:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: ["cm", "inch"]
 *                       example: "cm"
 *                     value:
 *                       type: number
 *                       example: 80
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-30"
 *               wrist:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: ["cm", "inch"]
 *                       example: "cm"
 *                     value:
 *                       type: number
 *                       example: 15
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-30"
 *               chest:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: ["cm", "inch"]
 *                       example: "cm"
 *                     value:
 *                       type: number
 *                       example: 100
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-30"
 *               thigh:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: ["cm", "inch"]
 *                       example: "cm"
 *                     value:
 *                       type: number
 *                       example: 55
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-30"
 *     responses:
 *       200:
 *         description: Measurements updated successfully
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
 *                   example: Measurements updated successfully
 *                 fitnessProfile:
 *                   $ref: '#/components/schemas/FitnessProfile'
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
 * /api/v1/user/fitness-profile:
 *   get:
 *     summary: Fetch the fitness profile of the authenticated user
 *     tags: 
 *       - FitnessProfile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fitness profile fetched successfully
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
 *                   example: "Fitness profile fetched successfully"
 *                 fitnessProfile:
 *                   $ref: '#/components/schemas/FitnessProfile'
 *       404:
 *         description: Fitness profile not found
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
 *                   example: "Fitness profile not found"
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
 *                   example: "Internal server error"
 */




/**
 * @swagger
 * /api/v1/user/challenge/task:
 *   post:
 *     summary: Create a new task for a user's challenge
 *     tags:
 *       - Challenge Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Workout 45 minutes"
 *               duration:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                     description: The duration value for the task
 *                     example: 45
 *                   unit:
 *                     type: string
 *                     enum: ['mins', 'seconds', 'hours', 'litre', 'steps', 'pages']
 *                     description: The unit of the duration value
 *                     example: "mins"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Title and duration are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge/task:
 *   get:
 *     summary: Fetch tasks for a user's challenge
 *     tags:
 *       - Challenge Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: taskID
 *         schema:
 *           type: string
 *         description: The ID of the specific task to fetch. If not provided, all tasks for the user will be returned.
 *         example: "64cbf6f72f5c1b001ebae578"
 *     responses:
 *       200:
 *         description: Task(s) fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Task fetched successfully"
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid task ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge/task/{taskID}:
 *   put:
 *     summary: Update a task for a user's challenge
 *     tags:
 *       - Challenge Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to update
 *         example: "64cbf6f72f5c1b001ebae578"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the task
 *                 example: "Updated Workout 45 minutes"
 *               duration:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                     description: The updated duration value for the task
 *                     example: 50
 *                   unit:
 *                     type: string
 *                     enum: ['mins', 'seconds', 'hours', 'litre', 'steps', 'pages']
 *                     description: The updated unit of the duration value
 *                     example: "mins"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge/task/{taskID}:
 *   patch:
 *     summary: Update progress for a specific task on the current day
 *     tags:
 *       - Challenge Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to update progress for
 *         example: "64cbf6f72f5c1b001ebae578"
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Progress updated successfully"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, task not found or invalid progress update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Cannot update previous or future progress"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge/task/{taskID}:
 *   delete:
 *     summary: Delete a specific task for a user's challenge
 *     tags:
 *       - Challenge Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to delete
 *         example: "64cbf6f72f5c1b001ebae578"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       400:
 *         description: Bad request, task not found or invalid task ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge:
 *   post:
 *     summary: Create a new challenge for a user
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "30-Day Fitness Challenge"
 *               duration:
 *                 type: number
 *                 example: 30
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "64cbf6f72f5c1b001ebae578"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-01"
 *     responses:
 *       200:
 *         description: Challenge created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Challenge created successfully"
 *                 challenge:
 *                   $ref: '#/components/schemas/Challenge'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */

/**
 * @swagger
 * /api/v1/user/challenge:
 *   get:
 *     summary: Retrieve challenges for a user
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: challengeID
 *         schema:
 *           type: string
 *         required: false
 *         description: The ID of a specific challenge to retrieve
 *         example: "64cbf6f72f5c1b001ebae578"
 *     responses:
 *       200:
 *         description: Challenges retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Challenges retrieved successfully"
 *                 challenges:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Challenge'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge/{challengeID}:
 *   put:
 *     summary: Update a specific challenge for a user
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: challengeID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the challenge to update
 *         example: "64cbf6f72f5c1b001ebae578"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Fitness Challenge"
 *               duration:
 *                 type: number
 *                 example: 45
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "64cbf6f72f5c1b001ebae579"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-05"
 *     responses:
 *       200:
 *         description: Challenge updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Challenge updated successfully"
 *                 challenge:
 *                   $ref: '#/components/schemas/Challenge'
 *       404:
 *         description: Challenge not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Challenge not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge/{challengeID}/activate:
 *   patch:
 *     summary: Activate a specific challenge for a user
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: challengeID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the challenge to activate
 *         example: "64cbf6f72f5c1b001ebae578"
 *     responses:
 *       200:
 *         description: Challenge activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Challenge activated successfully"
 *                 challenge:
 *                   $ref: '#/components/schemas/Challenge'
 *       404:
 *         description: Challenge not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Challenge not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */


/**
 * @swagger
 * /api/v1/user/challenge/{challengeID}:
 *   delete:
 *     summary: Delete a specific challenge for a user
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: challengeID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the challenge to delete
 *         example: "64cbf6f72f5c1b001ebae578"
 *     responses:
 *       200:
 *         description: Challenge deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Challenge deleted successfully"
 *       404:
 *         description: Challenge not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Challenge not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */




/**
 * @swagger
 * /api/v1/workouts:
 *   post:
 *     summary: Create a new workout
 *     description: Creates a new workout along with its categories and exercises.
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workout_name:
 *                 type: string
 *               description:
 *                 type: string
 *               banner_image:
 *                 type: string
 *               workout_video:
 *                 type: string
 *               workout_keywords:
 *                 type: string
 *               goal_orientation:
 *                 type: string
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
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sub_category:
 *                       type: string
 *                     circuit_rest_time:
 *                       type: number
 *                     circuit_reps:
 *                       type: number
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           exercise_number:
 *                             type: number
 *                           exercise_type:
 *                             type: string
 *                           time_based:
 *                             type: string
 *                           weighted:
 *                             type: string
 *                           sets:
 *                             type: number
 *                           reps:
 *                             type: array
 *                             items:
 *                               type: number
 *                           set_time:
 *                             type: string
 *                           superset_names:
 *                             type: array
 *                             items:
 *                               type: string
 *                           rest_time:
 *                             type: number
 *                           video_url:
 *                             type: string
 *                           image_url:
 *                             type: string
 *     responses:
 *       200:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 workout:
 *                   $ref: '#/components/schemas/Workout'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 */


/**
 * @swagger
 * /api/v1/workouts:
 *   get:
 *     summary: Fetch a specific workout or all workouts
 *     description: Fetches a specific workout by ID or all workouts if no ID is provided. Optionally populates related categories and exercises.
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: workoutID
 *         required: false
 *         schema:
 *           type: string
 *         description: ID of the workout to fetch. Omit this parameter to fetch all workouts.
 *       - in: query
 *         name: populate
 *         schema:
 *           type: boolean
 *         description: Whether to populate related categories and exercises.
 *     responses:
 *       200:
 *         description: Workout fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 workout:
 *                   $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 */


/**
 * @swagger
 * /api/v1/workouts/{workoutID}:
 *   delete:
 *     summary: Delete a workout
 *     description: Deletes a specific workout by ID along with its related categories and exercises.
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the workout to delete.
 *     responses:
 *       200:
 *         description: Workout and related data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Workout not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 */


/**
 * @swagger
 * /api/v1/workouts/user-workouts/{workoutID}:
 *   post:
 *     summary: Create a new user workout
 *     description: Creates a new user workout entry associating a user with a workout and initializing exercise details.
 *     tags:
 *       - UserWorkouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout
 *     responses:
 *       200:
 *         description: User workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 userWorkout:
 *                   $ref: '#/components/schemas/UserWorkout'
 *       404:
 *         description: Workout not found or other error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/workouts/user-workouts:
 *   get:
 *     summary: Get user workout details
 *     description: Fetches the details of a specific user workout, optionally populating exercise details.
 *     tags:
 *       - UserWorkouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: workoutID
 *         required: false
 *         schema:
 *           type: string
 *         description: The ID of the workout
 *       - in: query
 *         name: populate
 *         schema:
 *           type: boolean
 *         description: Whether to populate related exercises
 *     responses:
 *       200:
 *         description: User workout details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 userWorkout:
 *                   $ref: '#/components/schemas/UserWorkout'
 *       404:
 *         description: User workout not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/workouts/user-workouts/{workoutID}/exercises/{exerciseID}:
 *   patch:
 *     summary: Update exercise completion status
 *     description: Updates the completion status of a specific exercise in the user’s workout.
 *     tags:
 *       - UserWorkouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout
 *       - in: path
 *         name: exerciseID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *               completionDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Exercise completion status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 userWorkout:
 *                   $ref: '#/components/schemas/UserWorkout'
 *       404:
 *         description: User workout or exercise not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 */






