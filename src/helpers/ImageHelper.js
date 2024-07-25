const s3Interface = require("../service/s3Interface");

async function imageUpload(files) {
    try {
        const uploadPromises = [];

        if (files.file.length) {
            const dir = 'workoutPlan';
            uploadPromises.push(s3Interface.uploadToS3(files.file[0], dir));
        }

        const urls = await Promise.all(uploadPromises);

        return {
            status: 200,
            message: "Image uploaded successfully",
            url: urls[0]
        }

    } catch (error) {
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}


module.exports = { imageUpload }