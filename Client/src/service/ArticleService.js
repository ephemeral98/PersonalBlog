import * as tools from "./tools.js";
import myAxios from "./Request.js";

// 获取所有文章
async function getAllArticles() {
  const url = "/api/articles";
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
 * 查询某分类下的所有文章
 * @param {*} CategoryId 分类id
 */
async function getArtByCategory(CategoryId) {
  const url = `/articles/${CategoryId}`;
  const resp = await myAxios.get(url);
  return resp;
}

/**
 * 分段查询某分类下、的所有文章
 * @param {*} CategoryId 分类id
 * @param {*} start 第几次加载
 * @param {*} limit 每次加载多少条
 */
async function getArtByKindSection(CategoryId, start, limit) {
  const url = `/articles/section/${CategoryId}`;
  const resp = await tools.getNeeded(url, {
    params: {
      start,
      limit
    }
  });
  console.log(resp);
  return resp;
}

/**
 * 查询一篇文章的所有信息
 * @param {*} id 文章的id
 */
async function getArticleInfo(id) {
  const url = `/articles/detail/${id}`;
  const resp = await myAxios.get(url);
  if (resp.data.status === "success") {
    const articleDate = tools.getEnDate(resp.data.data.createdAt);
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

export {
  getAllArticles,
  getArtByPage,
  getArtByCategory,
  getArtByKindSection,
  getArticleInfo,
  addLike,
  addReadings
};
