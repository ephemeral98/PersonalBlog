import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
// import Vtify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import animated from "animate.css";
import "@/assets/reset.css";
import "@/assets/icon/iconfont.css";

Vue.use(Vuetify);
Vue.use(animated);
// Vue.use(Vtify);

// import MyAlert from "@/test";
// Vue.prototype.$alert = MyAlert.install;

/* router.beforeEach((to, from, next) => {
  if (to.name === "articleList") {
    // MyAlert.install({
    //   isShow: true
    // });
    // next(false);
    window.alert("请先登录");
  } else {
    next();
  }
}); */

// Vtify.config.silent = true;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
