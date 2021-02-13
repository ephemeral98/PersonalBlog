<template>
  <div
    class="my_card mt-sm-4 d-flex align-center flex-column"
    :class="menuCard ? 'menu_card' : null"
  >
    <!-- <v-row class="justify-center" style="width: 100%; max-height: 100%"> -->
    <img
<<<<<<< HEAD
      :src="`${globalConst.qiBaseURL}/portrait.png`"
=======
      src="http://qm23h04eq.hn-bkt.clouddn.com/portrait.png"
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
      alt=""
      class="avatar"
      ref="avatar"
      @mouseenter="spining"
      @touchstart="spining"
    />
    <!-- </v-row> -->
    <div style="fontsize: 28px" class="name">Barry</div>
<<<<<<< HEAD
    <div class="introduce" style="text-align: center">{{ dayWords }}</div>
=======
    <div class="introduce" style="text-align:center">{{ dayWords }}</div>
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
  </div>
</template>

<script>
import * as utils from "@/utils/toolsFunc.js";
import dayWordHttp from "@/service/DayWordsService.js";
export default {
  props: ["menuCard"],
  data: () => ({
    ava: null,
    rotateDeg: 90,
    dayWords: ""
  }),
  methods: {
    spining() {
      this.ava.style.transformOrigin = `center center`;
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
  // max-height: 490px;
  width: 60vw;
  overflow: auto;
  overflow-x: hidden;
  // background-color: rgba(240, 2, 2, 0.53) !important;
  padding: 5px 20px;
  box-shadow: 0 0 20px gray;
  @include borderShadow;
  &:hover {
    transform: translateY(7px);
  }

  .avatar {
    width: 100%;
    border-radius: 50%;

    transition: all 0.5s;
  }

  .name {
    font-weight: bold;
  }
}

.menu_card {
  img {
    width: 80% !important;
  }
  .name {
    font-size: 6vw !important;
  }
  .introduce {
    font-size: 2.5vw !important;
  }
}

// 手机屏
@media screen and (max-width: $phone_computer) {
  .my_card {
    width: 60vw !important;
    .name {
      font-size: 28px;
    }
  }

  .introduce {
    margin: 5px 0 !important;
    padding: 0 10px !important;
    // font-size: 1vw;

    @include mulOverHidden(2); // 手机端，超过2行溢出隐藏打点显示
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
