<template>
  <v-app>
    <TopBar v-if="isBegin" @hideMusic="isShowMusic = $event" />
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <BgMusic :notTopBar="isBegin" v-show="isShowMusic" />
    </transition>
    <router-view @touchmove.prevent @mousewheel.prevent />
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
  }
};
</script>
