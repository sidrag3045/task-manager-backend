const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createTask, listTasks /*…*/ } = require('../controllers/taskController');

router.use(auth);         // protect all task routes
router.post('/', createTask);
router.get('/', listTasks);
// …other CRUD routes

module.exports = router;
