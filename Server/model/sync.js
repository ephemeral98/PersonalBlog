// 集中创建
require('./Admin.js');
require('./Article.js');
require('./Category.js');
require('./Comment.js');
require('./DayWords.js');
// require('./reComment.js');
// require('./Guestbook.js');
// require('./reGuestbook.js');

const sequelize = require('./db.js');

(async () => {
  await sequelize.sync({
    alter: true,
    logging:false
  });
  console.log('数据库创建成功！');
})();
