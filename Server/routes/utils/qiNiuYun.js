const qiniu = require('qiniu');

// 创建上传凭证
const accessKey = '_IEJG_75fmuQZGOQ0DPx7srRyV12qWCvPgWdciBG'; //accessKey 
const secretKey = '8A3mpeo8eY6oZtLOVx8GIkyXXX1eGVhOYqQ3H1gx'; //secretKey 
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'ephemeral', //对象存储空间名字
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = {
  uploadToken
}
