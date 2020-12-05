import * as tools from "./tools.js";
import myAxios from "./Request.js";

// 获取所有文章，用作列表展示
async function getAllArticles() {
  const url = "/articles";
  return await tools.getNeeded(url);
}

/**
 * 分页查询文章
 * @param {*} page 第几页
 * @param {*} limit 每页多少篇
 */
async function getArtByPage(page, limit) {
  const url = "/articles/page";
  return await tools.getNeeded(url, {
    params: {
      page,
      limit
    }
  });
}

/**
 * 查询一篇文章的所有信息
 * @param {*} id 文章的id
 */
async function getArticleInfo(id) {
  const url = `/articles/detail/${id}`;
  const resp = await myAxios.get(url);
  if (resp.data.status === "success") {
    const articleDate = tools.getMyDate(resp.data.data.createdAt);
    Object.assign(resp.data.data, articleDate);
    return resp.data.data;
  }
}

/**
 * 文章点赞
 * @param {*} id 文章id
 */
async function addLike(id) {
  const url = `/articles/article/like`;
  const resp = await myAxios.post(url, {
    id
  });
  return resp.data.status === "success";
}

/**
 * 阅读量+1
 * @param {*} id 文章id
 */
async function addReadings(id) {
  const url = `/articles/article/readings`;
  await myAxios.post(url, {
    id
  });
}

export { getAllArticles, getArtByPage, getArticleInfo, addLike, addReadings };
