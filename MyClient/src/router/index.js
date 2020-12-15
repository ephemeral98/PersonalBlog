import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      redirectPath: "/"
    }
  },
  {
    path: "/showDatas",
    name: "showDatas",
    redirect: "/showDatas/categories",
    component: () =>
      import(/* webpackChunkName: "showDatas" */ "../views/UserDatas.vue"),
    children: [
      {
        path: "categories",
        name: "categories",
        meta: {
          word: "文章分类"
        },
        component: () =>
          import(
            /* webpackChunkName: "categories" */
            "../components/Categories"
          )
      },
      {
        path: "articles/:id",
        name: "articles",
        meta: {
          word: "文章分类"
        },
        component: () =>
          import(/* webpackChunkName: "articles" */ "../components/Article")
      },
      {
        path: "/msgWall",
        name: "msgWall",
        meta: {
          word: "留言板"
        },
        component: () =>
          import(/* webpackChunkName: "msgWall" */ "@/components/comment")
      },
      {
        path: "uploadPage",
        name: "uploadPage",
        meta: {
          word: "上传"
        },

        component: () =>
          import(/* webpackChunkName: "tags" */ "../components/uploadPage")
      },
      {
        path: "dayWord",
        name: "dayWord",
        meta: {
          word: "每日一句"
        },

        component: () =>
          import(/* webpackChunkName: "others" */ "../components/dayWords")
      }
    ]
  },
  {
    path: "/write",
    name: "write",
    component: () =>
      import(/* webpackChunkName: "write" */ "../views/Write.vue")
  },
  {
    path: "/updateArticle/:id",
    name: "updateArticle",
    component: () =>
      import(/* webpackChunkName: "updateArticle" */ "../views/UpdateArticle")
  },
  {
    path: "/writerInfos",
    name: "writerInfos",
    component: () =>
      import(/* webpackChunkName: "writerInfos" */ "../views/WriterInfos")
  },
  {
    path: "/comments/:articleId",
    name: "comments",
    component: () =>
      import(/* webpackChunkName: "comments" */ "@/components/comment")
  }
];

const router = new VueRouter({
  base: "/MyClient",
  routes
});
router.beforeEach(async (to, from, next) => {
  if (to.name === "login") {
    next();
  } else {
    await store.dispatch("adminStore/whoAmI"); // 换取我的身份
    if (store.state.adminStore.data && store.state.adminStore.data.loginId) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
