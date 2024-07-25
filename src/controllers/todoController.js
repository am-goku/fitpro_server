const { createTODO, getTODO, updateTODO, deleteTODO } = require("../helpers/todoHelper");
const responseHandler = require("../utils/responseHandler");


/**
 * Creates a new TODO item for the specified user.
 *
 * @param {Object} req - The request object containing the user's ID and the TODO item data.
 * @param {Object} res - The response object to send the response back.
 * @param {Object} req.body - The TODO item data to be created.
 * @param {string} req.userID - The ID of the user creating the TODO item.
 *
 * @throws Will throw an error if there is a problem creating the TODO item.
 */
async function create_TODO(req, res) {
    try {
        const body = req.body;
        const userID = req.userID;

        const data = await createTODO(userID, body);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


/**
 * Fetches a specific TODO item for the specified user.
 *
 * @param {Object} req - The request object containing the user's ID and the TODO item ID.
 * @param {Object} res - The response object to send the response back.
 * @param {string} req.userID - The ID of the user for whom the TODO item is being fetched.
 * @param {string} req.query.todoID - The ID of the TODO item to be fetched.
 *
 * @throws Will throw an error if there is a problem fetching the TODO item.
 */
async function fetch_TODO(req, res) {
    try {
        const userID = req.userID;
        const id = req.query.todoID;

        const data = await getTODO(userID, id);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


/**
 * Updates a specific TODO item for the specified user.
 *
 * @param {Object} req - The request object containing the user's ID, the TODO item ID, and the updated TODO item data.
 * @param {Object} res - The response object to send the response back.
 * @param {string} req.userID - The ID of the user for whom the TODO item is being updated.
 * @param {string} req.params.todoID - The ID of the TODO item to be updated.
 * @param {Object} req.body - The updated TODO item data.
 *
 * @returns {Promise<Object>} - A promise that resolves to the updated TODO item data or an error object.
 *
 * @throws Will throw an error if there is a problem updating the TODO item.
 */
async function update_TODO(req, res) {
    try {
        const userID = req.userID;
        const id = req.params.todoID;
        const body = req.body;

        const data = await updateTODO(userID, id, body);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message })
    }
}


/**
 * Deletes a specific TODO item for the specified user.
 *
 * @param {Object} req - The request object containing the user's ID and the TODO item ID.
 * @param {Object} res - The response object to send the response back.
 * @param {string} req.userID - The ID of the user for whom the TODO item is being deleted.
 * @param {string} req.params.todoID - The ID of the TODO item to be deleted.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the status and message of the deletion operation.
 *
 * @throws Will throw an error if there is a problem deleting the TODO item.
 */
async function remove_TODO(req, res) {
    try {
        const userID = req.userID;
        const id = req.params.todoID;

        const data = await deleteTODO(userID, id);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}

module.exports = { create_TODO, fetch_TODO, update_TODO, remove_TODO }