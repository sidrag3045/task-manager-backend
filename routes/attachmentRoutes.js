const router = require('express').Router({ mergeParams: true });
const auth = require('../middleware/authMiddleware');
const { uploadAttachment, listAttachments } = require('../controllers/attachmentController');

router.use(auth);

router.post('/', uploadAttachment);    // POST   /api/tasks/:taskId/attachments
router.get('/',  listAttachments);     // GET    /api/tasks/:taskId/attachments

module.exports = router;
