<template>
  <v-app>
    <!-- 顶部导航栏 -->
    <TopBar v-show="isBegin" @hideMusic="isShowMusic = $event" />
    <!-- 加载动画 -->
    <LoadAnimate v-if="isLoadingWords" />
    <!-- 背景音乐 -->
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <BgMusic
        @click.native="playMusic"
        :notTopBar="isBegin"
        v-show="isShowMusic"
      />
    </transition>
    <!-- 各个页面 -->
    <transition name="fade" mode="out-in">
      <router-view
        @touchmove.prevent
        @mousewheel.prevent
        v-if="!isLoadingWords"
      />
    </transition>
  </v-app>
</template>

<script>
import "@/assets/common/index.scss";
import TopBar from "@/components/common/TopBar";
import BgMusic from "@/components/common/BgMusic.vue";
import LoadAnimate from "@/components/common/LoadAnimate.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    TopBar,
    BgMusic,
    LoadAnimate
  },
  data: () => ({
    isShowMusic: true
  }),
  computed: {
    isBegin() {
      return this.$route.name !== "begin";
    },
    ...mapState("domStore", ["isLoadingWords"])
  },
  methods: {
    playMusic() {
      this.$store.commit(
        "domStore/setIsPlayMusic",
        !this.$store.state.domStore.isPlayMusic
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-leave-active {
  transform-origin: center;
  transition: all 0.5s ease-out;
  opacity: 0;
  transform: scale(1.5, 1.5);
}
.fade-enter-active {
  transform-origin: center center;
  transition: all 0.2s ease-out;
}
.fade-enter {
  opacity: 0;
  // transform: scale(1, 1);
}
</style>
