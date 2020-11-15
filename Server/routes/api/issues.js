// 评论管理接口
const express = require('express');
const router = express.Router();
const validate = require('validate.js');
const IssueService = require('../../service/IssueService.js');
const sendMsg = require('../utils/getSendRes.js');

// 查看某文章下所有评论
router.post('/', async (req, res, next) => {
  const result = await IssueService.getAllIssues();
  if (result) {
    res.send(sendMsg.getResult(result, '查找评论成功'));
  } else {
    res.send(sendMsg.handleFail('查找评论失败'));
  }
});

module.exports = router;
