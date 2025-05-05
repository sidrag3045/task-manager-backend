const { Task } = require('../models');
const { Op } = require('sequelize');

// Create a new task
const createTask = async (req, res) => {
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
const listTasks = async (req, res) => {
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

// Get a single task by ID
const getTask = async (req, res) => {
    try {
      const task = await Task.findOne({
        where: { id: req.params.id, assignedTo: req.userId }
      });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Update a task
const updateTask = async (req, res) => {
    try {
      const task = await Task.findOne({
        where: { id: req.params.id, assignedTo: req.userId }
      });
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      const { title, description, dueDate, status, assignedTo } = req.body;
      if (title !== undefined)       task.title       = title;
      if (description !== undefined) task.description = description;
      if (dueDate !== undefined)     task.dueDate     = dueDate;
      if (status !== undefined)      task.status      = status;
      if (assignedTo !== undefined)  task.assignedTo  = assignedTo;
  
      await task.save();
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };  

// Delete a task
const deleteTask = async (req, res) => {
    try {
      const task = await Task.findOne({
        where: { id: req.params.id, assignedTo: req.userId }
      });
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      await task.destroy();
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Export all handlers at once
module.exports = {
    createTask,
    listTasks,
    getTask,
    updateTask,
    deleteTask,
  };
