import Vue from "vue";
import Vuex from "vuex";
import articleStore from "./articleStore.js";
import commentStore from "./commentStore.js";
import domStore from "./domStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articleStore,
    commentStore,
    domStore
  }
});
