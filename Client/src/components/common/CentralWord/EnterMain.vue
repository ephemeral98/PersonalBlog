<template>
  <button @click="enter" class="enter move enter_main iconfont icon-xia">
    <slot></slot>
  </button>
</template>

<script>
export default {
  data: () => ({
    timer: null
  }),
  methods: {
    // 滚动到想要看的区域
    enter() {
      if (this.timer) {
        return false;
      }
      let currentY = window.scrollY; // 获取当前滚动条的位置

      let speed = 30;
      this.timer = setInterval(() => {
        currentY += speed;
        window.scroll(0, currentY);
        if (window.scrollY >= document.documentElement.clientHeight) {
          clearInterval(this.timer);
          this.timer = null;
        } else if (
          window.scrollY + document.documentElement.clientHeight >=
          document.body.clientHeight
        ) {
          // 到底了
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 5);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes shaking {
  0% {
    top: 86%;
  }
  100% {
    top: 94%;
  }
}

.move {
  animation-name: shaking;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.enter {
  @include center(absolute);
  top: 85%;
}
</style>
