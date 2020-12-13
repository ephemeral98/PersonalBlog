<template>
  <div class="my_card mt-7 mt-sm-0">
    <v-row class="justify-center">
      <img
        src="../../assets/img/portrait.png"
        alt=""
        class="avatar"
        ref="avatar"
        @mouseenter="spining"
        @touchstart="spining"
      />
    </v-row>
    <v-row justify="center" style="fontsize: 7vw" class="name"> Barry </v-row>
    <v-row justify="center" class="mb-5 introduce">{{ dayWords }}</v-row>
  </div>
</template>

<script>
import * as utils from "@/utils/toolsFunc.js";
import dayWordHttp from "@/service/DayWordsService.js";
export default {
  data: () => ({
    ava: null,
    rotateDeg: 90,
    dayWords: ""
  }),
  methods: {
    spining() {
      this.ava.style.transformOrigin = `bottom center`;
      this.ava.style.transform = `rotate(${this.rotateDeg}deg)`;
      this.rotateDeg += utils.getRandom(90, 270);
    }
  },
  async created() {
    this.dayWords = await dayWordHttp();
  },
  mounted() {
    this.ava = this.$refs.avatar;
  }
};
</script>

<style lang="scss" scoped>
// @import "@/assets/common/var.scss";
.my_card {
  max-height: 490px;
  overflow: auto;
  // background-color: rgba(128, 128, 128, 0.53) !important;
  padding: 5px 20px;
  box-shadow: 0 0 20px gray;
  @include borderShadow;
  &:hover {
    transform: translateY(7px);
  }

  .avatar {
    width: 70%;
    height: auto;
    border-radius: 50%;

    transition: all 0.5s;
  }

  .name {
    font-weight: bold;
  }
}

// 手机屏
@media screen and (max-width: $phone_computer) {
  .my_card {
    width: 60vw !important;
    .name {
      font-size: 7vw;
    }
  }

  .introduce {
    @include mulOverHidden; // 手机端，超过3行溢出隐藏打点显示
  }
}

// 电脑屏
@media screen and (min-width: $phone_computer) {
  .my_card {
    .name {
      font-size: 2.3vw;
    }
  }
}
</style>
