<template>
  <div ref="musicWrap">
    <audio ref="music">
      <source :src="`${globalConst.qiBaseURL}/captain2.mp3`" />
    </audio>
    <button
      class="music iconfont btn"
      :class="[
        isPlayMusic ? 'icon-stop' : 'icon-ziyuanldpi',
        notTopBar ? 'top_bar' : 'not_top_bar'
      ]"
    >
      <!-- <span style="font-size:0.1px">
        {{ playingMusic }}
      </span> -->
      <!-- {{ playingMusic }} -->
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["notTopBar"],
  data: () => ({
    music: ""
  }),
  computed: {
    ...mapState("domStore", ["isPlayMusic"])
  },
  watch: {
    isPlayMusic(val) {
      if (val) {
        this.music.play();
      } else {
        this.music.pause();
      }
      this.$refs.musicWrap.style.display = "none";
      setTimeout(() => {
        this.$refs.musicWrap.style.display = "block";
      }, 10);
    }
  },
  methods: {
    playMusic() {
      const music = this.$refs.music;
      // this.playingMusic = !this.playingMusic;
      if (this.isPlayMusic) {
        music.play();
      } else {
        music.pause();
      }
    }
  },
  mounted() {
    this.music = this.$refs.music;
    this.music.addEventListener("ended", () => {
      console.log("hello, ended");
      this.$store.commit("domStore/setIsPlayMusic", false);
    });
  }
};
</script>

<style lang="scss" scoped>
.music {
  font-size: 20px;
  color: $my_blue;
  position: fixed;
  left: 60px;
  top: 20px;
  z-index: $pop_level;
}

.not_top_bar {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  height: 60px !important;
}

.btn {
  height: 30px;
  margin-top: -2px;
  transition: all 0.7s;
}

@media screen and (max-width: $i_md) {
  .top_bar {
    left: 58px;
  }
}
</style>
