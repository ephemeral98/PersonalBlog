import myAxios from "./Request.js";

const headerConfig = {
  header: {
    "Content-Type": "multipart/form-data"
  }
};

/**
 * 上传头像
 * @param {object} formData Filelist 文件的相关属性
 */
async function upPortrait(formData) {
  const url = "/api/upload/portrait";
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

export { upPortrait, upMultiple };
