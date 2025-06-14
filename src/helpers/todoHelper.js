const { Todo, LifeGoals } = require("../models/TodoSchema");


/**
 * Creates a new TODO item for a specific user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {object} body - The data for the new TODO item.
 * @returns {object} - An object containing the status, message, and the created TODO item.
 * @throws Will throw an error if the user ID is not provided or if there's an issue with the database.
 */
async function createTODO(userID, body) {
    try {
        const todo = new Todo({
            user: userID,
            ...body,
        });

        await todo.save();

        return {
            status: 201,
            message: 'Todo created successfully',
            todo,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


/**
 * Fetches a TODO item for a specific user.
 * If an ID is provided, it fetches the TODO item with that ID.
 * Otherwise, it fetches all TODO items for the user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} [id] - The unique identifier of the TODO item. Optional.
 * @returns {object} - An object containing the status, message, and the fetched TODO item(s).
 *                      If an ID is provided, the 'todo' property will contain a single TODO item.
 *                      If no ID is provided, the 'todo' property will contain an array of TODO items.
 *                      If an error occurs, the 'status' will be 500 and the 'message' will contain the error message.
 * @throws Will throw an error if the user ID is not provided or if there's an issue with the database.
 */
async function getTODO(userID, id) {
    try {
        const query = {
            user: userID,
        }

        if (id) {
            query._id = id
        }

        const todo = await Todo.find(query);

        return {
            status: 200,
            message: 'Todo fetched successfully',
            todo,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


/**
 * Updates a TODO item for a specific user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} id - The unique identifier of the TODO item to be updated.
 * @param {object} body - The updated data for the TODO item.
 * @returns {object} - An object containing the status, message, and the updated TODO item.
 *                      If an error occurs, the 'status' will be 500 and the 'message' will contain the error message.
 * @throws Will throw an error if the user ID or TODO item ID is not provided or if there's an issue with the database.
 */
async function updateTODO(userID, id, body) {
    try {
        const todo = await Todo.findOneAndUpdate({ _id: id, user: userID }, { $set: { ...body } });

        return {
            status: 200,
            message: 'Todo updated successfully',
            todo,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


/**
 * Deletes a TODO item for a specific user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} id - The unique identifier of the TODO item to be deleted.
 * @returns {object} - An object containing the status, message, and a success flag.
 *                      If the deletion is successful, the 'status' will be 200, the 'message' will be 'Todo deleted successfully', and the 'success' flag will be true.
 *                      If an error occurs, the 'status' will be 500 and the 'message' will contain the error message.
 *                      The 'success' flag will be false in case of an error.
 * @throws Will throw an error if the user ID or TODO item ID is not provided or if there's an issue with the database.
 */
async function deleteTODO(userID, id) {
    try {
        await Todo.findOneAndDelete({ _id: id, user: userID });

        return {
            status: 200,
            message: 'Todo deleted successfully',
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}



/**
 * LIFE GOALS SECTION
 */


async function createGoal(userID, body) {
    try {
        const goal = new LifeGoals({
            user: userID,
            ...body,
        });

        await goal.save();

        return {
            status: 201,
            message: 'Goal created successfully',
            goal,
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function getGoals(userID, id) {
    try {
        const query = { user: userID };

        if (id) query._id = id;

        const goals = await LifeGoals.find(query);

        if (!goals.length) {
            return {
                status: 400,
                message: 'No goals found'
            }
        }

        return {
            status: 200,
            message: 'Goals fetched successfully',
            goals,
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function updateGoal(userID, id, body) {
    try {
        const goal = await LifeGoals.findOneAndUpdate(
            {
                user: userID,
                _id: id
            },
            {
                $set: {
                    ...body
                }
            },
            {
                new: true
            }
        );

        if (!goal) {
            return {
                status: 400,
                message: 'Goal not found'
            }
        }

        return {
            status: 200,
            message: 'Goal updated successfully',
            goal
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function deleteGoal(userID, id) {
    try {
        if (!id) return { status: 404, message: 'Invalid parameter. Goal not found' }
        await LifeGoals.deleteOne({ _id: id, user: userID });

        return {
            status: 200,
            message: 'Goal deleted successfully',
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


const todoHelpers = { createTODO, getTODO, updateTODO, deleteTODO };
const goalHelpers = { createGoal, getGoals, updateGoal, deleteGoal };
module.exports = { ...todoHelpers, ...goalHelpers }