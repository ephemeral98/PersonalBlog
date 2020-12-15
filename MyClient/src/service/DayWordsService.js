import myAxios from "./Request.js";

/**
 * 添加一个句子
 * @param {String} content 句子内容
 */
async function addWords(content) {
  const url = "/dayWords";
  const resp = await myAxios().post(url, {
    content
  });
  return resp.data;
}

/**
 * 获取所有句子
 */
async function getAllWords() {
  const url = "/dayWords";
  const resp = await myAxios().get(url);
  if (resp.data.status === "success") {
    return resp.data.data.datas;
  }
}

/**
 * 批量删除句子
 * @param {Array} ids 句子id
 */
async function delManyWords(ids) {
  const url = "/dayWords";
  const resp = await myAxios().delete(url, {
    data: {
      ids
    }
  });
  console.log(resp);
  return resp.data;
}

export { addWords, getAllWords, delManyWords };
