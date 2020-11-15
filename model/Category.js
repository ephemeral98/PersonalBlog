// 分类，DAO
const sequelize = require('./db.js');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  loginId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Category;
