<template>
  <div class="tools">
    <slot></slot>
    <div
      class="to_top iconfont"
      @click="toTop"
      v-if="isRenderRocket"
      v-show="isShowRocket"
    >
      &#xe614;
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    timer: null,
    isRenderRocket: true,
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
        if (window.scrollY <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.isRenderRocket = false;
          setTimeout(() => {
            this.isRenderRocket = true; // 让火箭重新渲染，top值初始化
          }, 500);
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
@keyframes shake {
  0% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(4px);
  }
}

.tools {
  // border: solid 2px red;
  width: 70px;
  position: fixed;
  right: 2.5vw;
  bottom: 23vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .to_top {
    cursor: pointer;
    // @include toolsBtn;
    font-size: 50px;
    // color: $my_blue;
    @include txtGradient("", $my_pink, $my_blue, plum);
    position: static;

    &:hover {
      @include txtGradient("", $my_blue, $my_pink, red);
      position: static;

      animation: shake 0.1s ease-in-out infinite alternate;

      &::after {
        content: "";
        display: block;
        position: absolute;
        background-image: linear-gradient(to bottom, red, transparent);
        width: 10px;
        height: 70px;
        left: 50%;
        border-radius: 10px;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
