import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import animated from "animate.css";

import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
import "@/assets/reset.css";
import "@/assets/iconfont.css";
import "./assets/common/index.scss";
store.dispatch("adminStore/whoAmI"); // 在网站一启动后，就用token去换取身份

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueFullPage);
Vue.use(animated);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
