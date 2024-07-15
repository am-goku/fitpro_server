const { updateProfile } = require("../helpers/userHelper");
const responseHandler = require("../utils/responseHandler");


async function updateUserProfile(req, res) {
    try {
        
        const userData = req.body;
        const userID = req.userID;

        delete userData.email;
        delete userData.password;

        const data = await updateProfile(userID, userData);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}



module.exports = {updateUserProfile}