// 单个文章接口：baseURL：localhost:4399/articles
const express = require('express');
const router = express.Router();
const ArticleService = require('../../service/ArticleService.js');
const sendMsg = require('../utils/getSendRes.js');

/** 查询某用户、某分类下、的所有文章
 * @param {*} req.body.loginId 用户ID
 * @param {*} req.body.title 分类名称
 */
router.get('/', async (req, res, next) => {
  // 先判断需要的数据是否齐全
  if (!Object.keys(req.body).includes("kindName") || !req.body.kindName) {
    res.send(sendMsg.getErr("请输入新增分类的名字"));
    return;
  }
  // 判断有没有传loginId
  if (req.body.loginId === undefined) {
    res.send(sendMsg.getErr("loginId不存在！"));
    return;
  }

  const result = await ArticleService.getArticleByKind(req.body);
  if (result) {
    res.send(sendMsg.getResult(result, '查询分类文章成功'));
  } else {
    res.send(sendMsg.handleFail('查询分类文章失败'));
  }
});

// 删除某用户、某分类下、某文章（删除一篇文章）
router.delete('/', async (req, res, next) => {
  const result = await ArticleService.delArticle(req.body.id);
  if (result === 1) {
    res.send(sendMsg.getResult(result, '删除文章成功'));
  } else {
    res.send(sendMsg.handleFail(result + '删除文章失败。'));
  }
});

// 文章的发布更新（增加 or 修改一篇文章）
router.post('/', async (req, res, next) => {
  const exist = req.body.id;
  if (exist) { // 改文章已经存在，需要做的是 修改
    // 修改 的原理是将原来的删除，再加一篇进去
    const delRes = await ArticleService.delArticle(req.body.id);
    if (delRes === 1) { // 删除成功
      req.body.id = undefined; // 不然会和已存在的id冲突。
      const UpdateRes = await ArticleService.addArticle(req.body);
      if (UpdateRes) {
        res.send(sendMsg.getResult(result, '修改文章成功'));
      } else {
        res.send(sendMsg.handleFail(result + '修改文章失败'));
      }
    }
  } else { // 文章不存在，需要做的是 增加
    const addRes = await ArticleService.addArticle(req.body);
    // 正常是返回一个对象才算成功的
    if (Object.prototype.toString.call(addRes) == "[object Object]") {
      res.send(sendMsg.getResult(addRes, '添加文章成功'));
    } else {
      res.send(sendMsg.handleFail(addRes + '添加文章失败'));
    }
  }


});

// 修改一篇文章信息（暂不需要）
/* router.put('/', async (req, res, next) => {
  const result = await ArticleService.updateArticle(req.body);
  if(result) {
    res.send(sendMsg.getResult(result, '修改文章成功'));
  } else {
    res.send(sendMsg.handleFail(result + '修改文章失败'));
  }
}); */

// 查询文章所有细节（查询一篇文章）（不包括评论区）
router.get('/:id', async (req, res, next) => {
  const result = await ArticleService.getArticleById(req.params.id);
  if (result) {
    res.send(sendMsg.getResult(result, '查找文章成功'));
  } else {
    res.send(sendMsg.handleFail(result + '查询文章失败'));
  }
})


module.exports = router;
