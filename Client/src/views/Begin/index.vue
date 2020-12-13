<template>
  <div id="sky" ref="sky">
    <canvas ref="cvs"></canvas>
    <img src="../myView.png" alt="" class="buildingView" />
    <div class="filter"></div>
    <CentralWord class="central_word" welcomeWord="BA-Moment" :isBegin="true">
      <!-- 打字效果 -->
      <v-row justify="center" class="introduce" ref="typeContent"></v-row>
    </CentralWord>
    <router-link :to="{ name: 'articleList' }">
      <BlinkBtn class="start_btn">Start</BlinkBtn>
    </router-link>
    <!-- <BgMusic :notTopBar="true" /> -->
  </div>
</template>

<script>
import CentralWord from "@/components/common/CentralWord";
import BlinkBtn from "@/components/common/BlinkBtn.vue";
import dayWordsHttp from "@/service/DayWordsService.js";
import Star from "./Star.js";
import typing from "@/utils/typing.js";
// import BgMusic from "@/components/common/BgMusic.vue";

export default {
  components: {
    CentralWord,
    BlinkBtn
    // BgMusic
  },
  data: () => ({
    typingContent: "山有小口，仿佛若有光...",
    sky: null,
    canvas: null,
    ctx: null,
    stars: [],
    initStartPop: 49 // 星星数
  }),
  methods: {
    setCanvasSize() {
      this.canvas.setAttribute("width", window.innerWidth);
      this.canvas.setAttribute("height", window.innerHeight);
    },
    init() {
      this.ctx.strokeStyle = "white";
      this.ctx.shadowColor = "white";
      for (let i = 0, len = this.initStartPop; i < len; i++) {
        this.stars[i] = new Star(
          i,
          Math.floor(Math.random() * window.innerWidth),
          Math.floor(Math.random() * window.innerHeight),
          this.ctx
        );
      }
      this.ctx.shadowBlur = 0;
      this.animate();
    },
    // 星星动画
    animate() {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const key in this.stars) {
        this.stars[key].move();
      }
      // 下次重绘之前调用回调函数更新动画
      requestAnimationFrame(this.animate);
    }
  },
  async created() {
    this.typingContent = await dayWordsHttp();
    typing(this.$refs.typeContent, this.typingContent, true, 5);
  },
  mounted() {
    this.sky = this.$refs.sky;
    this.canvas = this.$refs.cvs;
    this.ctx = this.canvas.getContext("2d");

    this.setCanvasSize();
    this.init();
  }
};
</script>

<style lang="scss" scoped>
#sky {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    70% 100% at bottom center,
    #f7f7b6 15%,
    #fb7299 28%,
    #75517d 42%,
    #1b2947 75%
  );
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;

  .filter {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #f78275;
    mix-blend-mode: overlay;
    animation-name: changeColor;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-duration: 20s;
    animation-direction: ease-in-out;
  }

  @keyframes changeColor {
    0%,
    100% {
      opacity: 0;
    }

    50% {
      opacity: 0.6;
    }
  }

  .buildingView {
    position: absolute;
    left: -2%;
    bottom: -37vw;
    width: 110%;
  }
  .central_word {
    @include center(absolute);
  }

  .start_btn {
    top: 30vh;
  }
}

@media screen and (max-width: $phone_computer) {
  .buildingView {
    bottom: -15% !important;
  }
  #sky {
    background-image: radial-gradient(
      100% 80% at bottom center,
      #f7f7b6 15%,
      #fb7299 28%,
      #75517d 42%,
      #1b2947 75%
    );
  }
}
</style>
