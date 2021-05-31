import router from "./router.js";
import NProgress from "nprogress";
// import LoadAnimate from '@/components/common/LoadAnimate.vue';
import store from "@/store";
import "nprogress/nprogress.css";

NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: true });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
  // 加速 加载动画
  store.commit("domStore/setIsLoadingWordsFast", true);
});
