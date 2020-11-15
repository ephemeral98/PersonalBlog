const Admins = require('./Admin.js');
const Categories = require('./Category.js');
const Article = require('./Article.js');
const Issues = require('./Issues.js');
const reComment = require('./reComment.js');

// 建立关系

// 一个用户有多个文章分类（一对多）
Admins.hasMany(Categories, {
  foreignKey: 'loginId'
});
Categories.belongsTo(Admins);

// 一个用户有多个文章（一对多）
Admins.hasMany(Article, {
  foreignKey: 'loginId'
});
Article.belongsTo(Admins);

// 一个分类有多个文章，（一对多）
Categories.hasMany(Article, {
  sourceKey: 'name',
  foreignKey: 'categoryName'
});
Article.belongsTo(Categories);

// 一篇文章有多条评论，（一对多）
Article.hasMany(Issues, {
  foreignKey: 'IssuesId'
});
Issues.belongsTo(Article);

// 一个评论有多个回复，（一对多）
Issues.hasMany(reComment, {
  foreignKey: 'reCommentId'
});
reComment.belongsTo(Issues);
