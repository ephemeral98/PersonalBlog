// 评论，DAO
const sequelize = require('./db.js');
const { DataTypes } = require('sequelize');

const Issues = sequelize.define('Issues', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  place: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
}, {
  createdAt: false,
  updatedAt: false,
  deletedAt: '已删除!',
  paranoid: true,
});

module.exports = Issues;
