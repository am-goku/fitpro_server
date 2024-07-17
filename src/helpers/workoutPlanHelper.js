const DayPlan = require("../models/DayPlan");
const Exercise = require("../models/Exercise");
const WeekPlan = require("../models/WeekPlan");
const WorkoutPlan = require("../models/WorkoutPlan");

async function createPlan(body) {
    try {
        // Validate body content here if needed

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

async function createWeekPlan(body, planID) {
    try {
        // Validate body content here if needed

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


async function createDayPlan({weekID, ...body}) {
    try {
        const weekPlan = await WeekPlan.findById(weekID);

        if(!weekPlan) return {status: 400, message: "Invalid weekPlan ID"};

        const newDayPlan = new DayPlan({...body, weekPlanID: weekPlan._id });

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


async function createExercise({dayID, ...body}){
    try {
        const dayPlan = await DayPlan.findById(dayID);

        if(!dayPlan) return {status: 400, message: "Invalid dayPlan ID"};

        const newExercise = new Exercise({...body, dayPlanID: dayPlan._id});

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
