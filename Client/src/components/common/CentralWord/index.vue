<template>
  <div class="center_word">
    <!-- 开始页显示这个 -->
    <transition
      enter-active-class="animate__animated animate__flip"
      leave-active-class="animate__animated animate__rollOut"
      v-if="isBegin"
    >
      <v-row class="spot_name" justify="center" ref="welcome" v-if="isShowWord"
        >{{ welcomeWord }}
        <div class="flash">{{ welcomeWord }}</div>
      </v-row>
    </transition>
    <!-- 非开始页显示这个 -->
    <v-row class="spot_name" justify="center" ref="welcome" v-else
      >{{ welcomeWord }}
      <div class="flash">{{ welcomeWord }}</div>
    </v-row>
    <!-- 插入打字效果 -->
    <slot></slot>
  </div>
</template>
<style></style>
<script>
export default {
  props: ["welcomeWord", "isBegin"],
  data: () => ({
    spoitLightTime: 10000,
    isShowWord: false,
    spotTimer: null
  }),
  mounted() {
    this.spotTimer = setTimeout(() => {
      this.$refs.welcome && this.$refs.welcome.classList.remove("spot_name");
      this.$refs.welcome && this.$refs.welcome.classList.add("hold_name");
    }, this.spoitLightTime);

    this.isShowWord = true;
  },
  beforeDestroy() {
    clearTimeout(this.spotTimer);
    clearInterval(window.plusTimer);
    clearInterval(window.minusTimer);
  }
};
</script>
<style></style>

<style lang="scss" scoped>
@keyframes spotlight {
  0% {
    clip-path: circle(7vw at 0% 50%);
  }
  50% {
    clip-path: circle(7vw at 100% 50%);
  }
  100% {
    clip-path: circle(7vw at 0% 50%);
  }
}

.center_word {
  width: 100vw;
  @include center(absolute);
  color: #fff;

  .hold_name {
    font-size: 8vw;
    font-weight: bold;
    color: #333;

    .flash {
      @include txtGradient("", $my_blue, $my_pink, plum);
    }
  }

  .spot_name {
    @extend .hold_name;

    .flash {
      z-index: 10;
      clip-path: circle(7vw at 0% 50%);
      animation-name: spotlight;
      animation-duration: 2s;
      animation-iteration-count: 5;
    }
  }

  .introduce {
    font-size: 2vw;
    color: #fff;
    padding: 0 20px;
  }
}
</style>
