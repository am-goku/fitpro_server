const Plan = require("../models/Plan");
const { UserWorkout, UserExerciseProgress } = require("../models/Workout");



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

        const userWorkout = new UserWorkout({
            user: userID,
            plan: planID,
            totalExercises
        });

        await userWorkout.save();

        return {
            status: 201,
            message: 'Workout plan selected successfully',
            userWorkout
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function updateExerciseCompletion(exerciseID, userID) {
    try {
        const userWorkout = await UserWorkout.findOne({ user: userID, 'weeks.days.categories.exercises.exercise': exerciseID });

        if (!userWorkout) {
            return { status: 400, message: 'User workout plan not found' }
        }

        const exerciseProgress = await UserExerciseProgress.findOneAndUpdate(
            { exercise: exerciseID },
            { completed: true },
            { new: true, upsert: true }
        );

        userWorkout.completedExercises += 1;
        userWorkout.completionPercentage = (userWorkout.completedExercises / userWorkout.totalExercises) * 100;

        await userWorkout.save();

        return {
            status: 200,
            message: 'Exercise completed successfully',
            exerciseProgress
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function getWorkoutProgress(userID, planID) {
    try {

        const query = { user: userID };

        if (planID) {
            query.plan = planID;
        }

        const userWorkoutProgress = await UserWorkout.find(query).populate({
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

        if (!userWorkoutProgress) {
            return { status: 400, message: 'User workout plan not found' }
        }

        return {
            status: 200,
            message: 'Workout progress retrieved successfully',
            plans: userWorkoutProgress
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