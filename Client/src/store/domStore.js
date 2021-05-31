export default {
  namespaced: true,
  state: {
    mask: false,
    isShowMenu: false,
    navList: null,
    isPlayMusic: false, // 顶栏的背景音乐是否播放中
    bgMusicUrl: `http://www.gzqsoul.icu/shallWeTalk.mp3`,
    isLoadingWords: false, // 是否加载中
    isLoadingWordsFast: false // 加载动画速度
  },
  mutations: {
    showMenu(state, payload) {
      state.mask = payload;
      state.isShowMenu = payload;
    },
    setBgMusicUrl(state, payload) {
      state.bgMusicUrl = payload;
    },
    setIsPlayMusic(state, payload) {
      state.isPlayMusic = payload;
    },
    // 设置是否加载中
    setIsLoadingWords(state, payload) {
      state.isLoadingWords = payload;
    },
    // 加速 加载动画
    setIsLoadingWordsFast(state, payload) {
      state.isLoadingWordsFast = payload;
    }
  }
};
