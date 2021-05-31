<template>
  <transition
    enter-active-class="animate__animated animate__fadeInDown"
    leave-active-class="animate__animated animate__fadeOutUp"
  >
    <div
      class="top_bar"
      :class="isShowBgColor ? 'bg_color' : ''"
      v-show="isShow"
    >
      <v-container fluid>
        <v-row>
          <!-- 我的名字or头像logo & 背景音乐 -->
          <div class="left col-3 col-sm-3 col-md-1 d-flex">
            <router-link to="/" class="me">
              <img :src="`${globalConst.qiBaseURL}/portrait.png`" alt="" />
            </router-link>
            <!-- <BgMusic class="d-flex align-center" style="padding: 0" /> -->
          </div>
          <!-- 导航栏 -->
          <NavBar :navList="navList" class="col-sm-9 col-md-11" />
        </v-row>
      </v-container>

      <transition
        enter-active-class="animate__animated animate__backInRight"
        leave-active-class="animate__animated animate__lightSpeedOutRight"
      >
        <Menu :navList="navList" v-if="isShowMenu" />
      </transition>
      <MyMask v-if="mask" @touchstart.native="closeMenu" />
    </div>
  </transition>
</template>

<script>
import NavBar from "./NavBar.vue";
import Menu from "./Menu.vue";
import MyMask from "@/components/common/MyMask.vue";
// import BgMusic from "@/components/common/BgMusic.vue";
import { mapState } from "vuex";
export default {
  components: {
    NavBar,
    Menu,
    MyMask
    // BgMusic
  },
  data: () => ({
    oldScrollY: 0,
    isShow: true,
    isShowBgColor: true,
    countDown: 0,
    navList: [
      {
        word: "看文章",
        name: "articleList",
        icon: "icon-tubiao_chakangongyi"
      },
      {
        word: "文章分类",
        name: "category",
        icon: "icon-ziyuan"
      },
      {
        word: "时光机",
        name: "timeMachine",
        icon: "icon-shalou"
      },
      {
        word: "实验室",
        name: "laboratory",
        icon: "icon-ziyuan"
      },
      {
        word: "留言板",
        name: "guestbook",
        icon: "icon-pinglun"
      },
      {
        word: "关于我",
        name: "about",
        icon: "icon-wode"
      }
    ]
  }),
  computed: {
    ...mapState("domStore", ["mask", "isShowMenu"])
  },
  methods: {
    closeMenu() {
      this.$store.commit("domStore/showMenu", false);
    },
    // 控制顶部导航栏显示
    handleTopBar() {
      // 是否要去掉顶部导航栏的背景色
      this.isShowBgColor = window.scrollY === 0 ? false : true;

      // 是否要隐藏导航栏
      if (window.scrollY > this.oldScrollY && this.oldScrollY > 200) {
        // 滚动条下滑
        this.countDown++;
        // 下滑超过 20 才隐藏导航栏
        console.log(this.countDown);
        if (this.countDown > 20) {
          this.isShow = false;
          this.$emit("hideMusic", false);
        }
      } else {
        // 滚动条上划
        this.countDown = 0;
        this.isShow = true;
        this.$emit("hideMusic", true);
      }
      this.oldScrollY = window.scrollY;
    }
  },
  mounted() {
    console.log("hello, topbar");
    window.addEventListener("scroll", this.handleTopBar);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleTopBar);
  }
};
</script>

<style lang="scss" scoped>
.top_bar {
  width: 100vw;
  height: $top_bar_height;
  position: fixed;
  z-index: $pop_level;
  // opacity: 0.3;
  &.bg_color {
    background-color: $top_bg_color;
  }

  .container {
    padding: 0;
    height: 100%;
    .row {
      height: 100%;

      .col {
        height: 100%;
      }
    }
  }

  .nav_list {
    background-color: skyblue;
    .nav {
      background-color: plum;
      text-align: center;
      font-size: 1vw;
    }
  }

  .left {
    margin-left: -12px !important;
    height: 100%;
    padding-left: 30px !important;

    .me {
      // width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      // margin-left: 20px;

      img {
        background-color: orange;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
  }
}

@media screen and (max-width: $i_md) {
  .left {
    padding: 12px !important;
  }
}
</style>
