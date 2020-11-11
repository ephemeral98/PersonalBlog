// 文章分类接口：baseURL：localhost:4399/categories
const express = require('express');
const router = express.Router();
const sendMsg = require('../utils/getSendRes');
const CategoryService = require('../../service/CategoryService.js');
const { async } = require('validate.js');

/**
 * 处理结果的辅助函数
 * @param {*} result 处理的结果
 * @param {*} res 请求结果
 * @param {*} successMsg 成功的消息
 * @param {*} failMsg 失败的消息
 */
function handleResult(result, res, successMsg, failMsg) {
  if (Object.prototype.toString.call(result) === "[object Object]") {
    res.send(sendMsg.getResult(result, successMsg));
  } else {
    const resMsg = typeof (result) == "string" ? result + failMsg : failMsg;
    res.send(sendMsg.handleFail(resMsg));
  }
}

/**
 * 查询某用户下的 所有分类
 * @param {*} loginId 用户ID
 */
router.get('/:loginId', async (req, res, next) => {
  console.log(req.params.loginId);
  const result = await CategoryService.getAllKind(req.params.loginId); // 获取动态路由那个 loginId
  handleResult(result, res, "查询所有分类成功！", "查询所有分类失败");
});

/** 新增分类
 * @param {*} req.body.loginId 用户ID
 * @param {*} req.body.name 新分类名称
 */
router.post('/', async (req, res, next) => {
  // 先判断需要的数据是否齐全
  if (!Object.keys(req.body).includes("name") || !req.body.name) {
    res.send(sendMsg.getErr("请输入新增分类的名字"));
  }
  // 在新增之前先找一下看是否已存在
  const exist = await CategoryService.getIsExist(req.body);
  if (exist) {
    res.send(sendMsg.getErr("该分类已经存在了"));
  }
  else {
    const result = await CategoryService.addKind(req.body);
    handleResult(result, res, "新增分类成功！", "新增分类失败");
  }
});

/**
 * 修改分类名字
 * @param {*} req.body.loginId 用户ID
 * @param {*} req.body.oldName 之前分类名称
 * @param {*} req.body.newName 新的名称
 */
router.put('/', async (req, res, next) => {
  // 先确定是否输入新旧了名字
  if (!Object.keys(req.body).includes("oldName") || !req.body.oldName) {
    res.send(sendMsg.getErr("请先选择要修改的分类"));
  } else if (!Object.keys(req.body).includes("newName") || !req.body.newName) {
    res.send(sendMsg.getErr("请输入新名字"));
  }

  // 判断有没有传loginId
  if (req.body.loginId === undefined) {
    res.send(sendMsg.getErr("loginId不存在！"));
    return;
  }

  // 判断名字是否存在
  const exist = await CategoryService.getIsExist(req.body);
  if (!exist) {
    res.send(sendMsg.getErr("该分类不存在"));
  }
  else {
    const result = await CategoryService.updateKind(req.body);
    handleResult(result, res, "修改分类成功！", "修改分类失败");
  }
});

// 删除分类
router.delete('/', async (req, res, next) => {
  if (!req.body.name) {
    res.send(sendMsg.getErr("请先选择要删除的分类"));
    return;
  }
  if (!req.body.loginId) {
    res.send(sendMsg.getErr("loginId不存在"));
    return;
  }

  // 判断名字是否存在
  const exist = await CategoryService.getIsExist(req.body);
  if (!exist) {
    res.send(sendMsg.getErr("该分类不存在"));
    return;
  }

  else {
    const result = await CategoryService.delKind(req.body);
    handleResult(result, res, "删除分类成功！", "删除分类失败");
  }
});


module.exports = router;
