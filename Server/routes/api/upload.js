const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sendMsg = require('../utils/getSendRes');
const fs = require('fs');
const qn = require('../utils/qiNiuYun.js');

const uploadPath = "../../../public/upload";
/* const uploadDir = {
  normalFile: path.resolve(__dirname, uploadPath, "normalFile"), //一般文件路径
  bigFile: path.resolve(__dirname, uploadPath, "bigFile"), // 大文件路径
} */

// 如果文件夹不存在，则创建
/* for (const key in uploadDir) {
  try {
    fs.statSync(uploadDir[key]);
  } catch (error) {
    console.log('文件不存在');
    fs.mkdir(uploadDir[key], (err) => {
      console.log(err);
    });
  }
} */

/**
 * 上传配置
 * @param {String} way 路径
 * @param {Number} fileSize 限制的文件大小
 */
/* function getStorege(way = uploadPath, fileSize = 100) {
  console.log('hello, get storage');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(way));
    },
    filename: (req, file, cb) => {
      // 时间戳-6位随机字符串.文件后缀
      const timeStamp = Date.now();
      const randomStr = Math.random().toString(36).slice(-6);
      const ext = path.extname(file.originalname);
      const filename = `${timeStamp}-${randomStr}.${ext}`;
      cb(null, filename);
    }
  });

  return multer({
    storage,
    limits: {
      fileSize: fileSize * 1000 * 1024 //文件最大为100MB
    }
  });
} */



// 上传单个文件：头像，文章占位图（限制单个小文件：50M）
/* router.post('/singleImg', getStorege(uploadDir.normalFile, 50).single('singleImg'), async (req, res) => {
  const url = `/upload/normalFile/${req.file.filename}`;
  res.send(sendMsg.getResult(url, "上传成功"));
  return;
})

// 最多上传12个文件（限制100M）
router.post('/multipleFile', getStorege(uploadDir.normalFile, 100).array('mulFiles', 12), async (req, res) => {
  res.send(sendMsg.getResult("", "上传成功"));
  return;
});

// 上传大文件（限制5G）
router.post('/bigFile', getStorege(uploadDir.bigFile, 5000).single('myFiles'), async (req, res) => {
  res.send(sendMsg.getResult("", "上传成功"));
  return;
}); */

// 上传到七牛云
router.get('/', (req, res, next) => {
  const token = qn.uploadToken;
  res.send({
    status: "success",
    message: '上传凭证获取成功',
    upToken: token,
  })
})


module.exports = router;
