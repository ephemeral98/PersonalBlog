export default {
  namespaced: true,
  state: {
    mask: false,
    isShowMenu: false,
    navList: null,
    isPlayMusic: false,
    isLoadingWords: false, // 是否加载中
    isLoadingWordsFast: false // 加载动画速度
  },
  mutations: {
    showMenu(state, payload) {
      state.mask = payload;
      state.isShowMenu = payload;
    },
    setIsPlayMusic(state, payload) {
      state.isPlayMusic = payload;
    },
    setIsLoadingWords(state, payload) {
      state.isLoadingWords = payload;
    },
    setIsLoadingWordsFast(state, payload) {
      state.isLoadingWordsFast = payload;
    }
  }
};
