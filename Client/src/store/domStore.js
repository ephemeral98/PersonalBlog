export default {
  namespaced: true,
  state: {
    mask: false,
    isShowMenu: false,
    navList: null,
<<<<<<< HEAD
    isPlayMusic: false,
    isLoadingWords: false, // 是否加载中
    isLoadingWordFast: false // 加载动画速度
=======
    isPlayMusic: false
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
  },
  mutations: {
    showMenu(state, payload) {
      state.mask = payload;
      state.isShowMenu = payload;
    }
  }
};
