import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as GlobalComp from "@/components/GlobalComponents.js";
import * as globalFunc from "@/utils/globalFunc.js";

store.commit("domStore/setIsLoadingWords", true); // 加载动画

if (process.env.NODE_ENV !== "production") {
  import("vuetify/dist/vuetify.min.css");
  import("animate.css");
  // 开发环境下
  import("vuetify").then(v => {
    Vue.use(v);
  });

  import("highlight.js/styles/monokai-sublime.css"); // 高亮样式
}
import vuetify from "./plugins";
import "@/assets/reset.css";
import "@/assets/icon/iconfont.css";

Vue.config.productionTip = false;

// 全局组件
Vue.component("Pager", GlobalComp.Pager);
Vue.component("CentralWord", GlobalComp.CentralWord);
Vue.component("EnterMain", GlobalComp.EnterMain);

// 全局函数
Vue.prototype.$getRandom = globalFunc.getRandom;
Vue.prototype.$getClientSize = globalFunc.getClientSize;
Vue.prototype.$typing = globalFunc.typing;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

// Vue.component("MyContainer", GlobalComp.MyContainer);
