const DayPlan = require("../models/DayPlan");
const Exercise = require("../models/Exercise");
const WeekPlan = require("../models/WeekPlan");
const WorkoutPlan = require("../models/WorkoutPlan");


/**
* Creates a new workout plan.

* @param {Object} body - The body of the request containing the necessary data to create a new workout plan.

* @param {string} body.name - The name of the workout plan.
* @param {string} body.description - A brief description of the workout plan.
* @param {string} body.startDate - The start date of the workout plan.
* @param {string} body.endDate - The end date of the workout plan.

* @returns {Promise} - A promise that resolves to an object containing the status, message, and the created workout plan.
*                  If an error occurs, the promise rejects with an object containing the status and error message.
 */
async function createPlan(body) {
    try {
        const newPlan = new WorkoutPlan(body);
        const plan = await newPlan.save();

        return {
            status: 200,
            message: "Workout plan created successfully",
            plan
        };

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Creates a new week plan for a given workout plan.
 *
 * @param {Object} body - The body of the request containing the necessary data to create a new week plan.
 * @param {number} body.weekNumber - The number of the week within the workout plan.
 * @param {string} planID - The ID of the workout plan to which the new week plan will be added.
 *
 * @returns {Promise} - A promise that resolves to an object containing the status, message, and the created week plan.
 *                  If an error occurs, the promise rejects with an object containing the status and error message.
 *                  The returned object has the following structure:
 *                  {
 *                      status: 200, // HTTP status code
 *                      message: "Week plan created successfully", // Description of the operation result
 *                      plan: WorkoutPlan, // The updated workout plan with the new week plan added
 *                      weekPlan: WeekPlan // The newly created week plan
 *                  }
 */
async function createWeekPlan(body, planID) {
    try {
        const plan = await WorkoutPlan.findById(planID);

        if (!plan) {
            return { status: 400, message: "Workout plan not found or invalid plan ID" };
        }

        const newWeekPlan = new WeekPlan({
            weekNumber: body.weekNumber,
        });
        const weekPlan = await newWeekPlan.save();

        plan.weekPlans.push(weekPlan._id);
        await plan.save();

        return {
            status: 200,
            message: "Week plan created successfully",
            plan,
            weekPlan
        };

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Creates a new day plan for a given week plan.
 *
 * @param {Object} params - The parameters for creating a new day plan.
 * @param {string} params.weekID - The ID of the week plan to which the new day plan will be added.
 * @param {Object} params.body - The body of the request containing the necessary data to create a new day plan.
 *
 * @returns {Promise} - A promise that resolves to an object containing the status, message, and the created day plan.
 *                  If an error occurs, the promise rejects with an object containing the status and error message.
 *                  The returned object has the following structure:
 *                  {
 *                      status: 200, // HTTP status code
 *                      message: "Day plan created successfully", // Description of the operation result
 *                      weekPlan: WeekPlan, // The week plan to which the day plan was added
 *                      dayPlan: DayPlan // The newly created day plan
 *                  }
 *
 * @throws Will throw an error if the weekPlan ID is invalid.
 */
async function createDayPlan({ weekID, ...body }) {
    try {
        const weekPlan = await WeekPlan.findById(weekID);

        if (!weekPlan) return { status: 400, message: "Invalid weekPlan ID" };

        const newDayPlan = new DayPlan({ ...body, weekPlanID: weekPlan._id });

        const dayPlan = await newDayPlan.save();

        weekPlan.dayPlans.push(dayPlan._id);
        weekPlan.save();

        const data = {
            status: 200,
            message: "Day plan created successfully",
            weekPlan,
            dayPlan
        }

        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Creates a new exercise for a given day plan.
 *
 * @param {Object} params - The parameters for creating a new exercise.
 * @param {string} params.dayID - The ID of the day plan to which the new exercise will be added.
 * @param {Object} params.body - The body of the request containing the necessary data to create a new exercise.
 *
 * @returns {Promise} - A promise that resolves to an object containing the status, message, and the created exercise.
 *                  If an error occurs, the promise rejects with an object containing the status and error message.
 *                  The returned object has the following structure:
 *                  {
 *                      status: 200, // HTTP status code
 *                      message: "Exercise created successfully and added to the given day of the week", // Description of the operation result
 *                      dayPlan: DayPlan, // The day plan to which the exercise was added
 *                      exercise: Exercise // The newly created exercise
 *                  }
 *
 * @throws Will throw an error if the dayPlan ID is invalid.
 */
async function createExercise({ dayID, ...body }) {
    try {
        const dayPlan = await DayPlan.findById(dayID);

        if (!dayPlan) return { status: 400, message: "Invalid dayPlan ID" };

        const newExercise = new Exercise({ ...body, dayPlanID: dayPlan._id });

        const exercise = await newExercise.save();

        dayPlan.exercises.push(exercise._id);
        dayPlan.save();

        const data = {
            status: 200,
            message: "Exercise created successfully and added to the given day of the week",
            dayPlan,
            exercise
        }

        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}

module.exports = { createPlan, createWeekPlan, createDayPlan, createExercise };
