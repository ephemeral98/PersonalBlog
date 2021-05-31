// 获取技能树等级接口
const express = require('express');
const router = express.Router();
const sendMsg = require('../utils/getSendRes');
const skillServer = require('../../service/SkillService.js');

// 获取所有技能等级
router.get('/', async (req, res, next) => {
  const mainSkills = await skillServer.getMainSkills();
  const exSkills = await skillServer.getExSkills();
  const resp = {
    mainSkills,
    exSkills
  }
  res.send(sendMsg.getResult(resp));
});

/**
 * 修改技能level
 * @param {*} id 
 * @param {String} level
 */
router.put('/', async (req, res, next) => {
  const resp = await skillServer.updateLevel(req.body);
  res.send(sendMsg.getResult(resp));
})

module.exports = router;
