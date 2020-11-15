const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../../public', 'upload'));
  },
  filename: (req, file, cb) => {
    // 时间戳-6位随机字符串.文件后缀
    const timeStamp = Date.now();
    const randomStr = Math.random().toString(36).slice(-6);
    const ext = path.extname(file.originalname);
    const filename = `${timeStamp}-${randomStr}.${ext}`;
    cb(null, filename);
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1000 * 1024  //图片最大为50MB
  }
});

router.post('/', upload.single('portrait'), async (req, res) => {
  const url = '/upload/' + req.file.filename;
  res.send({
    code: "success",
    msg: "",
    data: url
  });
});

module.exports = router;
