import Vue from "vue";
import VueRouter from "vue-router";
import * as articleHttp from "@/service/ArticleService.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/articleList",
    name: "articleList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ArticleList.vue")
  },
  {
    path: "/timeTravel",
    name: "timeTravel",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/timeTravel")
  },
  {
    path: "/category",
    name: "category",
    component: () => import(/* webpackChunkName: "about" */ "../views/category")
  },
  {
    path: "/guestbook",
    name: "guestbook",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/guestbook")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import(/* webpackChunkName: "about" */ "../views/article"),
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
        /* webpackChunkName: "about" */
        "@/components/category/ArticleCardList.vue"
      )
  },
  {
    path: "/",
    name: "begin",
    component: () => import(/* webpackChunkName: "about" */ "../views/Begin")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
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
