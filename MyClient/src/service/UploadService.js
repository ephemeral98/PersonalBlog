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

export { upSingle, upMultiple };
