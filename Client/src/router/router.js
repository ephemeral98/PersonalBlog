import Vue from "vue";
import VueRouter from "vue-router";
import * as articleHttp from "@/service/ArticleService.js";

<<<<<<< HEAD
=======
import NProgress from "nprogress";
import "nprogress/nprogress.css";

>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
Vue.use(VueRouter);

/**
 * 组件懒加载
 * @param {*} view 页面
 */
function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`);
}

const routes = [
  {
    path: "/articleList",
    name: "articleList",
    component: loadView("ArticleList")
  },
  {
    path: "/timeTravel",
    name: "timeTravel",
    component: loadView("timeTravel")
  },
  {
    path: "/category",
    name: "category",
    component: loadView("category")
  },
  {
    path: "/guestbook",
    name: "guestbook",
    component: loadView("guestbook")
  },
  {
    path: "/about",
    name: "about",
    component: loadView("About")
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: loadView("article"),
    beforeEnter: (to, from, next) => {
      const { articleId } = to.params;
      articleHttp.addReadings(articleId);
      next();
    }
  },
  {
    path: "/articleCardList/:CategoryId",
    name: "articleCardList",
    component: () =>
      import(
        /* webpackChunkName: "articleCardList" */
        "@/components/category/ArticleCardList.vue"
      )
  },
  {
    path: "/",
    name: "begin",
    component: loadView("Begin")
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: true });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
