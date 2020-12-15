// 文章处理仓库
import * as ArticleHttp from "../service/ArticleService.js";
export default {
  namespaced: true,
  state: {
    data: null,
    articleDetail: null
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setArticleDetail(state, payload) {
      state.articleDetail = payload;
    }
  },
  actions: {
    // 根据分类查询所有文章
    async getArts({ commit }, { kindName }) {
      const resp = await ArticleHttp.findAllArticles(kindName);
      commit("setData", resp);
    },
    // 根据标题查询文章
    async getArtsByTitle({ commit }, category, cap) {
      const resp = await ArticleHttp.findArticleByTitle(category, cap);
      commit("setArticleDetail", resp);
    }
  }
}
