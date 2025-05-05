const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createTask, listTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');

//verifying and authorizing the user
router.use(auth);

router.post('/', createTask);
router.get('/', listTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
