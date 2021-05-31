// 获取留言接口 baseURL：localhost:2333/marriage
const express = require('express');
const router = express.Router();
const sendMsg = require('../utils/getSendRes.js');
const MarriageService = require('../../service/MarriageService.js');
const { confession, toEmail } = require('../utils/sendEmail.js');

/**
 * 发送邮件
 * @param {String} me 我的邮箱
 * @param {String} ta Ta的邮箱
 * @param {taName} ta Ta的称呼
 * @param {taName} talkAbout 信的内容
 * @returns
 */
router.post('/', async (req, res, next) => {
  if (!req.body.me) {
    res.send(sendMsg.handleFail('请填写你的联系方式'))
    return;
  }
  if (!req.body.ta) {
    res.send(sendMsg.handleFail('请填写TA的联系方式'))
    return;
  }
  const me = toEmail(req.body.me);
  const ta = toEmail(req.body.ta);
  req.body = {
    ...req.body,
    me,
    ta,
  }
  const canSend = (me && ta); // 是否可以发邮箱（邮箱格式是否正确）
  if (!canSend) {
    res.send(sendMsg.handleFail('你填写的QQ或邮箱格式有问题！'));
    return;
  }

  // QQ或者邮箱正常，可以进一步操作和发邮箱了
  const resp = await MarriageService.matchUser(req.body);
  if (resp === 1) {
    // 双方发邮件
    confession(req, res, true);
  } else {
    // 匹配不到有情人
    await MarriageService.cameHere(req.body);
    // 给TA发邮件
    confession(req, res, false);
  }
})

module.exports = router;
