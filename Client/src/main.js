import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

if (process.env.NODE_ENV !== "production") {
  import("vuetify/dist/vuetify.min.css");
  import("animate.css");
  // 开发环境下
  import("vuetify").then(v => {
    Vue.use(v);
  });

  import("highlight.js/styles/monokai-sublime.css"); // 高亮样式
}
import vuetify from "./plugins/vuetify";
import "@/assets/reset.css";
import "@/assets/icon/iconfont.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: vuetify,
  render: h => h(App)
}).$mount("#app");
