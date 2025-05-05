const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
  // Timestamps (createdAt/updatedAt) are automatic
});

module.exports = Comment;
