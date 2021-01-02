// 处理错误的中间件
const { MulterError } = require('multer');
module.exports = (err, req, res, next) => {
  if (err) {
    if (err instanceof MulterError) { // 如果是上传头像时候发生了错误
      res.status(200).send({
        status: 'fail',
        data: err
      });
    }
    const error = {
      code: 500,
      msg: err instanceof Error ? err.message : err,
    }
    res.status(500).send({
      status: 'fail',
      data: error
    }); // 将这个错误发送出去
  } else {
    next();
  }
}
