// jwt 认证

const jwt = require('jsonwebtoken');
const secret = 'barry';
const cookieKey = 'token';

// 颁发jwt
exports.publish = (res, maxAge = 3600 * 24, info = {}) => {
  const token = jwt.sign(info, secret, {
    expiresIn: maxAge,
  });

  // 保存到cookie
  res.cookie(cookieKey, token, {
    expiresIn: maxAge,
    path: '/'
  });

  // 其他传输(保存)方式：
  res.header("Access-Control-Expose-Headers", 'Authorization');
  res.header('authorization', token);
}

// 验证
exports.verify = (req) => {
  let token;
  // 先尝试从cookie中获取，看看有没有 token
  token = req.cookies && req.cookies[cookieKey];
  console.log(req.headers.authorization);
  if (!token) { // 如果cookie中没有，再尝试从authorization中获取
    token = req.headers.authorization;

    if (!token) {
      // 还是没有token，证明没有登录
      return null;
    }
    // 如果终于有 token 了
    // authorization: bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
    // token = token.slice(6); // 不应该在这里处理这个 authorization的，
    // 正常的authorization是个字符串，即使不正常也不应该在这处理
  }

  try {
    console.log('jwt验证通过');
    return jwt.verify(token, secret);
  } catch (err) {
    console.log('jwt验证有误');
    return null;
  }
}
