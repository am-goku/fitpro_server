const { updateProfile, fetchUser, setBookmark, getBookmarks, removeBookmark, getUserData, uploadProfilePic, beforeAndAfter, uploadImage, deleteImage, createGallery, deletedGallery, getGalleries, updateMeasurements, fetchFitnessProfile } = require("../helpers/userHelper");
const responseHandler = require("../utils/responseHandler");


/**
 * Updates the user's profile information.
 *
 * @param {Object} req - Express request object containing the user's profile data in the body.
 * @param {Object} res - Express response object to send the updated profile data back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the profile is successfully updated.
 * @throws {Error} - Throws an error if there's an issue updating the profile.
 */
async function updateUserProfile(req, res) {
    try {
        const userData = req.body;
        const userID = req.userID;

        delete userData.email;
        delete userData.password;

        const data = await updateProfile(userID, userData);
        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}


/**
 * Fetches user data from the database based on the provided user ID.
 *
 * @param {Object} req - Express request object containing the user ID in the params.
 * @param {Object} res - Express response object to send the fetched user data back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the user data is successfully fetched.
 * @throws {Error} - Throws an error if there's an issue fetching the user data.
 */
async function fetchUserData(req, res) {
    try {
        const id = req.query.userID;

        const data = await fetchUser(id);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}


/**
 * Fetches user data from the database based on the provided user ID.
 * 
 * @param {Object} req - Express request object containing the user ID in the req.userID property.
 * @param {Object} res - Express response object to send the fetched user data back to the client.
 * 
 * @returns {Promise<void>} - Returns a Promise that resolves when the user data is successfully fetched.
 * If successful, the response will be sent using the responseHandler function with the fetched data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 * 
 * @throws {Error} - Throws an error if there's an issue fetching the user data.
 * 
 * @example
 * // Request
 * GET /user
 */
async function getUser(req, res) {
    try {
        const id = req.userID

        const data = await getUserData(id);

        return responseHandler(res, data);
    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// USER PROFILE //////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Uploads a new profile picture for the user.
 * 
 * @param {Object} req - Express request object containing the user ID and uploaded files in the request properties.
 * @param {string} req.userID - The unique identifier of the user.
 * @param {Object} req.files - The uploaded files object containing the profile picture.
 * @param {Object} res - Express response object to send the result of the profile picture upload back to the client.
 * 
 * @returns {Promise<void>} - Returns a Promise that resolves when the profile picture is successfully uploaded.
 * If successful, the response will be sent using the responseHandler function with the uploaded data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 * 
 * @throws {Error} - Throws an error if there's an issue uploading the profile picture.
 * @example
 * // Request
 * POST /profile/picture
 */
async function newProfilePic(req, res) {
    try {
        const userID = req.userID;
        const files = req.files;

        const data = await uploadProfilePic(files, userID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Handles the transformation process for user uploaded images.
 *
 * @param {Object} req - Express request object containing the user ID and uploaded files in the request properties.
 * @param {string} req.userID - The unique identifier of the user.
 * @param {Object} req.files - The uploaded files object containing the images to be transformed.
 * @param {Object} res - Express response object to send the result of the transformation back to the client.
 *
 * @returns {Promise<void>} - Returns a Promise that resolves when the transformation is successfully completed.
 * If successful, the response will be sent using the responseHandler function with the transformed data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 *
 * @throws {Error} - Throws an error if there's an issue during the transformation process.
 *
 * @example
 * // Request
 * POST /transformation
 */
async function transformationController(req, res) {
    try {
        const userID = req.userID;
        const files = req.files;
        const date = req.body.before_date;

        const data = await beforeAndAfter(files, date, userID);

        return responseHandler(res, data);
    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Adds a new image to a user's gallery.
 * 
 * @function addNewImage
 * @param {Object} req - Express request object containing the gallery ID, user ID, and uploaded files.
 * @param {string} req.params.galleryID - The unique identifier of the gallery where the image will be added.
 * @param {string} req.userID - The unique identifier of the user who is adding the image.
 * @param {Object} req.files - The uploaded files object containing the image to be added.
 * @param {Object} res - Express response object to send the result of the image addition back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the image is successfully added.
 * If successful, the response will be sent using the responseHandler function with the added image data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 * @throws {Error} - Throws an error if there's an issue adding the image to the gallery.
 * 
 * @example
 * // Request
 * POST /gallery/1234567890/images
 */
async function addNewImage(req, res) {
    try {
        const galleryID = req.params.galleryID;
        const userID = req.userID;
        const files = req.files;

        console.log(files)

        const data = await uploadImage(files, galleryID, userID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Deletes images from a user's gallery.
 * 
 * @function removeImages
 * @param {Object} req - Express request object containing the gallery ID and images to be deleted.
 * @param {string} req.params.galleryID - The unique identifier of the gallery from which the images will be deleted.
 * @param {Object} req.body.images - An array of image IDs to be deleted from the gallery.
 * @param {Object} res - Express response object to send the result of the image deletion back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the images are successfully deleted.
 * If successful, the response will be sent using the responseHandler function with the deleted image data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 * @throws {Error} - Throws an error if there's an issue deleting the images from the gallery.
 * 
 * @example
 * // Request
 * DELETE /gallery/1234567890/images
 */
async function removeImages(req, res) {
    try {
        const galleryID = req.params.galleryID;
        const images = req.body.images;

        const data = await deleteImage(images, galleryID)

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Creates a new gallery for a user.
 * 
 * @function newGallery
 * @param {Object} req - Express request object containing the user ID and gallery data in the request body.
 * @param {string} req.userID - The unique identifier of the user who is creating the gallery.
 * @param {Object} req.body - The gallery data to be stored in the database.
 * @param {Object} res - Express response object to send the result of gallery creation back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the gallery is successfully created.
 * If successful, the response will be sent using the responseHandler function with the created gallery data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 * @throws {Error} - Throws an error if there's an issue creating the gallery.
 * 
 * @example
 * // Request
 * POST /gallery
 * {
 * "name": "My New Gallery",
 * "description": "A collection of my favorite images."
 * }
 */
async function newGallery(req, res) {
    try {
        const userID = req.userID;
        const body = req.body;

        const data = await createGallery(body, userID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Fetches galleries from the database based on the provided user ID and gallery ID.
 * 
 * @function fetchGalleries
 * @param {Object} req - Express request object containing the user ID and gallery ID in the request parameters.
 * @param {string} req.userID - The unique identifier of the user who owns the galleries.
 * @param {string} [req.query.galleryID] - The unique identifier of the gallery to be fetched. If not provided, all galleries for the user will be fetched.
 * @param {Object} res - Express response object to send the fetched galleries data back to the client.
 * 
 * @returns {Promise<void>} - Returns a Promise that resolves when the galleries data is successfully fetched.
 * If successful, the response will be sent using the responseHandler function with the fetched data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 * @throws {Error} - Throws an error if there's an issue fetching the galleries data.
 * 
 * @example
 * // Request to fetch all galleries for a user
 * GET /gallery
 * // Request to fetch a specific gallery for a user
 * GET /gallery?galleryID=1234567890
 */
async function fetchGalleries(req, res) {
    try {
        const userID = req.userID;
        const galleryID = req.query.galleryID;

        const data = await getGalleries(galleryID, userID);

        return responseHandler(res, data);
    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Deletes a user's gallery from the database.
 *
 * @function removeGallery
 * @param {Object} req - Express request object containing the user ID and gallery ID in the request parameters.
 * @param {string} req.userID - The unique identifier of the user who owns the gallery.
 * @param {string} req.params.galleryID - The unique identifier of the gallery to be deleted.
 * @param {Object} res - Express response object to send the result of gallery deletion back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the gallery is successfully deleted.
 * If successful, the response will be sent using the responseHandler function with the deleted gallery data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 * @throws {Error} - Throws an error if there's an issue deleting the gallery.
 *
 * @example
 * // Request
 * DELETE /gallery/1234567890
 */
async function removeGallery(req, res) {
    try {
        const userID = req.userID;
        const galleryID = req.params.galleryID;

        const data = await deletedGallery(galleryID, userID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}




//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// USER BOOKMARK /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Creates a new bookmark for a user for a specific day.
 *
 * @param {Object} req - Express request object containing the user ID and day ID in the request parameters.
 * @param {Object} res - Express response object to send the result of bookmark creation back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the bookmark is successfully created.
 * @throws {Error} - Throws an error if there's an issue creating the bookmark.
 *
 * @example
 * // Request
 * POST /bookmarks/1234567890
 */
async function newBookmark(req, res) {
    try {
        const uid = req.userID;
        const dayID = req.params.dayID;

        const data = await setBookmark(uid, dayID);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        return responseHandler(res, data);
    }
}


/**
 * Fetches the user's bookmarks from the database based on the provided user ID.
 *
 * @param {Object} req - Express request object containing the user ID in the request parameters.
 * @param {Object} res - Express response object to send the fetched bookmarks data back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the bookmarks data is successfully fetched.
 * @throws {Error} - Throws an error if there's an issue fetching the bookmarks data.
 *
 * @example
 * // Request
 * GET /bookmarks
 */
async function fetchBookmark(req, res) {
    try {
        const uid = req.userID;

        const data = await getBookmarks(uid);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        return responseHandler(res, data);
    }
}


/**
 * Deletes a bookmark for a user for a specific day.
 *
 * @param {Object} req - Express request object containing the user ID and day ID in the request parameters.
 * @param {Object} res - Express response object to send the result of bookmark deletion back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the bookmark is successfully deleted.
 * @throws {Error} - Throws an error if there's an issue deleting the bookmark.
 *
 * @example
 * // Request
 * DELETE /bookmarks/1234567890
 */
async function deleteBookmark(req, res) {
    try {
        const uid = req.userID;
        const dayID = req.params.dayID;

        const data = await removeBookmark(uid, dayID);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        return responseHandler(res, data);
    }
}


/**
 * Updates a user's measurements in the database.
 *
 * @function update_Measurements
 * @param {Object} req - Express request object containing the user ID and measurement data in the request body.
 * @param {string} req.userID - The unique identifier of the user whose measurements will be updated.
 * @param {Object} req.body - The measurement data to be stored in the database.
 * @param {Object} res - Express response object to send the result of the measurement update back to the client.
 *
 * @returns {Promise<void>} - Returns a Promise that resolves when the measurements are successfully updated.
 * If successful, the response will be sent using the responseHandler function with the updated measurement data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 *
 * @throws {Error} - Throws an error if there's an issue updating the measurements.
 *
 * @example
 * // Request
 * PUT /user/measurements
 */
async function update_Measurements(req, res) {
    try {
        const body = req.body;
        const userID = req.userID;
        if (!body) {
            const data = {
                status: 400,
                message: "Invalid request body"
            }

            return responseHandler(res, data)
        }
        const data = await updateMeasurements(userID, body);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Fetches a user's fitness profile from the database based on the provided user ID.
 *
 * @function fetch_fitnessProfile
 * @param {Object} req - Express request object containing the user ID in the request parameters.
 * @param {string} req.userID - The unique identifier of the user whose fitness profile will be fetched.
 * @param {Object} res - Express response object to send the result of the fitness profile fetch back to the client.
 *
 * @returns {Promise<void>} - Returns a Promise that resolves when the fitness profile is successfully fetched.
 * If successful, the response will be sent using the responseHandler function with the fetched fitness profile data.
 * If an error occurs, the response will be sent using the responseHandler function with a status code of 500 and the error message.
 *
 * @throws {Error} - Throws an error if there's an issue fetching the fitness profile.
 *
 * @example
 * // Request
 * GET /user/fitness-profile
 */
async function fetch_fitnessProfile(req, res) {
    try {
        const userID = req.userID;

        const data = await fetchFitnessProfile(userID);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


const fitnessProfileController = { update_Measurements, fetch_fitnessProfile }
const bookmarkControllers = { newBookmark, fetchBookmark, deleteBookmark }
const imageControllers = { transformationController, newProfilePic, addNewImage, newGallery, fetchGalleries, removeGallery, removeImages }
module.exports = { updateUserProfile, fetchUserData, getUser, ...bookmarkControllers, ...imageControllers, ...fitnessProfileController }