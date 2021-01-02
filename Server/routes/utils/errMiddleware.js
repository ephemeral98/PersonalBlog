// 处理错误的中间件
const { MulterError } = require('multer');
const sendMsg = require('./getSendRes.js');
module.exports = (err, req, res, next) => {
  if (err) {
    if (err instanceof MulterError) { // 如果是上传文件时候发生了错误
      if (err.code === "LIMIT_FILE_SIZE") {
        res.send(sendMsg.getErr("文件过大"))
      }
    } else {
      const error = {
        code: 500,
        msg: err instanceof Error ? err.message : err,
      }
      res.status(500).send({
        status: 'fail',
        data: error
      });
    }
  } else {
    next();
  }
}
