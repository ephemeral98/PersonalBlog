// 用户仓库
import * as AdminService from "../service/AdminService.js";
export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    introduce: false
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setIntroduce(state, payload) {
      state.introduce = payload;
    }
  },
  actions: {
    // 给 view层 和 router 的方法
    // 登录
    async login({ commit }, { loginId, password, captcha }) {
      const resp = await AdminService.loginService(loginId, password, captcha);
      commit("setData", resp.data);
      return resp;
    },

    // 登出
    async quit({ commit }) {
      await AdminService.quitService();
      commit("setData", null);
    },

    // 我是谁（获取用户信息）
    async whoAmI({ commit }) {
      try {
        const resp = await AdminService.whoAmIService();
        commit("setData", resp.data.data);
        return true;
      } catch {
        commit("setData", null);
        return false;
      }
    }
  }
};
