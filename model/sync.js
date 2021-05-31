// 集中创建
require('./Article.js');
require('./Issues.js');
require('./Category.js');
require('./Admin.js');
require('./reComment.js');

const sequelize = require('./db.js');

(async () => {
  await sequelize.sync({
    alter: true,
  });
  console.log('数据库创建成功！');
})();
