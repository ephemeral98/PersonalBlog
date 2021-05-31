// 获取留言接口 baseURL：localhost:2333/guestbook
const express = require('express');
const router = express.Router();
const sendMsg = require('../utils/getSendRes');
const guestbookServer = require('../../service/GuestbookService.js');

// 分段获取留言
router.get('/', async (req, res, next) => {
  const resp = await guestbookServer.getGuestArea(req.query);
  if (typeof (resp) !== "string") {
    res.send(sendMsg.getResult(resp, "分段获取留言成功"));
  } else {
    res.send(sendMsg.getErr(resp + "分段获取留言失败"))
  }
});

module.exports = router;
