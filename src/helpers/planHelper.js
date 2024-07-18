const Plan = require("../models/Plan");


/**
 * Creates a new data plan.
 *
 * @param {Object} body - The request body containing the plan data.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the created plan.
 * @throws {Error} If an error occurs during the creation process.
 */
async function createPlan(body) {
    try {
        const newPlan = new Plan({ ...body });

        const plan = await newPlan.save();

        const data = {
            status: 200,
            message: "Plan created successfully",
            plan,
        }

        return data;

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


/**
 * Fetches a data plan based on the provided ID. If no ID is provided, fetches all data plans.
 *
 * @param {string} id - The ID of the data plan to fetch. If not provided, fetches all data plans.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched plan(s).
 * If an ID is provided and the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function fetchPlan(id) {
    try {
        const data = {
            status: 200,
            message: "Data Plans fetched successfully",
        };

        if (id) {
            const plan = await Plan.findById(id);
            if (!plan) {
                data.status = 400;
                data.message = "Plan not found";
                return data;
            }

            data["plan"] = plan;
        } else {
            const plans = await Plan.find({});
            data["plans"] = plans;
        }

        return data;

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


/**
 * Updates a data plan based on the provided ID and body.
 *
 * @param {string} id - The ID of the data plan to update.
 * @param {Object} body - The request body containing the updated plan data.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated plan.
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function updatePlan(id, body) {
    try {

        const plan = await Plan.findOneAndUpdate({ _id: id }, body, { new: true });

        const data = {
            status: 200,
            message: "Plan updated successfully",
            plan,
        }

        return data;

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


/**
 * Deletes a data plan based on the provided ID.
 *
 * @param {string} id - The ID of the data plan to delete.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the deleted plan.
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the deletion process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function deletePlan(id) {
    try {
        const plan = await Plan.findByIdAndDelete(id);

        if (!plan) {
            return { status: 400, message: "Plan not found" };
        }

        const data = {
            status: 200,
            message: "Plan deleted successfully",
        }

        return data;

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


/**
 * Exports functions for managing data plans.
 *
 * @module helpers/planHelper
 */
module.exports = { createPlan, fetchPlan, updatePlan, deletePlan }