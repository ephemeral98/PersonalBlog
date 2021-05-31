// 单个文章接口：baseURL：localhost:4399/articles
const express = require('express');
const router = express.Router();
const ArticleService = require('../../service/ArticleService.js');
const sendMsg = require('../utils/getSendRes.js');

/** 查询某分类下、的所有文章
 * @param {*} req.body.loginId 用户ID
 * @param {*} req.body.title 分类名称
 */
router.get('/:kindName', async (req, res, next) => {
  // 先判断需要的数据是否齐全
  if (!req.params.kindName) {
    res.send(sendMsg.getErr("请输入分类的名字"));
    return;
  }
  const result = await ArticleService.getArticleByKind(req.params);
  if (result) {
    res.send(sendMsg.getResult(result, '查询分类文章成功'));
  } else {
    res.send(sendMsg.handleFail('查询分类文章失败'));
  }
});

// 删除某用户、某分类下、某文章（批量删除文章）
router.delete('/', async (req, res, next) => {
  const result = await ArticleService.delArticle(req.body.ids);
  if (result === 1) {
    res.send(sendMsg.getResult(result, '删除文章成功'));
  } else {
    res.send(sendMsg.handleFail(result + '删除文章失败。'));
  }
});

// 文章的发布更新（增加 or 修改一篇文章）
router.post('/', async (req, res, next) => {
  if (!req.body.loginId) {
    return "loginId 不能为空";
  }

  const exist = req.body.id;
  if (exist) { // 该文章已经存在，需要做的是 修改
    const alterArtRes = await ArticleService.updateArticle(req.body);
    if (alterArtRes[0] === 1) { // 删除成功
      res.send(sendMsg.getResult(alterArtRes, '修改文章成功'));
    } else {
      res.send(sendMsg.handleFail(alterArtRes + '修改文章失败'));
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

// 根据id查询文章所有细节（查询一篇文章）（不包括评论区）
router.get('/detail/:id', async (req, res, next) => {
  const result = await ArticleService.getArticleById(req.params.id);
  if (result) {
    res.send(sendMsg.getResult(result, '查找文章成功'));
  } else {
    res.send(sendMsg.handleFail(result + '查询文章失败'));
  }
})

// 根据标题查询文章
router.get('/:categoryName/:title', async (req, res, next) => {
  const resp = await ArticleService.getArticleByTitle(req.params);
  if (resp !== 'string') {
    res.send(sendMsg.getResult(resp, '查询文章成功'));
  } else {
    res.send(sendMsg.handleFail(resp + '查询文章失败'));
  }
})

// 修改一篇文章信息（暂不需要）
/* router.put('/', async (req, res, next) => {
  const result = await ArticleService.updateArticle(req.body);
  if(result) {
    res.send(sendMsg.getResult(result, '修改文章成功'));
  } else {
    res.send(sendMsg.handleFail(result + '修改文章失败'));
  }
}); */




module.exports = router;
