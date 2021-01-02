<template>
  <v-app>
    <TopBar v-show="isBegin" @hideMusic="isShowMusic = $event" />
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

    <transition name="fade" mode="out-in">
      <router-view @touchmove.prevent @mousewheel.prevent />
    </transition>
  </v-app>
</template>

<script>
import "@/assets/common/index.scss";
import TopBar from "@/components/common/TopBar";
import BgMusic from "@/components/common/BgMusic.vue";
export default {
  name: "App",
  components: {
    TopBar,
    BgMusic
  },
  data: () => ({
    isShowMusic: true
  }),
  computed: {
    isBegin() {
      return this.$route.name !== "begin";
    }
  },
  methods: {
    playMusic() {
      console.log("hello, mu");
      this.$store.state.domStore.isPlayMusic = !this.$store.state.domStore
        .isPlayMusic;
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
