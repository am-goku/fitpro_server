const Plan = require("../models/Plan");
const UserPlan = require("../models/UserPlan");


/**
 * Selects a workout plan for a user and populates the exercises.
 * 
 * @param {string} planID - The ID of the workout plan to select.
 * @param {string} userID - The ID of the user selecting the plan.
 * 
 * @returns {Object} An object containing the status code, message, and user workout data.
 * * status: The HTTP status code (201 for success, 400 for plan not found, 500 for server error).
 * * message: A message describing the outcome of the operation.
 * * UserPlan: The created UserPlan document, or null if an error occurred.
 * 
 * @throws Will throw an error if the plan is not found or if there is a server error.
 */
async function selectWorkoutPlan(planID, userID) {
    try {
        const plan = await Plan.findById(planID).populate({
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

        if (!plan) {
            return { status: 400, message: 'Plan not found' }
        }

        const totalExercises = plan.weeks.reduce((total, week) => {
            return total + week.days.reduce((dayTotal, day) => {
                return dayTotal + day.categories.reduce((catTotal, category) => {
                    return catTotal + category.exercises.length;
                }, 0);
            }, 0);
        }, 0);

        const exercises = plan.weeks.map((week) => {
            return week.days.map((day) => {
                return day.categories.map((category) => {
                    return category.exercises.map((exercise) => {
                        return { exercise: exercise._id, completed: false };
                    });
                });
            });
        })

        const newUserPlan = new UserPlan({
            user: userID,
            plan: planID,
            totalExercises,
            exercises: exercises.flat(3)
        });

        await newUserPlan.save();

        return {
            status: 201,
            message: 'Workout plan selected successfully',
            UserPlan: newUserPlan
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


/**
 * Updates the completion status of an exercise for a user's workout plan.
 *
 * @param {string} exerciseID - The ID of the exercise to update.
 * @param {string} userID - The ID of the user whose workout plan to update.
 * @param {boolean} status - The new completion status for the exercise.
 *
 * @returns {Object} An object containing the status code, message, and updated user workout data.
 * * status: The HTTP status code (200 for success, 500 for server error).
 * * message: A message describing the outcome of the operation.
 * * UserPlan: The updated UserPlan document, or null if an error occurred.
 *
 * @throws Will throw an error if there is a server error or if no matching document is found to update.
 */
async function updateExerciseCompletion(exerciseID, userID, status) {
    try {
        // Perform the update operation
        const updateResult = await UserPlan.updateOne(
            {
                user: userID,
                exercises: { $elemMatch: { exercise: exerciseID } }
            },
            {
                $set: {
                    'exercises.$.completed': status
                }
            }
        );


        // Check if any documents were matched and modified
        if (updateResult.matchedCount === 0) {
            throw new Error('No matching document found to update');
        }

        // Fetch the updated document
        const updatedUserPlan = await UserPlan.findOne({
            user: userId,
            exercises: { $elemMatch: { exercise: exerciseId } }
        });

        if (!updatedUserPlan) {
            throw new Error('Updated workout not found');
        }

        // Recalculate the completed exercises count and completion percentage
        const completedExercises = updatedUserPlan.exercises.filter(e => e.completed).length;
        const totalExercises = updatedUserPlan.exercises.length;
        const completionPercentage = (completedExercises / totalExercises) * 100;

        // Update the fields in the user workout document
        updatedUserPlan.completedExercises = completedExercises;
        updatedUserPlan.completionPercentage = completionPercentage;

        // Save the updated document
        await updatedUserPlan.save();

        return {
            status: 200,
            message: 'Exercise status updated successfully',
            UserPlan: updatedUserPlan
        };

    } catch (error) {
        console.error('Error updating exercise completion:', error);
        return {
            status: 500,
            message: error.message
        };
    }
}


/**
 * Retrieves the workout progress for a user, optionally filtering by a specific plan.
 *
 * @param {string} userID - The ID of the user whose workout progress to retrieve.
 * @param {string} [planID] - (Optional) The ID of the workout plan to filter by. If not provided, all plans for the user will be retrieved.
 *
 * @returns {Object} An object containing the status code, message, and user workout progress data.
 * * status: The HTTP status code (200 for success, 400 for plan not found, 500 for server error).
 * * message: A message describing the outcome of the operation.
 * * plans: An array of UserPlan documents, or an empty array if no matching documents were found.
 *
 * @throws Will throw an error if there is a server error or if no matching document is found.
 */
async function getWorkoutProgress(userID, planID) {
    try {

        const query = { user: userID };

        if (planID) {
            query.plan = planID;
        }

        const UserPlanProgress = await UserPlan.find(query).populate({
            path: 'plan',
            populate: {
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
            }
        });

        if (!UserPlanProgress) {
            return { status: 400, message: 'User workout plan not found' }
        }

        return {
            status: 200,
            message: 'Workout progress retrieved successfully',
            plans: UserPlanProgress
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


module.exports = {
    selectWorkoutPlan,
    updateExerciseCompletion,
    getWorkoutProgress
};