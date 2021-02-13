import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

<<<<<<< HEAD
store.state.domStore.isLoadingWords = true; // 加载动画

=======
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
if (process.env.NODE_ENV !== "production") {
  import("vuetify/dist/vuetify.min.css");
  import("animate.css");
  // 开发环境下
  import("vuetify").then(v => {
    Vue.use(v);
  });

  import("highlight.js/styles/monokai-sublime.css"); // 高亮样式
}
<<<<<<< HEAD
import vuetify from "./plugins";
=======
import vuetify from "./plugins/vuetify";
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
import "@/assets/reset.css";
import "@/assets/icon/iconfont.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: vuetify,
  render: h => h(App)
}).$mount("#app");
