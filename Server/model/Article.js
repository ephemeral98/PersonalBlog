// 文章，DAO
const sequelize = require('./db.js');
const { DataTypes } = require('sequelize');

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  introduce: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT('LONG'),
    allowNull: true,
  },
  wordsNum: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  readNum: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  likeNum:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  toTop: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  face:{
    type: DataTypes.STRING,
    allowNull:true,
  }
}, {
  createAt: true, // 创建一个 创建时间
  updateAt: true, // 创建一个 更新时间
  deleteAt: '已删除', // 显示假删除的文本
  paranoid: true, // 是否假删除
});

module.exports = Article;
