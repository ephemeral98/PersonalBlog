// 用户 DAO
const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const Admin = sequelize.define('Admin', {
  loginId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  introduce: {
    type: DataTypes.TEXT('LONG'),
    allowNull: true,
  }
}, {
  createAt: true, // 创建一个 创建时间
  updateAt: true, // 创建一个 更新时间
  deleteAt: '已删除', // 显示假删除的文本
  paranoid: true, // 是否假删除
});
module.exports = Admin;
