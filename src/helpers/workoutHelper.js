const Category = require("../models/Category");
const Exercise = require("../models/Exercise");
const Workout = require("../models/Workout");
const UserWorkout = require('../models/UserWorkout'); // Adjust the path if needed
const s3Interface = require("../service/s3Interface");
const User = require("../models/User");

async function createWorkout(workoutData) {
    try {
        // Create exercises first
        const createdCategories = await Promise.all(
            workoutData.categories.map(async (categoryData) => {
                const createdExercises = await Promise.all(
                    categoryData.exercises.map(async (exerciseData) => {
                        const exercise = new Exercise(exerciseData);
                        await exercise.save();
                        return exercise._id; // Return the ID for the created exercise
                    })
                );

                // Create category with the exercise IDs
                const category = new Category({
                    ...categoryData,
                    exercises: createdExercises
                });
                await category.save();
                return category._id; // Return the ID for the created category
            })
        );

        // Create workout with the category IDs
        const workout = new Workout({
            ...workoutData,
            categories: createdCategories
        });

        await workout.save();
        return {
            status: 200,
            message: "Workout created successfully",
            workout
        }; // Return the created workout object

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function fetchWorkout(workoutID = null, populate = false) {
    try {
        let query;

        if (workoutID) {
            // Fetch a specific workout by ID
            query = Workout.findById(workoutID);
        } else {
            // Fetch all workouts if no ID is provided
            query = Workout.find();
        }

        if (populate) {
            query = query.populate({
                path: 'categories',
                populate: {
                    path: 'exercises',
                }
            });
        }

        const workout = await query.exec();

        if (!workout) {
            return { message: 'Workout not found' };
        }

        return {
            status: 200,
            message: 'Workout fetched successfully',
            workout,
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function deleteWorkout(workoutID) {
    try {
        // Find the workout and populate categories and exercises
        const workout = await Workout.findById(workoutID).populate({
            path: 'categories',
            populate: {
                path: 'exercises',
            }
        });

        if (!workout) {
            return { status: 404, message: 'Workout not found' };
        }

        // Delete exercises associated with each category
        const exercisesToDelete = workout.categories.flatMap(category => category.exercises);
        await Exercise.deleteMany({ _id: { $in: exercisesToDelete } });

        // Delete categories
        await Category.deleteMany({ _id: { $in: workout.categories.map(category => category._id) } });

        // Delete the workout
        await Workout.findByIdAndDelete(workoutID);

        return { status: 200, message: 'Workout and related data deleted successfully' };
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}


async function createUserWorkout(userID, workoutID, populateWorkout, populateExercise) {
    try {

        const isExist = await UserWorkout.findOne({ user: userID, workout: workoutID });

        if (isExist) {
            return {
                status: 409,
                message: 'User has already started or completed this workout'
            };
        }

        // Validate the workout exists
        const workout = await Workout.findById(workoutID).populate(
            {
                path: 'categories',
                populate: {
                    path: 'exercises',
                }
            }
        );
        if (!workout) {
            return {
                status: 404,
                message: 'Workout not found'
            };
        }

        // Get exercises from the workout and create an initial UserWorkout entry
        const exercises = workout.categories.flatMap(category => category.exercises);
        const totalExercises = exercises.length;

        // Create UserWorkout entry
        const userWorkout = new UserWorkout({
            user: userID,
            workout: workoutID,
            exercises: exercises.map(ex => ({
                exercise: ex._id,
                completed: false,
            })),
            totalExercises
        });

        await userWorkout.save();

        if (populateExercise === 'true') {
            await userWorkout.populate("exercises.exercise");
        }

        if (populateWorkout === 'true') {
            await userWorkout.populate("workout");
        }

        return {
            status: 200,
            message: 'User workout created successfully',
            userWorkout
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}


async function readUserWorkout(userID, workoutID, populate = false) {
    try {
        const query = {
            user: userID
        }

        if (workoutID) {
            query.workout = workoutID
        }

        let userWorkout;

        if (populate === 'true') {
            userWorkout = await UserWorkout.find(query).populate("exercises.exercise")
        } else {
            userWorkout = await UserWorkout.find(query);
        }

        if (!userWorkout) {
            return {
                status: 404,
                message: 'User workout not found'
            };
        }

        return {
            status: 200,
            message: 'User workout fetched successfully',
            userWorkout
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}


async function updateExerciseCompletion(userID, workoutID, exerciseID, completed, completionDate, minutes) {
    try {
        // Find the UserWorkout entry
        const userWorkout = await UserWorkout.findOne({ user: userID, workout: workoutID });
        const workout = await Workout.findById(workoutID);

        if (!userWorkout) {
            return {
                status: 404,
                message: 'User workout not found'
            };
        }

        // Find the exercise in the user's workout
        const exercise = userWorkout.exercises.find(ex => ex.exercise.toString() === exerciseID.toString());

        if (!exercise) {
            return {
                status: 404,
                message: 'Exercise not found in user workout'
            };
        }

        // Update completion status
        exercise.completed = completed;
        exercise.completion_date = completed ? completionDate : null;

        // Update completed exercises count and completion percentage
        const completedExercises = userWorkout.exercises.filter(ex => ex.completed).length;
        const completionPercentage = (completedExercises / userWorkout.totalExercises) * 100;
        const calories = workout.average_calories_burned_per_minute * minutes;


        userWorkout.completedExercises = completedExercises;
        userWorkout.completionPercentage = completionPercentage;
        userWorkout.calories = calories;

        await userWorkout.save();

        return {
            status: 200,
            message: 'Exercise completion status updated successfully',
            userWorkout
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}


async function updateWorkoutImage(userID, workoutID, file) {
    try {
        const userWorkout = await UserWorkout.findOne({ user: userID, workout: workoutID });

        if (!userWorkout) {
            return {
                status: 400,
                message: "Workout Status not found in user Colletion"
            }
        }

        const dir = `users/${userID}/workout_images`;

        const url = await s3Interface.uploadToS3(file, dir);

        userWorkout.image = url;

        await userWorkout.save();

        return {
            status: 200,
            message: 'Exercise completion updated and image uploaded successfully',
            userWorkout
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

async function fetchAllExercises(workoutID) {
    try {
        const workout = await Workout.findById(workoutID).populate({
            path: 'categories',
            populate: {
                path: 'exercises',
            }
        });

        if(!workout) {
            return {
                status: 404,
                message: 'Workout not found'
            }
        }

        const data = {}

        workout.categories.forEach((cat) => {
            data[cat.sub_category] = cat.exercises;
        })

        return {
            status: 200,
            message: 'Exercises fetched successfully',
            data
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}



// Temporary functions for testing and client side development
// TODO: Need to remove this function and related APIs after use
async function updateCompletedCategories(userID, categoryID, fetchData) {
    try {
        let user = null;

        if (fetchData) {
            user = await User.findOne({ _id: userID });
        } else {
            user = await User.findOneAndUpdate(
                {
                    _id: userID
                },
                {
                    $push: { completedCategories: categoryID }
                },
                { new: true }
            );
        }

        if (!user) {
            return {
                staus: 400,
                message: 'User not found'
            }
        }

        return {
            status: 200,
            message: 'Completed Categories updated successfully',
            completedCategories: user.completedCategories
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}



module.exports = { createWorkout, fetchWorkout, deleteWorkout, fetchAllExercises, createUserWorkout, readUserWorkout, updateExerciseCompletion, updateWorkoutImage, updateCompletedCategories }