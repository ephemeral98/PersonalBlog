<template>
  <div class="tools">
    <slot></slot>
    <button class="to_top iconfont" @click="toTop" v-if="isShowRocket">
      &#xe614;
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    timer: null,
    isShowRocket: false
  }),
  methods: {
    toTop(e) {
      const rocket = e.target;
      e.target.style.position = "fixed";

      if (this.timer) {
        return false; // 防止开启多个计时器
      }
      const speedY = 15; // 滚动速度
      let currentY = window.scrollY; // 获取当前滚动条的位置
      let currentRocket = parseInt(getComputedStyle(rocket).top); // 获取火箭当前Y轴的位置

      this.timer = setInterval(() => {
        currentY -= speedY;
        currentRocket -= (currentRocket * speedY) / currentY;
        window.scroll(0, currentY); // 滚动条
        e.target.style.top = currentRocket + "px"; // 火箭
        if (window.scrollY === 0) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 2);
    }
  },
  mounted() {
    const clientHeight = document.documentElement.clientHeight;
    window.addEventListener("scroll", () => {
      this.isShowRocket = window.scrollY >= clientHeight / 4 ? true : false;
    });
  }
};
</script>
<style lang="scss" scoped>
.tools {
  width: 70px;
  // background-color: gold;
  position: fixed;
  right: 10px;
  bottom: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .to_top {
    // @include toolsBtn;
    font-size: 50px;
    background-image: linear-gradient($my_blue, $my_pink);
    background-clip: text;
    color: transparent;

    &:hover {
      background-image: linear-gradient($my_blue, $my_pink, red);
    }
  }
}
</style>
