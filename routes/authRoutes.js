const router = require('express').Router();
const { signup, login, getMe, updateMe } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);

module.exports = router;
