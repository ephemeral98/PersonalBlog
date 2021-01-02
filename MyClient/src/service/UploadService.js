import myAxios from "./Request.js";

const headerConfig = {
  header: {
    "Content-Type": "multipart/form-data"
  }
};

/**
 * 上传单个文件
 * @param {object} formData Filelist 文件的相关属性
 */
async function upSingle(formData) {
  console.log(formData);
  const url = "/api/upload/singleImg";
  return await myAxios().post(url, formData, headerConfig);
}

/**
 * 上传多个文件
 * @param {object} formData Filelist 文件的相关属性
 */
async function upMultiple(formData) {
  const url = "/api/upload/multipleFile";
  return await myAxios().post(url, formData, headerConfig);
}

/* function getToken(str) {
  console.log(str);
  const reg = /:/g;
  let res;
  let count = 0;
  while ((res = reg.exec(str))) {
    console.log(res.index);
    if (res) {
      count++;
      if (count === 2) {
        console.log(res.index);
        return str.slice(res.index + 1);
      }
    }
  }
} */

// 上传到七牛云
// 从后端获取上传凭证token
async function upQiniu(file, keyName, config, params) {
  const resp = await myAxios().get("http://localhost:2333/api/upload");
  const token = resp.data.upToken;
  const fData = new FormData();
  fData.append("file", file);
  fData.append("token", token);
  fData.append("key", keyName);
  // 获取到凭证之后再将文件上传到七牛云空间
  const res = await myAxios().post(params.domain, fData, config);
  const imageUrl = params.qiniuaddr + "/" + res.data.key;
  return imageUrl;
}

export { upSingle, upMultiple, upQiniu };
