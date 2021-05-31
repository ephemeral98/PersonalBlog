import myAxios from "./Request.js";

// 倒序 辅助函数
function getDayWordsHelper(datas) {
  return datas.sort((a, b) => (a.id < b.id ? 1 : -1));
}

// 获取每日一句
export default async function getDayWords() {
  const url = "/dayWords";
  const resp = await myAxios.get(url);
  if (resp.data.status === "success") {
    // 取第一条的内容
    const res = getDayWordsHelper(resp.data.data.datas);
    return res[0] ? res[0].content : "";
  }
}
