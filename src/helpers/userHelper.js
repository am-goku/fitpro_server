const mongoose = require("mongoose");
const User = require("../models/User");


async function updateProfile(userID, userData) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findOne({_id: userID}).select("-password");

        if(!user) throw new Error("User not found");

        for(const key in userData){
            if(userData.hasOwnProperty(key)){
                user[key] = userData[key];
            }
        }

        await user.save({session});

        await session.commitTransaction();
        session.endSession();

        return {status: 200, user}

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return Promise.reject({status: 500, message: error.message});
    }
}









module.exports = {updateProfile}