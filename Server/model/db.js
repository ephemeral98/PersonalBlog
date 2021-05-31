const { Sequelize } = require('sequelize');
/* const sequelize = new Sequelize('myblog', 'root', 'Gzq_2722612', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  // logging: null,  // 不再记录日志
}); */
const sequelize = new Sequelize('my_blog', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3308',
  // logging: null,  // 不再记录日志
});

module.exports = sequelize;
