const FitnessProfile = require("../models/FitnessProfile");
const Gallery = require("../models/Gallery");
const User = require("../models/User");
const uploadFile = require("../service/fileUploadService");


/**
 * Updates a user's profile information in the database.
 *
 * @param {string} userID - The unique identifier of the user to be updated.
 * @param {object} userData - An object containing the updated profile information.
 * @returns {Promise<{status: number, user: User}>} - A promise that resolves to an object containing the updated user's profile information and a status code.
 * @throws {Error} - If the user is not found in the database.
 */
async function updateProfile(userID, userData) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userID },
            { $set: userData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            throw new Error("User not found");
        }

        return { status: 200, user }

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Fetches a user's profile information from the database.
 *
 * @param {string} id - The unique identifier of the user to be fetched. If not provided, all users will be fetched.
 * @returns {Promise<{status: number, message: string, users?: User[], user?: User}>} - A promise that resolves to an object containing the fetched user's profile information, a status code, and a message.
 * If no ID is provided, the promise resolves to an object containing an array of all users.
 * If an ID is provided, the promise resolves to an object containing a single user.
 * @throws {Error} - If the user is not found in the database.
 */
async function fetchUser(userID) {
    try {

        const query = {}

        if (!userID) {
            query['_id'] = userID
        }

        const users = await User.find(query)

        return { status: 200, message: "User fetched successfullly", users }

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Fetches a user's profile information from the database.
 * 
 * @param {string} id - The unique identifier of the user to be fetched.
 * @returns {Promise<{status: number, message: string, user?: User}>} - A promise that resolves to an object containing the fetched user's profile information, a status code, and a message.
 * If an ID is provided, the promise resolves to an object containing a single user.
 * If no ID is provided, the promise does not resolve with an array of all users.
 * @throws {Error} - If the user is not found in the database.
 */
async function getUserData(id) {
    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
            return { status: 404, message: "User not found" }
        }

        return {
            status: 200,
            message: "User data fetched successfully",
            user
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}





//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// USER PROFILE //////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Updates a user's profile picture in the database.
 * 
 * @function uploadProfilePic
 * @param {object} files - The uploaded files containing the profile picture.
 * @param {string} id - The unique identifier of the user whose profile picture will be updated.
 * @returns {Promise<{status: number, message: string, user: object}>} - A promise that resolves to an object containing the status code, a message, and the updated user object.
 * If the user is found and the profile picture is successfully updated, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If the user is not found, the promise resolves to an object with a status code of 404 and a message indicating user not found.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function uploadProfilePic(files, id) {
    try {
        const user = await User.findById(id);

        if (!user) {
            return { status: 404, message: "User not found" }
        }

        const urls = await uploadFile(files, 'profile');

        user.profilePic = urls[0];

        await user.save();

        return {
            status: 200,
            message: "Profile picture updated successfully",
            user
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}


/**
 * Adds a transformation (before and after images) to a user's fitness profile.
 * 
 * @function beforeAndAfter
 * @param {object} files - The uploaded files containing the before and after images.
 * @param {string} id - The unique identifier of the user whose fitness profile will be updated.
 * @returns {Promise<{status: number, message: string, fitnessProfile: object}>} - A promise that resolves to an object containing the status code, a message, and the updated fitness profile object.
 * If the transformation is successfully added, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function beforeAndAfter(files, date, id) {
    try {
        const urls = await uploadFile(files, 'transform');

        const params = {
            before: urls[0],
            after: urls[1],
            before_date: date
        }

        const fitnessProfile = await FitnessProfile.findOneAndUpdate(
            { _id: id },
            { $set: { transformations: params } },
            { new: true, upsert: true }
        )

        return {
            status: 200,
            message: "Transformation added successfully",
            fitnessProfile
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}


/**
 * Creates a new gallery for a user in the database.
 * 
 * @function createGallery
 * @param {object} body - The request body containing the gallery data.
 * @param {string} uid - The unique identifier of the user for whom the gallery will be created.
 * @returns {Promise<{status: number, message: string, gallery: object}>} - A promise that resolves to an object containing the status code, a message, and the created gallery object.
 * If the gallery is successfully created, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If the user is not found, the promise resolves to an object with a status code of 400 and a message indicating user not found.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function createGallery(body, uid) {
    try {
        const user = await User.findById(uid);

        if (!user) {
            return {
                status: 400,
                message: "User not found",
            }
        }

        const gallery = new Gallery({ user: user._id, ...body });

        await gallery.save();

        return {
            status: 200,
            message: "Gallery created successfully",
            gallery
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}


/**
 * Fetches galleries from the database based on the provided gallery ID and user ID.
 *
 * @function getGalleries
 * @param {string} gid - The unique identifier of the gallery to be fetched. If not provided, all galleries will be fetched.
 * @param {string} uid - The unique identifier of the user whose galleries will be fetched.
 *
 * @returns {Promise<{status: number, message: string, galleries: object[]}>}
 * A promise that resolves to an object containing the status code, a message, and an array of galleries.
 * If no gallery ID is provided, the promise resolves to an object containing an array of all galleries for the specified user.
 * If a gallery ID is provided, the promise resolves to an object containing an array with a single gallery.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function getGalleries(gid, uid) {
    try {
        const query = {
            user: uid
        }

        if (gid) {
            query["_id"] = gid;
        }

        const gallery = await Gallery.find(query);

        return {
            status: 200,
            message: "Galleries fetched successfully",
            gallery
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}


/**
 * Deletes a gallery from the database based on the provided gallery ID and user ID.
 *
 * @function deletedGallery
 * @param {string} gid - The unique identifier of the gallery to be deleted.
 * @param {string} uid - The unique identifier of the user who owns the gallery.
 * @returns {Promise<{status: number, message: string}>} - A promise that resolves to an object containing the status code and a message.
 * If the gallery is successfully deleted, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If an error occurs during the database operation, the promise resolves to an object with a status code of 200 and a message indicating an internal server error.
 */
async function deletedGallery(gid, uid) {
    try {
        await Gallery.deleteOne({ _id: gid, user: uid });

        return {
            status: 200,
            message: "Gallery deleted successfully",
        }

    } catch (error) {
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}


/**
 * Uploads images to a user's gallery in the database.
 *
 * @function uploadImage
 * @param {object} files - The uploaded files containing the images to be added to the gallery.
 * @param {string} gid - The unique identifier of the gallery to which the images will be added.
 * @param {string} uid - The unique identifier of the user who owns the gallery.
 * @returns {Promise<{status: number, message: string, gallery: object}>} - A promise that resolves to an object containing the status code, a message, and the updated gallery object.
 * If the images are successfully uploaded and added to the gallery, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If the gallery is not found, the promise resolves to an object with a status code of 400 and a message indicating gallery not found.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function uploadImage(files, gid, uid) {
    try {
        const gallery = await Gallery.findOne({ _id: gid, user: uid });

        if (!gallery) {
            return {
                status: 400,
                message: "Gallery not found"
            }
        }

        const urls = await uploadFile(files?.images, 'gallery', uid);

        gallery.images.push(...urls);

        await gallery.save();

        return {
            status: 200,
            message: "Image uploaded successfully",
            gallery
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}


/**
 * Deletes one or more images from a user's gallery in the database.
 *
 * @function deleteImage
 * @param {string[]} images - An array of image URLs to be deleted from the gallery.
 * @param {string} gid - The unique identifier of the gallery from which the images will be deleted.
 *
 * @returns {Promise<{status: number, message: string, gallery: object}>} - A promise that resolves to an object containing the status code, a message, and the updated gallery object.
 * If the images are successfully deleted, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If the gallery is not found, the promise resolves to an object with a status code of 400 and a message indicating gallery not found.
 * If an error occurs during the database operation, the promise resolves to an object with a status code of 500 and a message indicating an internal server error.
 */
async function deleteImage(images, gid) {
    try {
        const gallery = await Gallery.findOneAndUpdate(
            { _id: gid },
            { $pull: { images: { $in: images } } },
            { new: true }
        );

        if (!gallery) {
            return {
                status: 400,
                message: "Gallery not found"
            }
        }

        return {
            status: 200,
            message: "Image(s) deleted successfully",
            gallery
        }

    } catch (error) {
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}




//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// USER BOOKMARK /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Adds a bookmark to a user's fitness profile.
 * 
 * @param {string} uid - The unique identifier of the user whose fitness profile will be updated.
 * @param {string} dayID - The unique identifier of the day to be bookmarked.
 * @returns {Promise<{status: number, message: string, bookmarks: object[]}>} - A promise that resolves to an object containing the status code, a message, and an array of bookmarked days.
 * If the bookmark is successfully added, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function setBookmark(uid, dayID) {
    try {
        const fitnessProfile = await FitnessProfile.findOneAndUpdate(
            { userID: uid },
            { $push: { bookmarks: dayID } },
            { new: true, upsert: true }
        ).populate("bookmarks");

        const data = {
            status: 200,
            message: "Bookmark added successfully",
            bookmarks: fitnessProfile.bookmarks
        }

        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Fetches the bookmarked days for a user from the database.
 *
 * @param {string} uid - The unique identifier of the user whose bookmarks will be fetched.
 * @returns {Promise<{status: number, message: string, bookmarks: object[]}>} - A promise that resolves to an object containing the status code, a message, and an array of bookmarked days.
 * If bookmarks are found, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If no bookmarks are found, the promise resolves to an object with a status code of 200 and a message indicating no bookmarks found.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function getBookmarks(uid) {
    try {
        const fitnessProfile = await FitnessProfile.findOne({ userID: uid }).populate("bookmarks");

        if (!fitnessProfile) {
            return { status: 200, message: "No bookmarks found", bookmarks: [] }
        }

        const data = {
            status: 200,
            message: "Bookmarks fetched successfully",
            bookmarks: fitnessProfile.bookmarks
        };

        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Removes a bookmark from a user's fitness profile.
 * 
 * @param {string} uid - The unique identifier of the user whose fitness profile will be updated.
 * @param {string} dayID - The unique identifier of the day to be removed from the bookmarks.
 * 
 * @returns {Promise<{status: number, message: string, bookmarks: object[]}>} - A promise that resolves to an object containing the status code, a message, and an array of bookmarked days.
 * If the bookmark is successfully removed, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function removeBookmark(uid, dayID) {
    try {
        const fitnessProfile = await FitnessProfile.findOneAndUpdate(
            { userID: uid },
            { $pull: { bookmarks: dayID } },
            { new: true }
        ).populate("bookmarks");

        if (!fitnessProfile) {
            return { status: 404, message: "Bookmark not found" }
        }

        const data = {
            status: 200,
            message: "Bookmark removed successfully",
            bookmarks: fitnessProfile.bookmarks
        }

        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}



/**
 * Updates the measurements for a user's fitness profile.
 *
 * @function updateMeasurements
 * @param {string} userID - The unique identifier of the user whose fitness profile will be updated.
 * @param {object} body - The request body containing the new measurements to be updated.
 *
 * @returns {Promise<{status: number, message: string, fitnessProfile: object}>}
 * A promise that resolves to an object containing the status code, a message, and the updated fitness profile object.
 * If the measurements are successfully updated, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function updateMeasurements(userID, body) {
    try {
        let fitnessProfile = await FitnessProfile.findOne({ userID });

        if (!fitnessProfile) {
            const newProfile = new FitnessProfile({
                userID
            });

            fitnessProfile = await newProfile.save();
        }

        for (const key in body) {
            if (!Array.isArray(fitnessProfile[key])) {
                fitnessProfile[key] = [body[key]];
            } else {
                fitnessProfile[key].unshift(body[key]);
            }
        }

        await fitnessProfile.save();

        return {
            status: 200,
            message: "Measurements updated successfully",
            fitnessProfile
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}


/**
 * Fetches the fitness profile of a user from the database.
 *
 * @function fetchFitnessProfile
 * @param {string} userID - The unique identifier of the user whose fitness profile will be fetched.
 *
 * @returns {Promise<{status: number, message: string, fitnessProfile: object}>}
 * A promise that resolves to an object containing the status code, a message, and the fetched fitness profile object.
 * If the fitness profile is successfully fetched, the promise resolves to an object with a status code of 200 and a message indicating success.
 * If an error occurs during the database operation, the promise rejects with a status code of 500 and an error message.
 */
async function fetchFitnessProfile(userID) {
    try {
        const fitnessProfile = await FitnessProfile.findOne({ userID });

        const data = {
            status: 200,
            message: "Fitness profile fetched succesfully",
            fitnessProfile
        }

        return data;

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}




const fitnessHelper = { updateMeasurements, fetchFitnessProfile }

const bookmarkHelpers = { setBookmark, getBookmarks, removeBookmark }

const imageHelpers = { beforeAndAfter, uploadProfilePic }

const galleryHelpers = { createGallery, getGalleries, deletedGallery, uploadImage, deleteImage }

module.exports = { updateProfile, fetchUser, getUserData, ...bookmarkHelpers, ...imageHelpers, ...galleryHelpers, ...fitnessHelper }