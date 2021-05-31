// 分类，DAO
const sequelize = require('./db.js');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  createAt: true, // 创建一个 创建时间
  updateAt: true, // 创建一个 更新时间
  deleteAt: '已删除', // 显示假删除的文本
  paranoid: true, // 是否假删除
});

module.exports = Category;
