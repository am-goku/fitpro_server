const { imageUpload } = require("../helpers/ImageHelper");
const responseHandler = require("../utils/responseHandler");

async function uploadNewFile(req, res) {
    try {
        const files = req.files;

        const data = await imageUpload(files);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler({status: 500, message: error.message});
    }
}


module.exports = { uploadNewFile }