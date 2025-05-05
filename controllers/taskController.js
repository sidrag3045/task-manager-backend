const { Task } = require('../models');
const { Op } = require('sequelize');

// Create a new task
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

// Get all tasks for the logged-in user
exports.listTasks = async (req, res) => {
  const { status, search, sortBy = 'createdAt', order = 'ASC' } = req.query;
  const where = { assignedTo: req.userId };
  if (status) where.status = status;
  if (search) {
    where[Op.or] = [
      { title:   { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ];
  }
  try {
    const tasks = await Task.findAll({
      where,
      order: [[sortBy, order.toUpperCase()]]
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTask = (req, res) => res.send('Get task not implemented');
exports.updateTask = (req, res) => res.send('Update task not implemented');
exports.deleteTask = (req, res) => res.send('Delete task not implemented');