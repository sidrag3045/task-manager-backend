const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Defining the Task model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  dueDate: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM('open','completed'),
    defaultValue: 'open'
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

// Exporting the Task model
module.exports = Task;
