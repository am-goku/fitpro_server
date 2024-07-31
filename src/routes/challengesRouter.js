const { Router } = require('express');
const { userProtect } = require('../middleware/authMiddleware');
const {
    create_task, fetch_task,
    update_task, updateProgress,
    delete_task, create_challenge,
    fetch_challenges, update_challenge,
    activate_challenge, delete_challenge
} = require('../controllers/challengeController');

const router = new Router();

router.use(userProtect)


router.post('/', create_challenge)

router.get('/', fetch_challenges)

router.put('/:challengeID', update_challenge)

router.patch('/:challengeID/activate', activate_challenge)

router.delete('/:challengeID', delete_challenge)


router.post('/task', create_task)

router.get('/task', fetch_task)

router.put('/task/:taskID', update_task)

router.patch('/task/:taskID', updateProgress)

router.delete('/task/:taskID', delete_task)


module.exports = router;