// 评论，DAO
const sequelize = require('./db.js');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('comments', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  place: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  blogId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  toWho: {
    type: DataTypes.STRING,
    allowNull: true,
  }


}, {
  createdAt: true,
  updatedAt: true,
  deletedAt: '已删除!',
  paranoid: true,
});

module.exports = Comment;
