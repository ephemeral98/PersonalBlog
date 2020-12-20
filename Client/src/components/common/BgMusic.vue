<template>
  <div>
    <audio ref="music">
      <source src="../../assets/captain2.mp3" />
    </audio>
    <button
      class="music iconfont"
      :class="[
        playingMusic ? 'icon-stop' : 'icon-ziyuanldpi',
        notTopBar ? 'top_bar' : 'not_top_bar'
      ]"
      @click="playMusic"
    ></button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["notTopBar"],
  data: () => ({
    playingMusic: false
  }),
  computed: {
    ...mapState("domStore", ["isPlayMusic"])
  },
  watch: {
    isPlayMusic(val) {
      if (val) {
        this.playMusic();
      }
    }
  },
  methods: {
    playMusic() {
      const music = this.$refs.music;
      this.playingMusic = !this.playingMusic;
      if (this.playingMusic) {
        music.play();
      } else {
        music.pause();
      }
      music.addEventListener("ended", () => {
        console.log("hello, ended");
        this.playingMusic = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.music {
  font-size: 20px;
  background-image: linear-gradient($my_blue, $my_pink);
  background-clip: text;
  color: transparent;
  position: fixed;
  left: 60px;
  top: 20px;
  z-index: 999999;
}

.not_top_bar {
  left: 72%;
  top: 46%;
  font-size: 3vw;
}

@media screen and (max-width: $i_md) {
  .top_bar {
    left: 50px;
  }

  .not_top_bar {
    top: 48%;
  }
}
</style>
