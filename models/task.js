const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  // fields added in Step 2
});

module.exports = Task;
