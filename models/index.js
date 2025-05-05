const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');
const Team = require('./team');

// User-Task Associations (One-to-Many)
User.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assignedTo' });

// User-Team Associations (Many-to-Many)
User.belongsToMany(Team, { through: 'TeamMembers' });
Team.belongsToMany(User, { through: 'TeamMembers' });

// Task-Team Associations (One-to-Many)
Team.hasMany(Task, { foreignKey: 'teamId' });
Task.belongsTo(Team, { foreignKey: 'teamId' });

module.exports = { sequelize, User, Task, Team };
