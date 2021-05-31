<template>
  <div class="clock_loading_wrap">
    <div class="clock_loading"></div>
    <div
      :class="['door', !isLoadingWordsFast ? 'left_door' : 'open_left_door']"
      @transitionend.once="loadAnimateEnd"
    ></div>
    <div
      :class="['door', !isLoadingWordsFast ? 'right_door' : 'open_right_door']"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    // doorStatus: false // false: 关闭(看得见)；true: 打开(看不见)
  }),
  computed: {
    ...mapState("domStore", ["isLoadingWordsFast"])
  },
  methods: {
    loadAnimateEnd() {
      this.$store.commit("domStore/setIsLoadingWords", false);
    }
  }
};
</script>

<style lang="scss" scoped>
// 左右门
.door {
  width: 50%;
  height: 100%;
  background-color: $pink_blue;
  position: fixed;
  top: 0;
  transition: all 0.8s ease-out;
}

.left_door {
  left: 0;
}

.right_door {
  left: 50%;
}

.open_left_door {
  left: -50%;
}

.open_right_door {
  left: 100%;
}

// 时钟动画
.clock_loading {
  width: 128px;
  height: 128px;
  position: fixed;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 0;

  border: solid 4px transparent;
  box-shadow: 0 0 20px #73c9e5;
  border-radius: 50%;
  z-index: $top_level;

  &::before,
  &::after {
    position: absolute;
    display: block;
    content: "";
    background: currentColor;
    animation: timer-loader 1250ms infinite linear;
    animation-delay: -625ms;

    top: 56px;
    left: 56px;
    width: 8px;
    border-radius: 8px;
    transform-origin: 4px 4px 0;
  }

  &::after {
    color: #fb7299;
    box-shadow: 0 0 10px #fb7299;
    height: 32px;
    animation-duration: 15s;
    animation-delay: -7.5s;
  }

  &::before {
    color: #333;
    box-shadow: 0 0 10px #333;
    height: 48px;
  }
}

@keyframes timer-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-90deg);
  }

  50% {
    transform: rotate(-180deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

@media screen and (max-width: $phone_computer) {
  .clock_loading {
    width: 64px;
    height: 64px;

    &::before,
    &::after {
      top: 26px;
      left: 26px;
      width: 4px;
      border-radius: 4px;
      transform-origin: 2px 2px 0;
    }

    &::after {
      height: 16px;
      animation-duration: 15s;
      animation-delay: -7.5s;
    }

    &::before {
      height: 24px;
    }
  }
}
</style>
