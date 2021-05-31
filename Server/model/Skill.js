// 技能树
const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const Skill = sequelize.define('skills', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ex: {
    type: DataTypes.INTEGER,
  }
}, {
  createAt: true, // 创建一个 创建时间
  updateAt: true, // 创建一个 更新时间
  deleteAt: '已删除', // 显示假删除的文本
  paranoid: true, // 是否假删除
});
module.exports = Skill;
