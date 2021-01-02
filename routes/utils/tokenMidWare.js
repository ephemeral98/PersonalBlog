// 处理 token 的中间件
const jwt = require('./jwt.js');
const { getErr } = require('./getSendRes.js');
const { pathToRegexp } = require('path-to-regexp'); // 用于解析token

// 需要验证的地址
const needToToken = [
  // /login  &  /login
  { method: 'POST', path: '/write' }, // 这里拦截了 http://localhost:4399/write 这个地址的post请求
  { method: 'GET', path: '/admin/whoami' }, // 这里拦截了 http://localhost:4399/write 这个地址的post请求
]; // temp， 暂时验证这个

module.exports = async (req, res, next) => {
  const apis = needToToken.filter(api => {
    const reg = pathToRegexp(api.path);
    return api.method === req.method && reg.test(req.path);
  });

  if (apis.length === 0) { // 说明不用验证
    next();
    return;
  }

  // 如果要验证
  const result = jwt.verify(req);
  if (result) {
    console.log('通过jwt');
    req.adminId = result.id; // 创建一个adminId的属性，放入id 而不是 loginId，这是jwt这个库决定的
    // 为的就是调用 whoami 接口的时候，获取个人信息
    next();
  } else {
    console.log('通不过jwt');
    handleNoToken(req, res, next);
  }
}

/**
 * 处理没有认证的情况
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function handleNoToken(req, res, next) {
  res
    .status(403)
    .send(getErr('you do not have any token to access the api', 403));
}
