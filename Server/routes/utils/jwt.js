// jwt 认证

const jwt = require('jsonwebtoken');
const secret = 'barry';

// 颁发jwt
exports.publish = (res, maxAge = 3600 * 24, info = {}) => {
  const token = jwt.sign(info, secret, {
    expiresIn: maxAge,
  });
  res.header("Access-Control-Expose-Headers", 'Authorization');
  res.header('authorization', token);
}

// 验证
exports.verify = (req) => {
  let token = req.headers.authorization;

  if (!token) {
    // 如果没有token，证明没有登录
    return null;
  }
  // authorization: bearer token
  token = token.split(" ");
  token = token.length === 1 ? token[0] : token[1];

  try {
    console.log('jwt验证通过');
    return jwt.verify(token, secret);
  } catch (err) {
    console.log('jwt验证有误');
    return null;
  }
}
