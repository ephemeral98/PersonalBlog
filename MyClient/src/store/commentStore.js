// 评论区状态管理
import * as commentHttp from "@/service/CommentService.js";

export default {
  namespaced: true,
  state: {
    floorId: null,
    nickName: null,
    floorsData: null,
    floorsCount: 0,
    commentsCount: 0
  },
  mutations: {
    setFloorsData(state, payload) {
      state.floorsData = payload;
    },
    setFloorsCount(state, payload) {
      state.floorsCount = payload;
    },
    setCommentsCount(state, payload) {
      state.commentsCount = payload;
    }
  },
  actions: {
    /**
     * 获取评论
     * @param {Array} payload 开始数，结束数，blogId
     */
    async getMoreComments({ commit }, payload) {
      const {
        floorsCount,
        commentsCount,
        datas
      } = await commentHttp.getGuestArea(...payload);
      // console.log(floorsCount, datas);
      commit("setCommentsCount", commentsCount);
      commit("setFloorsCount", floorsCount);
      commit("setFloorsData", datas);
    }
  }
};
