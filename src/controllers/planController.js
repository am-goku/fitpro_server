const { createPlan, createWeekPlan, createDayPlan, createExercise } = require("../helpers/workoutPlanHelper");
const responseHandler = require("../utils/responseHandler");


async function createWorkoutPlan(req, res) {
    try {
        const body = req.body;

        if (!body) return responseHandler(res, { status: 400, message: "Invalid request body" });

        const data = await createPlan(body);

        return responseHandler(res, data)

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}

async function createWeeklyPlan(req, res) {
    try {
        const {weekNumber, planID} = req.body;

        console.log(planID, weekNumber);

        if(!weekNumber || !planID) return responseHandler(res, { status:400, message: "Invalid request body or plan ID"});

        const data = await createWeekPlan(weekNumber, planID);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}

async function createDailyPlan(req, res) {
    try {
        
        const body = req.body;

        if(!body) return responseHandler(res, {status: 400, message: "Invalid request body"});

        const data = await createDayPlan(body)

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}

async function createNewExercise(req, res) {
    try {
        const body = req.body;

        if(!body) return responseHandler(res, {status: 400, message: "Invalid request body"});

        console.log('====================================');
        console.log(req.body);
        console.log('====================================');

        const data = await createExercise(body);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data);
    }
}


module.exports = { createWorkoutPlan, createWeeklyPlan, createDailyPlan, createNewExercise }