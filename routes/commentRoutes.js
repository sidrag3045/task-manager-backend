const router = require('express').Router({ mergeParams: true });
const auth = require('../middleware/authMiddleware');
const { createComment, listComments } = require('../controllers/commentController');

router.use(auth);

router.post('/', createComment);  
router.get('/', listComments); 

module.exports = router;
