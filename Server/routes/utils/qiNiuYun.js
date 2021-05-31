const qiniu = require('qiniu');

// 创建上传凭证
const accessKey = ''; //accessKey 
const secretKey = ''; //secretKey 
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: '', //对象存储空间名字
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = {
  uploadToken
}
