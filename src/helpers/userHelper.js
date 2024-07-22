const FitnessProfile = require("../models/FitnessProfile");
const User = require("../models/User");


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
async function fetchUser(id) {
    try {
        if (!id) {
            const users = await User.find({}).select("-password");
            return { status: 200, message: "Users has been fetched", users }
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return { status: 404, message: "User not found" }
        }

        return { status: 200, message: "User fetched successfullly", user }

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}



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



const bookmarkHelpers = { setBookmark, getBookmarks, removeBookmark }

module.exports = { updateProfile, fetchUser, ...bookmarkHelpers }