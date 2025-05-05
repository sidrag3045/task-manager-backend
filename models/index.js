const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');
const Team = require('./team');
const Comment   = require('./comment');
const Attachment = require('./attachment');

// User-Task Associations (One-to-Many)
User.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assignedTo' });

// User-Team Associations (Many-to-Many)
User.belongsToMany(Team, { through: 'TeamMembers' });
Team.belongsToMany(User, { through: 'TeamMembers' });

// Task-Team Associations (One-to-Many)
Team.hasMany(Task, { foreignKey: 'teamId' });
Task.belongsTo(Team, { foreignKey: 'teamId' });

// Comment associations (One-to-Many)
Task.hasMany(Comment, { foreignKey: 'taskId', onDelete: 'CASCADE' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Task–Attachment (1:M)
Task.hasMany(Attachment, { foreignKey: 'taskId', onDelete: 'CASCADE' });
Attachment.belongsTo(Task, { foreignKey: 'taskId' });

// User–Attachment (1:M)
User.hasMany(Attachment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Attachment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Task, Team, Comment, Attachment };
