import Vue from "vue";
import Vuex from "vuex";
import adminStore from "./adminStore.js"; // 注意：这里的名字要和文件名一模一样，包括大小写
import articleStore from "./articleStore.js";
import commentStore from "./commentStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { adminStore, articleStore, commentStore }
});
