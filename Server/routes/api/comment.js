// 评论管理接口：localhost:2333/comment
const express = require('express');
const { async } = require('validate.js');
const router = express.Router();
const validate = require('validate.js');
const CommentService = require('../../service/CommentService.js');
const sendMsg = require('../utils/getSendRes.js');

// 查看某文章下所有评论
router.get('/:blogId', async (req, res, next) => {
  const result = await CommentService.getAllComments(req.params.blogId);
  if (result) {
    res.send(sendMsg.getResult(result, '查找评论成功'));
  } else {
    res.send(sendMsg.handleFail('查找评论失败'));
  }
});

// 分段获取留言
router.get('/', async (req, res, next) => {
  const resp = await CommentService.getCommentArea(req.query);
  if (typeof (resp) !== "string") {
    res.send(sendMsg.getResult(resp, "分段获取留言成功"));
  } else {
    res.send(sendMsg.getErr(resp + "分段获取留言失败"))
  }
});

// 添加评论
router.post('/', async (req, res, next) => {
  const { content, blogId, limit, start } = req.body;
  if (!content) {
    res.send(sendMsg.getErr("内容不能为空"));
    return;
  }

  if(content.length > 300) {
    res.send(sendMsg.getErr("不能超过300字"));
    return;
  }

  const resp = await CommentService.submitComment(req.body);
  if (typeof (resp) !== "string") {
    // 重新获取评论列表
    const getCommentResp = await CommentService.getCommentArea({blogId, limit, start});
    res.send(sendMsg.getResult(getCommentResp, "添加评论成功"));

  } else {
    res.send(sendMsg.getErr(resp + "添加评论失败"))
  }
});

// 删除单个评论
router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.send(sendMsg.getErr("请选择一个评论"));
    return;
  }

  const resp = await CommentService.delComment(id);
  if (resp === 1) {
    res.send(sendMsg.getResult(resp, "删除评论成功"));
  } else {
    res.send(sendMsg.getErr(resp, +"删除评论失败"));
  }
});

// 批量删除评论
router.delete('/many', async (req, res, next) => {
  const { ids } = req.body;
  const resp = await CommentService.delManyComments(ids);
  if(resp === 1) {
    res.send(sendMsg.getResult(resp, "批量删除评论成功"));
  } else {
    res.send(sendMsg.getErr(resp + "批量删除失败"));
  }
})

module.exports = router;
