/**
 * @fileoverview Router configuration for the Express application.
 * Defines routes for user management, image transformations, gallery management, bookmarks, and TODO tasks.
 */

const express = require('express');
const { updateUserProfile, fetchUserData, newBookmark, fetchBookmark, deleteBookmark, getUser, newProfilePic, transformationController, newGallery, removeGallery, addNewImage, removeImages, fetchGalleries, update_Measurements, fetch_fitnessProfile } = require('../controllers/userController');
const { userProtect } = require('../middleware/authMiddleware');
const upload = require('../utils/multerConfig');
const { create_TODO, fetch_TODO, update_TODO, remove_TODO, add_GOAL, fetch_GOALS, update_GOAL, delete_GOAL } = require('../controllers/todoController');

const router = express.Router();

/**
 * GET route for retrieving user information.
 * Requires user authentication.
 */
router.get('/', userProtect, getUser);

/**
 * GET route for fetching user data.
 * Requires user authentication.
 */
router.get('/fetch', userProtect, fetchUserData);

/**
 * PUT route for updating user profile.
 * Requires user authentication.
 */
router.put('/update', userProtect, updateUserProfile);

/**
 * PUT route for uploading a new profile picture.
 * Requires user authentication and accepts a single 'profilePic' file.
 */
router.put('/profile-pic', userProtect, upload.fields([{ name: 'profilePic' }]), newProfilePic);

/**
 * POST route for performing image transformation.
 * Requires user authentication and accepts two files: 'before' and 'after'.
 */
router.post('/image/transformation', userProtect, upload.fields([{ name: 'before' }, { name: 'after' }]), transformationController);

/**
 * POST route for creating a new gallery.
 * Requires user authentication.
 */
router.post('/gallery', userProtect, newGallery);

/**
 * GET route for fetching all galleries.
 * Requires user authentication.
 */
router.get('/gallery', userProtect, fetchGalleries);

/**
 * DELETE route for removing a gallery by its ID.
 * Requires user authentication and accepts a 'galleryID' parameter.
 */
router.delete('/gallery/:galleryID', userProtect, removeGallery);

/**
 * POST route for adding new images to a gallery.
 * Requires user authentication and accepts multiple 'images' files.
 */
router.post('/gallery/:galleryID/image', userProtect, upload.fields([{ name: 'images' }]), addNewImage);

/**
 * DELETE route for removing images from a gallery.
 * Requires user authentication and accepts a 'galleryID' parameter.
 */
router.delete('/gallery/:galleryID/image', userProtect, removeImages);

/**
 * POST route for creating a new bookmark for a specific day.
 * Requires user authentication and accepts a 'dayID' parameter.
 */
router.post('/bookmarks/:dayID', userProtect, newBookmark);

/**
 * GET route for fetching all bookmarks.
 * Requires user authentication.
 */
router.get('/bookmarks', userProtect, fetchBookmark);

/**
 * DELETE route for removing a bookmark by its day ID.
 * Requires user authentication and accepts a 'dayID' parameter.
 */
router.delete('/bookmarks/:dayID', userProtect, deleteBookmark);

/**
 * POST route for creating a new TODO task.
 * Requires user authentication.
 */
router.post('/todo', userProtect, create_TODO);

/**
 * GET route for fetching all TODO tasks or a single one.
 * Requires user authentication.
 */
router.get('/todo', userProtect, fetch_TODO);

/**
 * PUT route for updating a TODO task by its ID.
 * Requires user authentication and accepts a 'todoID' parameter.
 */
router.put('/todo/:todoID', userProtect, update_TODO);

/**
 * DELETE route for removing a TODO task by its ID.
 * Requires user authentication and accepts a 'todoID' parameter.
 */
router.delete('/todo/:todoID', userProtect, remove_TODO);

/**
 * POST route for creating a new LIFE GOAL.
 * Requires user authentication.
 */
router.post('/goal', userProtect, add_GOAL);

/**
 * GET route for fetching all LIFE GOALS or a single one.
 * Requires user authentication.
 */
router.get('/goal', userProtect, fetch_GOALS);

/**
 * PUT route for updating a LIFE GOAL by its ID.
 * Requires user authentication and accepts a 'goalID' parameter.
 */
router.put('/goal/:goalID', userProtect, update_GOAL);

/**
 * DELETE route for removing a LIFE GOAL by its ID.
 * Requires user authentication and accepts a 'goalID' parameter.
 */
router.delete('/goal/:goalID', userProtect, delete_GOAL);

/**
 * POST route for updating user measurements with userID and request body.
 * Requires user authentication and accepts a request body with measurements.
 */
router.post('/measurements', userProtect, update_Measurements);

/**
 * GET route for fetching user fitness profile with userID.
 * Requires user authentication.
 */
router.get('/fitness-profile', userProtect, fetch_fitnessProfile);


module.exports = router;