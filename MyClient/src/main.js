import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
console.log(process.env.NODE_ENV);
// bootstrap-vue 和 animate 在生产环境用cdn加速
if (process.env.NODE_ENV !== "production") {
  import("bootstrap-vue").then(ele => {
    Vue.use(ele.BootstrapVue);
    Vue.use(ele.IconsPlugin);
  });
  import("bootstrap/dist/css/bootstrap.css");
  import("bootstrap-vue/dist/bootstrap-vue.css");
  import("animate.css");
}

import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
import "@/assets/reset.css";
import "@/assets/iconfont.css";
import "./assets/common/index.scss";
Vue.use(VueFullPage);

store.dispatch("adminStore/whoAmI"); // 在网站一启动后，就用token去换取身份
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
