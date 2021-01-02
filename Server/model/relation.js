const Admins = require('./Admin.js');
const Categories = require('./Category.js');
const Article = require('./Article.js');
const Comment = require('./Comment.js');
// const reComment = require('./reComment.js');
// const Guestbook = require('./Guestbook.js');
// const reGuestbook = require('./reGuestbook.js');

// 建立关系

// 一个用户有多个文章分类（一对多）
/* Admins.hasMany(Categories, {
  foreignKey: 'loginId'
});
Categories.belongsTo(Admins); */

// 一个用户有多个文章（一对多）
/* Admins.hasMany(Article, {
  foreignKey: 'loginId'
});
Article.belongsTo(Admins); */

// 一个分类有多个文章，（一对多）
Categories.hasMany(Article);
Article.belongsTo(Categories);

// 一篇文章可以有多条评论，（一对多）
/* Article.hasMany(Comment, {
  foreignKey: 'CommentId'
});
Comment.belongsTo(Article); */

// 一个文章评论有多个回复，（一对多）
/* Comment.hasMany(reComment, {
  foreignKey: 'reCommentId'
});
reComment.belongsTo(Comment); */

// 一个留言板评论有多个回复，（一对多）
/* Guestbook.hasMany(reGuestbook, {
  foreignKey: 'reGuestbookId'
})
reGuestbook.belongsTo(Guestbook); */


