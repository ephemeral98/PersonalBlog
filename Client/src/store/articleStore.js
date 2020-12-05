// 文章状态管理

import * as artHttp from "@/service/ArticleService.js";

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    // 获取所有文章信息
    async getArticles({ commit }) {
      console.log("hello, 获取所有文章信息");
      const resp = await artHttp.getAllArticles();
      commit("setData", resp);
    }
  }
};
