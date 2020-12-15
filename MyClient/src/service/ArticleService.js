// 文章管理 请求模块
import myAxios from "./Request.js";
/**
 * 发布一篇文章
 * @param {string} loginId 用户id
 * @param {*} articleInfos 文章信息：title(标题)、introduce(介绍)、content(内容)、name(分类)
 */
async function declare(articleInfos) {
  const url = `/articles`;
  const res = await myAxios().post(url, articleInfos);
  return res;
}

/**
 * 根据文章id查询一篇文章 细节
 * @param {string} id 文章id
 */
async function findAticleById(id) {
  const url = `/articles/detail/${id}`;
  const res = await myAxios().get(url);
  return res;
}

/**
 * 根据分类查询所有文章
 * @param {string} kindName 分类名称
 */
async function findAllArticles({ id }) {
  const url = `/articles/${id}`;
  const res = await myAxios().get(url);
  return res.data.data.datas;
}

/**
 * 根据标题查询文章的详情
 * @param {string} category 文章分类
 * @param {string} cap 标题
 */
async function findArticleByTitle(category, cap) {
  const url = `/articles/${category}/${cap}`;
  const res = await myAxios().get(url);
  return res.data.data;
}

/**
 * 删除文章（批量删除）
 * @param {string} ids 要删除的文章id
 */
async function delArticle(ids) {
  const url = `/articles`;
  return await myAxios().delete(url, {
    data: {
      ids
    }
  });
}

export {
  declare,
  findAllArticles,
  findArticleByTitle,
  delArticle,
  findAticleById
};
