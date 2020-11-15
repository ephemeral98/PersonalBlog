const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('my_blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3308',
  // logging: null,  // 不再记录日志
});

module.exports = sequelize;
