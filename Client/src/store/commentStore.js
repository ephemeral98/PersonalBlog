// 评论区状态管理
import * as commentHttp from "@/service/CommentService.js";

export default {
  namespaced: true,
  state: {
    floorId: null,
    nickName: null,
    floorsData: null,
    floorsCount: 0
  },
  mutations: {
    setFloorsData(state, payload) {
      state.floorsData = payload;
    },
    setFloorsCount(state, payload) {
      state.floorsCount = payload;
    },
    setNickName(state, payload) {
      state.nickName = payload;
    },
    setFloorId(state, payload) {
      state.floorId = payload;
    }
  },
  actions: {
    async getMoreComments({ commit }, payload) {
      const { floorsCount, datas } = await commentHttp.getGuestArea(...payload);
      console.log("hello, comment", datas, floorsCount);
      commit("setFloorsData", datas);
      commit("setFloorsCount", floorsCount);
    }
  }
};
