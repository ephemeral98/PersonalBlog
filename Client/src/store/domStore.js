export default {
  namespaced: true,
  state: {
    mask: false,
    isShowMenu: false,
    navList: null,
    isPlayMusic: false
  },
  mutations: {
    showMenu(state, payload) {
      state.mask = payload;
      state.isShowMenu = payload;
    }
  }
};
