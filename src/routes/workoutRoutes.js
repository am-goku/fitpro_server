const { Router } = require('express');
const { userProtect } = require('../middleware/authMiddleware');
const { selectPlan, updateProgress, fetchProgress } = require('../controllers/workoutController');
const router = Router();



router.post('/select-plan/:planID', userProtect, selectPlan)

router.put('/update-progress/:exerciseID', userProtect, updateProgress)

router.get('/', userProtect, fetchProgress);




module.exports = router