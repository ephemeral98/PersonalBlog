import router from "./router.js";
import NProgress from "nprogress";
// import LoadAnimate from '@/components/common/LoadAnimate.vue';
import store from "@/store";
import "nprogress/nprogress.css";

NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: true });

router.beforeEach((to, from, next) => {
  /* if (to.name !== "timeTravel") {
    store.state.domStore.isLoadingWords = true; // 加载动画
  } */
  console.log("router before each");
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
  console.log("router after each");
  // store.state.domStore.isLoadingWords = false;
  // 加快运行过度动画
  store.state.domStore.isLoadingWordsFast = true; // 加速 加载动画
});
