// 单个文章接口：baseURL：localhost:2333/articles
const express = require('express');
const router = express.Router();
const ArticleService = require('../../service/ArticleService.js');
const sendMsg = require('../utils/getSendRes.js');

// 查询所有文章
router.get('/', async (req, res, next) => {
  const resp = await ArticleService.getAllArticle();
  if (resp) {
    res.send(sendMsg.getResult(resp, "查询所有文章成功"));
  }
});

// 分页查询文章
router.get('/page', async (req, res, next) => {
  const { page, limit } = req.query;
  const resp = await ArticleService.getAllArticleLimit(page, limit);
  if (resp) {
    res.send(sendMsg.getResult(resp, "分页查询文章成功"));
  }
});

/**
 * 查询某分类下、的所有文章
 * @param {*} req.body.id 分类id
 */
router.get('/:id', async (req, res, next) => {
  const result = await ArticleService.getArticleByKind(req.params.id);
  if (result) {
    res.send(sendMsg.getResult(result, '查询分类文章成功'));
  } else {
    res.send(sendMsg.handleFail('查询分类文章失败'));
  }
});

/**
 * 分段查询某分类下、的所有文章
 * @param {*} id 分类id
 * @param {*} start 第几次加载
 * @param {*} limit 每次加载多少条
 */
router.get('/section/:id', async (req, res, next) => {
  const result = await ArticleService.getArtByKindSection(req.params.id, req.query);
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
    if (addRes instanceof Object) {
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
/* router.get('/:categoryName/:title', async (req, res, next) => {
  const resp = await ArticleService.getArticleByTitle(req.params);
  if (resp !== 'string') {
    res.send(sendMsg.getResult(resp, '查询文章成功'));
  } else {
    res.send(sendMsg.handleFail(resp + '查询文章失败'));
  }
}); */

// 文章点赞
router.post('/article/like', async (req, res, next) => {
  const resp = await ArticleService.addLike(req.body.id);
  if (resp[0] === 1) {
    res.send(sendMsg.getResult(resp, "点赞成功"));
  } else {
    res.send(sendMsg.getErr(resp + "点赞失败"));
  }
});

// 文章阅读量+1
router.post('/article/readings', async (req, res, next) => {
  const resp = await ArticleService.addReadings(req.body.id);
  if (resp[0] === 1) {
    res.send(sendMsg.getResult(resp, '阅读量 + 1 成功'));
  } else {
    res.send(sendMsg.getErr(resp + "阅读量 + 1 失败"));
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
