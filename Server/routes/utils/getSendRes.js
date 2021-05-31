// 返回规范的请求
// 返回错误消息
/* exports.getErr = (error = 'server internal error', status = 500) => {
  return {
    status,
    msg: error,
  }
}; */
exports.getErr = (error = 'something wrong!', status = 'fail') => {
  return {
    status,
    msg: error,
  }
};

// 返回正常的请求
exports.getResult = (result, msg = "成功") => {
  return {
    status: 'success',
    msg,
    data: result
  }
}

// 处理登录失败消息
exports.handleFail = (msg) => {
  return {
    status: 'fail',
    msg,
  }
}
