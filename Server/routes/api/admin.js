// 用户管理接口
const express = require('express');
const { async } = require('validate.js');
const router = express.Router();
const AdminService = require('../../service/AdminService.js');
const sendMsg = require('../utils/getSendRes.js');
const jwt = require('../utils/jwt.js');
const { changeAdmin } = require('../utils/changeAdminHelper.js');

// 登录
router.post('/login', async (req, res, next) => {
  const result = await AdminService.login(req.body.loginId, req.body.password);
  if (result) { // 验证通过
    console.log('登录成功！');

    // 发一个jwt令牌，证明我已经登录了
    jwt.publish(res, undefined, { id: result.loginId });

    res.send(sendMsg.getResult(result, '登录成功'));
  } else {
    console.log('登录失败啊！');
    res.send(sendMsg.handleFail('登录失败'));
  }
});

// 注册
router.post('/register', async (req, res, next) => {
  const result = await AdminService.register(req.body);
  if (typeof (result) === 'string') { // 种种原因导致注册失败
    res.send(sendMsg.handleFail(result));
  } else {
    res.send(sendMsg.getResult(result, '注册成功'));
  }
});

// 获取个人信息
router.get('/whoami', async (req, res, next) => {
  const result = await AdminService.getAdmin(req.adminId);
  res.send(sendMsg.getResult(result));
});

// 修改密码
router.put('/safe', async (req, res, next) => {
  await changeAdmin(req, res, next, 'updatedPwd');
});

// 修改昵称、个性签名
router.put('/info', async (req, res, next) => {
  await changeAdmin(req, res, next, 'updateInfo');
});

// 修改个人介绍
router.put('/info/introduce', async (req, res, next) => {
  await changeAdmin(req, res, next, 'updateIntroduce');
});




module.exports = router;
