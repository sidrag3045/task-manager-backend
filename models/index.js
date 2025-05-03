const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');

// (We’ll add associations in Step 2)
module.exports = { sequelize, User, Task };
