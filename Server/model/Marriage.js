const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const Marriage = sequelize.define('marriages', {
  me: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  tag: {
    type: DataTypes.STRING
  }
}, {
  createdAt: true,
  updatedAt: true,
  deletedAt: "已删除",
  paranoid: true,
});

module.exports = Marriage;
