const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');

// Defining Associations
User.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assignedTo' });

module.exports = { sequelize, User, Task };
