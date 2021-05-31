const sendMsg = require('../utils/getSendRes.js');
const AdminService = require('../../service/AdminService.js');
/**
 * 修改用户的辅助函数
 * @param {*} req 请求
 * @param {*} res 响应
 * @param {*} next 推向下一项
 * @param {*} updated 修改谁？
 */
async function changeAdmin(req, res, next, updated) {
  const { loginId } = req.body;
  const result = await AdminService[updated](loginId, req.body);
  if (typeof (result) === 'string') { // 种种原因修改失败
    res.send(sendMsg.handleFail(result));
  } else {
    res.send(sendMsg.getResult({ "loginId": loginId }, '修改成功！'));
  }
}

module.exports = { changeAdmin }
