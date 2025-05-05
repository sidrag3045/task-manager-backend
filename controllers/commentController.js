const { Comment } = require('../models');

const createComment = async (req, res) => {
  const { body } = req.body;
  const { taskId } = req.params;
  if (!body) return res.status(400).json({ message: 'Comment body is required.' });
  try {
    const comment = await Comment.create({
      body,
      taskId,
      userId: req.userId
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const listComments = async (req, res) => {
  const { taskId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { taskId },
      order: [['createdAt', 'ASC']]
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createComment, listComments };
