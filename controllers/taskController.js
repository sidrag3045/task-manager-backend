const { Task } = require('../models');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required.' });
  }
  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo: assignedTo || req.userId
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listTasks = (req, res) => res.send('List tasks not implemented');
exports.getTask = (req, res) => res.send('Get task not implemented');
exports.updateTask = (req, res) => res.send('Update task not implemented');
exports.deleteTask = (req, res) => res.send('Delete task not implemented');