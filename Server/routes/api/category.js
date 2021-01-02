// 文章分类接口：baseURL：localhost:2333/categories
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
  if (result instanceof Object) {
    res.send(sendMsg.getResult(result, successMsg));
  } else {
    const resMsg = typeof (result) == "string" ? result + failMsg : failMsg;
    res.send(sendMsg.handleFail(resMsg));
  }
}

/**
 * 查询某用户下的 所有分类
 */
router.get('/', async (req, res, next) => {
  const result = await CategoryService.getAllKind();
  handleResult(result, res, "查询所有分类成功！", "查询所有分类失败");
});

/**
 *  获取所有分类对应的文章数量
 */
router.get('/count', async (req, res, next) => {
  const resp = await CategoryService.getAllCount();
  handleResult(resp, res, "获取分类下文章成功！", "获取分类下文章失败")
});

/**
 *  获取该分类的 文章数量
 *  @param {*} req.body.id 分类id
 */
router.get('/count/:id', async (req, res, next) => {
  const resp = await CategoryService.getCount(req.params.id);
  res.send(sendMsg.getResult(resp, "获取分类文章总数成功！"));
});


/** 新增分类
 * @param {*} req.body.name 新分类名称
 */
router.post('/', async (req, res, next) => {
  // 先判断需要的数据是否齐全
  if (!Object.keys(req.body).includes("name") || !req.body.name) {
    res.send(sendMsg.getErr("请输入新增分类的名字"));
  }
  // 在新增之前先找一下看是否已存在
  const exist = await CategoryService.getIsExist(req.body.name);
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

  // 判断被名字是否存在
  const picked = await CategoryService.getIsExist(req.body.oldName);
  if (!picked) {
    res.send(sendMsg.getErr("请选择分类"));
    return;
  }

  // 判断新名字是否存在
  const exist = await CategoryService.getIsExist(req.body.newName);
  if (!!exist) {
    res.send(sendMsg.getErr("该分类已存在，请改别的名字"));
    return;
  }

  const result = await CategoryService.updateKind(req.body);
  handleResult(result, res, "修改分类成功！", "修改分类失败");
});

/**
 *  根据分类名字 删除分类
 *  @param {*} req.body.name 分类名字
 */
router.delete('/', async (req, res, next) => {
  if (!req.body.name) {
    res.send(sendMsg.getErr("请先选择要删除的分类"));
    return;
  }

  if (req.body.name === "未选择分类") {
    res.send(sendMsg.getErr("抱歉，未选择分类不能删除"));
    return;
  }

  // 判断名字是否存在
  const exist = await CategoryService.getIsExist(req.body.name);
  if (!exist) {
    res.send(sendMsg.getErr("该分类不存在"));
    return;
  }

  const result = await CategoryService.delKindByName(req.body.name);
  handleResult(result, res, "删除分类成功！", "删除分类失败");
});

/**
 *  根据分类id 删除分类
 *  @param {*} req.body.id 分类id
 */
router.delete('/id', async (req, res, next) => {
  if (req.body.id === 1) {
    res.send(sendMsg.getErr("抱歉，未选择分类不能删除"));
    return;
  }
  const resp = await CategoryService.delKindById(req.body.id);
  handleResult(resp, res, "删除分类成功！", "删除分类失败");
});


module.exports = router;
