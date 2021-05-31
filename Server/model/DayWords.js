const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const DayWords = sequelize.define('dayWords', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  createdAt: true,
  updatedAt: true,
  deletedAt: "已删除",
  paranoid: true,
});

module.exports = DayWords;
