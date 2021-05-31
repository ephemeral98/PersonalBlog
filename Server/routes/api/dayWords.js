// 每日一句接口：baseURL：localhost:2333/dayWords
const express = require('express');
const router = express.Router();
const sendMsg = require('../utils/getSendRes.js');
const DayWordsService = require('../../service/DayWordsService.js');

/**
 * 处理结果辅助函数
 * @param {*} res 返回结果
 * @param {String} successMsg 成功消息
 * @param {String} failMsg 失败消息
 */
function handleRes(res, result, successMsg, failMsg) {
  if (typeof (result) === "object") {
    res.send(sendMsg.getResult(result, successMsg));
  } else {
    res.send(sendMsg.getErr(result + failMsg));
  }
}

/**
 * 添加一句
 * @param {String} req.body.content 添加的内容
 */
router.post('/', async (req, res, next) => {
  if (!req.body.content) {
    res.send(sendMsg.getErr("内容不能为空"));
    return;
  }
  const result = await DayWordsService.addWords(req.body);
  handleRes(res, result, "添加成功", "添加失败");
});

/**
 * 批量删除
 * @param {Array} req.body.ids 要删除的id
 */
router.delete('/', async (req, res, next) => {
  const result = await DayWordsService.delManyWords(req.body.ids);
  handleRes(res, result, "批量删除成功", "批量删除失败");
});

/**
 * 查询所有句子
 */
router.get('/', async (req, res, next) => {
  const result = await DayWordsService.getAllWords();
  handleRes(res, result, "查询成功", "查询失败");
});

module.exports = router;
