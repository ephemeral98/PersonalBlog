import Vue from "vue";
import VueRouter from "vue-router";
import * as articleHttp from "@/service/ArticleService.js";
// const isProduction = process.env.NODE_ENV === "production";
// const mode = isProduction ? "history" : "hash";

Vue.use(VueRouter);

const routes = [
  {
    path: "/articleList",
    name: "articleList",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/ArticleList")),
        "articleList"
      )
  },
  {
    path: "/category",
    name: "category",
    component: resolve =>
      require.ensure([], () => resolve(require("@/views/category")), "category")
  },
  {
    path: "/timeMachine",
    name: "timeMachine",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/timeMachine")),
        "timeMachine"
      )
  },
  {
    path: "/laboratory",
    name: "laboratory",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory")),
        "laboratory"
      )
  },
  {
    path: "/fate",
    name: "fate",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Fate")),
        "fate"
      )
  },
  {
    path: "/voice",
    name: "voice",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Voice")),
        "voice"
      )
  },
  {
    path: "/game",
    name: "game",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Game")),
        "game"
      )
  },
  {
    path: "/gluttony",
    name: "gluttony",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Game/Gluttony")),
        "gluttony"
      )
  },
  {
    path: "/pushBox",
    name: "pushBox",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Game/PushBox")),
        "pushBox"
      )
  },
  {
    path: "/puzzle",
    name: "puzzle",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Game/Puzzle")),
        "puzzle"
      )
  },
  {
    path: "/rubikCube",
    name: "rubikCube",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Game/RubikCube")),
        "rubikCube"
      )
  },
  {
    path: "/pixelBird",
    name: "pixelBird",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/Laboratory/Game/PixelBird")),
        "pixelBird"
      )
  },

  {
    path: "/guestbook",
    name: "guestbook",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/views/guestbook")),
        "guestbook"
      )
  },
  {
    path: "/about",
    name: "about",
    component: resolve =>
      require.ensure([], () => resolve(require("@/views/About")), "about")
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: resolve =>
      require.ensure([], () => resolve(require("@/views/article")), "article"),
    beforeEnter: (to, from, next) => {
      const { articleId } = to.params;
      articleHttp.addReadings(articleId);
      next();
    }
  },
  {
    path: "/articleCardList/:CategoryId",
    name: "articleCardList",
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require("@/components/category/ArticleCardList")),
        "articleCardList"
      )
  },
  {
    path: "/",
    name: "begin",
    component: resolve =>
      require.ensure([], () => resolve(require("@/views/Begin")), "begin")
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
