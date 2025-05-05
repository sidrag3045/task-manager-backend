const multer  = require('multer');
const path    = require('path');
const { Attachment } = require('../models');

// Configure storage (in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

const uploadAttachment = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
    try {
      const { filename, mimetype, size } = req.file;
      const url = `/uploads/${filename}`; // serve statically
      const attachment = await Attachment.create({
        filename, mimetype, size, url,
        taskId: req.params.taskId,
        userId:  req.userId
      });
      res.status(201).json(attachment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

const listAttachments = async (req, res) => {
  try {
    const atts = await Attachment.findAll({
      where: { taskId: req.params.taskId },
      order: [['createdAt','ASC']]
    });
    res.json(atts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadAttachment, listAttachments };
