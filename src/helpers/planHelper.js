const Plan = require("../models/Plan");
const WeekPlan = require("../models/WeekPlan");
const DayPlan = require("../models/DayPlan");
const Category = require("../models/Category");
const Exercise = require("../models/Exercise");
const uploadFile = require("../service/fileUploadService");


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////CREATE PLANS SECTION//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/**
 * Creates a new workout plan by saving the provided weeks and plan body.
 *
 * @param {Object} param - An object containing the weeks and plan body.
 * @param {Array} param.weeks - An array of week objects, each containing days and categories.
 * @param {Object} param.planBody - The rest of the plan data (e.g., name, description, etc.).
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the saved plan.
 * If an error occurs during the save process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function createJsonPlan({ weeks, ...planBody }) {
    try {
        const weekDocs = await Promise.all(weeks.map(async (week) => {
            const dayDocs = await Promise.all(week.days.map(async (day) => {
                const categoryDocs = await Promise.all(day.categories.map(async (category) => {
                    const exerciseDocs = await Promise.all(category.exercises.map(async (exercise) => {
                        const newExercise = new Exercise(exercise);
                        await newExercise.save();
                        return newExercise._id;
                    }));

                    const newCategory = new Category({
                        sub_category: category.sub_category,
                        circuit_rest_time: category.circuit_rest_time,
                        circuit_reps: category.circuit_reps,
                        exercises: exerciseDocs
                    });
                    await newCategory.save();
                    return newCategory._id;
                }));

                const newDay = new DayPlan({
                    day: day.day,
                    day_name: day.day_name,
                    day_banner_image: day.day_banner_image,
                    intro_video: day.intro_video,
                    day_of_week: day.day_of_week,
                    estimated_duration: day.estimated_duration,
                    categories: categoryDocs
                });
                await newDay.save();
                return newDay._id;
            }));

            const newWeek = new WeekPlan({
                week: week.week,
                days: dayDocs
            });
            await newWeek.save();
            return newWeek._id;
        }));


        const newPlan = new Plan({
            weeks: weekDocs,
            ...planBody
        });

        await newPlan.save();

        const data = {
            status: 200,
            message: "Workout plan saved successfully",
            plan: newPlan
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
 * Creates a new workout plan by saving the provided plan body.
 *
 * @function createPlan
 * @param {Object} planBody - The object containing the plan data (e.g., name, description, etc.).
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the saved plan.
 * If an error occurs during the save process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function createPlan(files, planBody) {
    try {
        const urls = await uploadFile(files, 'plan');

        const newPlan = new Plan({
            ...planBody,
            plan_video: urls[0],
            banner_image: urls[1]
        });

        await newPlan.save();

        const data = {
            status: 200,
            message: "Workout plan saved successfully",
            plan: newPlan
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


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////FETCH PLANS SECTION///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/**
 * Fetches a data plan based on the provided ID. If no ID is provided, fetches all data plans.
 *
 * @param {string} [id] - The ID of the data plan to fetch. If not provided, fetches all data plans.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched plan(s).
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function fetchPlan(id) {
    try {
        const data = {
            status: 200,
            message: "Data Plans fetched successfully",
        };

        if (id) {
            const plan = await Plan.findById(id).populate({
                path: 'weeks',
                populate: {
                    path: 'days',
                    populate: {
                        path: 'categories',
                        populate: {
                            path: 'exercises'
                        }
                    }
                }
            })

            if (!plan) {
                data.status = 400;
                data.message = "Plan not found";
                return data;
            }

            data["plan"] = plan;
        } else {
            const plans = await Plan.find({}).populate({
                path: 'weeks',
                populate: {
                    path: 'days',
                    populate: {
                        path: 'categories',
                        populate: {
                            path: 'exercises'
                        }
                    }
                }
            });

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
 * Fetches a high-level overview of a data plan based on the provided ID. If no ID is provided, fetches all data plan overviews.
 *
 * @function fetchPlanOverview
 * @param {string} [id] - The ID of the data plan to fetch. If not provided, fetches all data plan overviews.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched plan(s) overview.
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function fetchPlanOverview(id) {
    try {
        const data = {
            status: 200,
            message: "Data Plans fetched successfully",
        };

        if (id) {
            const plan = await Plan.findById(id)

            if (!plan) {
                data.status = 400;
                data.message = "Plan not found";
                return data;
            }

            data["plan"] = plan;
        } else {
            const plans = await Plan.find({})

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


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////UPDATE PLANS SECTION//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/**
 * Updates a workout plan by finding the plan by its ID and updating its fields.
 *
 * @param {string} id - The ID of the workout plan to update.
 * @param {Object} param - An object containing the weeks and plan body.
 * @param {Array} param.weeks - An array of week objects, each containing days and categories.
 * @param {Object} param.planBody - The rest of the plan data (e.g., name, description, etc.).
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated plan.
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function updatePlan(id, { weeks, ...planBody }) {
    try {
        const plan = await Plan.findOneAndUpdate({ _id: id }, planBody, { new: true });

        if (!plan) {
            return { status: 400, message: "Plan not found" };
        }

        await plan.save();

        const data = {
            status: 200,
            message: "Workout plan updated successfully",
            plan
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
 * Adds a new week to an existing data plan.
 *
 * @function addWeek
 * @param {string} planID - The ID of the data plan to which the week will be added.
 * @param {Object} weekBody - The object containing the fields to be added to the new week.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the added week.
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the addition process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if the plan ID is not provided or if an error occurs during the addition process.
 */
async function addWeek(planID, weekBody) {
    try {
        const plan = await Plan.findById(planID);

        if (!plan) {
            return { status: 400, message: "Plan not found" };
        }

        const newWeek = new WeekPlan({ ...weekBody });
        const week = await newWeek.save();

        plan.weeks.addToSet(week._id);
        await plan.save();

        return {
            status: 200,
            message: "Week plan added successfully",
            week
        };
    } catch (error) {
        return Promise.reject({
            status: 500,
            message: "Internal Server Error",
        });
    }
}


/**
 * Fetches a week plan based on the provided ID.
 *
 * @function getWeek
 * @param {string} id - The ID of the week plan to fetch.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched week.
 * If the week is not found, the promise resolves to an object with a status of 400 and a message indicating the week not found.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function getWeek(id) {
    try {
        const week = await WeekPlan.findById(id);

        if (!week) {
            return { status: 400, message: "Week data not found" }
        }

        return {
            status: 200,
            message: "Week data fetched successfully",
            week
        }

    } catch (error) {
        return Promise.reject({
            status: 500,
            message: "Internal Server Error",
        });
    }
}


/**
 * Updates a week plan by finding the week by its ID and updating its fields.
 *
 * @function updateWeek
 * @param {string} id - The ID of the week plan to update.
 * @param {Object} param - An object containing the days and week body.
 * @param {Array} param.days - An array of day objects, each containing categories.
 * @param {Object} param.weekBody - The rest of the week data (e.g., week number, etc.).
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated week.
 * If the week is not found, the promise resolves to an object with a status of 400 and a message indicating the week not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function updateWeek(id, { days, ...weekBody }) {
    try {
        const week = await WeekPlan.findOneAndUpdate({ _id: id }, weekBody, { new: true })

        if (!week) {
            return { status: 400, message: "Plan not found" };
        }

        await week.save();

        const data = {
            status: 200,
            message: "Week plan updated successfully",
            weekPlan: week
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
 * Adds a new day to an existing week plan.
 *
 * @function addDay
 * @param {string} weekID - The ID of the week plan to which the day will be added.
 * @param {Object} dayBody - The object containing the fields to be added to the new day.
 * @param {Object} files - The files object containing the day's intro video and day banner image.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the added day.
 * If the week is not found, the promise resolves to an object with a status of 400 and a message indicating the week not found.
 * If an error occurs during the addition process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if the week ID is not provided or if an error occurs during the addition process.
 */
async function addDay(weekID, dayBody, files) {
    try {
        const weekPlan = await WeekPlan.findById(weekID);

        if (!weekPlan) {
            return { status: 400, message: "Week not found" }
        }

        const urls = await uploadFile(files, 'day')

        const day = new DayPlan({
            intro_video: urls[0],
            day_banner_image: urls[1],
            ...dayBody
        });
        const newDay = await day.save();

        weekPlan.days.addToSet(newDay._id);

        await weekPlan.save();

        return {
            status: 200,
            message: "Day plan added successfully",
            day: newDay
        }

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


/**
 * Fetches a list of featured data plans from the database.
 *
 * @function getFeaturedPlans
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched featured plans.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if an error occurs during the fetch process.
 */
async function getDay(id) {
    try {
        const day = await DayPlan.findById(id);

        if (!day) {
            return { status: 400, message: "Day data not found" }
        }

        return {
            status: 200,
            message: "Day data fetched successfully",
            day
        }

    } catch (error) {
        return Promise.reject({
            status: 500,
            message: "Internal Server Error",
        });
    }
}


/**
 * Updates a day plan by finding the day by its ID and updating its fields.
 *
 * @function updateDay
 * @param {string} id - The ID of the day plan to update.
 * @param {Object} param - An object containing the category and day body.
 * @param {Object} param.category - The category object to be updated.
 * @param {Object} param.dayBody - The rest of the day data (e.g., day number, etc.).
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated day.
 * If the day is not found, the promise resolves to an object with a status of 400 and a message indicating the day not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function updateDay(id, { category, ...dayBody }) {
    try {
        const day = await DayPlan.findOneAndUpdate({ _id: id }, dayBody, { new: true });

        if (!day) {
            return { status: 400, message: "Plan not found" };
        }

        await day.save();

        const data = {
            status: 200,
            message: "Week plan updated successfully",
            dayPlan: day
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
 * Adds a new category to a day plan.
 *
 * @function addCategory
 * @param {string} dayID - The ID of the day plan to which the category will be added.
 * @param {Object} catBody - The object containing the fields to be added to the new category.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the added category.
 * If the day is not found, the promise resolves to an object with a status of 400 and a message indicating the day not found.
 * If an error occurs during the addition process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if the day ID is not provided or if an error occurs during the addition process.
 */
async function addCategory(dayID, catBody) {
    try {
        const day = await DayPlan.findById(dayID);

        if (!day) {
            return { status: 400, message: "Day not found" };
        }

        const newCat = new Category({ ...catBody });

        const cat = await newCat.save();

        day.categories.addToSet(cat._id);

        await day.save();

        return {
            status: 200,
            message: "Category added successfully",
            category: cat
        }

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


/**
 * Fetches a category based on the provided ID.
 *
 * @function getCategory
 * @param {string} id - The ID of the category to fetch.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched category.
 * If the category is not found, the promise resolves to an object with a status of 400 and a message indicating the category not found.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function getCategory(id) {
    try {
        const category = await Category.findById(id);

        if (!category) {
            return { status: 400, message: "Category not found" }
        }

        return {
            status: 200,
            message: "Category fetched successfully",
            category
        }

    } catch (error) {
        return Promise.reject({
            status: 500,
            message: "Internal Server Error",
        });
    }
}



/**
 * Updates a category by finding the category by its ID and updating its fields.
 *
 * @function updateCategory
 * @param {string} id - The ID of the category to update.
 * @param {Object} param - An object containing the exercises and category body.
 * @param {Array} param.exercises - An array of exercise objects to be updated.
 * @param {Object} param.categoryBody - The rest of the category data (e.g., sub_category, circuit_rest_time, etc.).
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated category.
 * If the category is not found, the promise resolves to an object with a status of 400 and a message indicating the category not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function updateCategory(id, { exercises, ...categoryBody }) {
    try {
        const cat = await Category.findOneAndUpdate({ _id: id }, categoryBody, { new: true });

        if (!cat) {
            return {
                status: 400,
                message: "Category not found"
            }
        };

        await cat.save();

        const data = {
            status: 200,
            message: "Category updated successfully",
            category: cat
        };

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
 * Adds a new exercise to a category.
 *
 * @function addExercise
 * @param {string} categoryID - The ID of the category to which the exercise will be added.
 * @param {Object} exerciseBody - The object containing the fields to be added to the new exercise.
 * @param {Object} files - The files object containing the exercise's video and image.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the added exercise.
 * If the category is not found, the promise resolves to an object with a status of 400 and a message indicating the category not found.
 * If an error occurs during the addition process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function addExercise(categoryID, exerciseBody, files) {
    try {
        const category = await Category.findById(categoryID);

        if (!category) {
            return {
                status: 400,
                message: "Category not found"
            }
        }

        const urls = await uploadFile(files, 'exercise');

        const newExercise = new Exercise({
            exercise_video: urls[0],
            exercise_image: urls[1],
            ...exerciseBody
        });

        const exercise = await newExercise.save();

        category.exercises.addToSet(exercise._id);

        await category.save();

        return {
            status: 200,
            message: "Exercise added successfully",
            exercise
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


/**
 * Fetches an exercise based on the provided ID.
 *
 * @function getExercise
 * @param {string} id - The ID of the exercise to fetch.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched exercise.
 * If the exercise is not found, the promise resolves to an object with a status of 400 and a message indicating the exercise not found.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function getExercise(id) {
    try {
        const exercise = await Exercise.findById(id);

        if (!exercise) {
            return { status: 400, message: "Exercise not found" }
        }

        return {
            status: 200,
            message: "Exercise fetched successfully",
            exercise
        }

    } catch (error) {
        return Promise.reject({
            status: 500,
            message: "Internal Server Error",
        });
    }
}


/**
 * Updates an exercise by finding the exercise by its ID and updating its fields.
 *
 * @function updateExercise
 * @param {string} id - The ID of the exercise to update.
 * @param {Object} body - The object containing the fields to be updated.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated exercise.
 * If the exercise is not found, the promise resolves to an object with a status of 400 and a message indicating the exercise not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 */
async function updateExercise(id, body) {
    try {
        const exercise = await Exercise.findOneAndUpdate({ _id: id }, body, { new: true });

        if (!exercise) {
            return {
                status: 400,
                message: "Exercise not found"
            }
        };

        await exercise.save();

        const data = {
            status: 200,
            message: "Exercise updated successfully",
            exercise
        };

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


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////TRENDING AND FEATURED PLANS///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * Sets the trending status of a data plan based on the provided ID.
 *
 * @function setTrendingPlanStatus
 * @param {string} planID - The ID of the data plan to update.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated plan.
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if the plan ID is not provided or if an error occurs during the update process.
 */
async function setTrendingPlanStatus(planID) {
    try {
        const trendingPlan = await Plan.findById(planID);

        trendingPlan.isTrending = !trendingPlan.isTrending;

        await trendingPlan.save();

        const data = {
            status: 200,
            message: "Changed trending status",
            trendingPlan
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
 * Fetches a list of trending data plans from the database.
 *
 * @function getTrendingPlans
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched trending plans.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if an error occurs during the fetch process.
 */
async function getTrendingPlans() {
    try {
        const trendingPlans = await Plan.find(
            { isTrending: true }
        ).populate({
            path: 'weeks',
            populate: {
                path: 'days',
                populate: {
                    path: 'categories',
                    populate: {
                        path: 'exercises'
                    }
                }
            }
        });

        const data = {
            status: 200,
            message: "Fetched trending plans",
            trendingPlans
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
 * Sets the featured status of a data plan based on the provided ID.
 *
 * @function setFeaturedPlanStatus
 * @param {string} planID - The ID of the data plan to update.
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the updated plan.
 * If the plan is not found, the promise resolves to an object with a status of 400 and a message indicating the plan not found.
 * If an error occurs during the update process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if the plan ID is not provided or if an error occurs during the update process.
 */
async function setFeaturedPlanStatus(planID) {
    try {
        const featuredPlan = await Plan.findById(planID);

        featuredPlan.isFeatured = !featuredPlan.isFeatured;

        await featuredPlan.save();

        const data = {
            status: 200,
            message: "Changed featured status",
            featuredPlan
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
 * Fetches a list of featured data plans from the database.
 *
 * @function getFeaturedPlans
 * @returns {Promise} A promise that resolves to an object containing the status, message, and the fetched featured plans.
 * If an error occurs during the fetch process, the promise rejects with an object containing a status of 500 and the error message.
 *
 * @throws Will throw an error if an error occurs during the fetch process.
 */
async function getFeaturedPlans() {
    try {
        const featuredPlans = await Plan.find(
            { isFeatured: true }
        ).populate({
            path: 'weeks',
            populate: {
                path: 'days',
                populate: {
                    path: 'categories',
                    populate: {
                        path: 'exercises'
                    }
                }
            }
        });

        const data = {
            status: 200,
            message: "Fetched featured plans",
            featuredPlans
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
const createFunctions = { createPlan, createJsonPlan, addWeek, addDay, addCategory, addExercise };
const specialPlans = { setTrendingPlanStatus, getTrendingPlans, setFeaturedPlanStatus, getFeaturedPlans };
const fetchingPlans = { getWeek, getDay, getCategory, getExercise }
module.exports = { ...createFunctions, ...specialPlans, ...fetchingPlans, fetchPlan, fetchPlanOverview, updatePlan, deletePlan, updateWeek, updateDay, updateCategory, updateExercise };