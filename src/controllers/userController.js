const { updateProfile, fetchUser, setBookmark, getBookmarks, removeBookmark, getUserData, uploadProfilePic } = require("../helpers/userHelper");
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



const bookmarkControllers = { newBookmark, fetchBookmark, deleteBookmark }

module.exports = { updateUserProfile, fetchUserData, getUser, newProfilePic, ...bookmarkControllers }