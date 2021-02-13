export default {
  namespaced: true,
  state: {
    mask: false,
    isShowMenu: false,
    navList: null,
    isPlayMusic: false,
    isLoadingWords: false, // 是否加载中
    isLoadingWordFast: false // 加载动画速度
  },
  mutations: {
    showMenu(state, payload) {
      state.mask = payload;
      state.isShowMenu = payload;
    }
  }
};
