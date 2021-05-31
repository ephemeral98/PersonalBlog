<template>
  <router-link
    :to="{ name: 'article', params: { articleId: article.id } }"
    class="card hang"
    :style="
      showColor
        ? 'background-color:#73C9E5; border:none; box-shadow:0 0 10px #73C9E5;'
        : `background-image:url(${article.face})`
    "
    @mouseenter.native="showColor = true"
    @mouseleave.native="showColor = false"
  >
    <!-- <img src="../../assets/img/luna7.png" alt="" ref="preImg" /> -->
    <div class="infos">
      <div class="title">{{ article.title }}</div>
      <div class="content mt-sm-3">
        {{ article.date }}/{{ article.month }}/{{ article.year }} ·
        {{ article.category.name }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["article"],
  data: () => ({
    showColor: false
  }),
  watch: {
    article: {
      handler() {
        console.log("art:::", this.article);
      }
    }
  },
  mounted() {
    /* const layoutImg = this.$refs.preImg; // 当图片加载完成的时候，设置一下尺寸
    layoutImg.addEventListener("load", () => {
      const imgWidth = getComputedStyle(this.$refs.preImg).width;
      const imgHeight = getComputedStyle(this.$refs.preImg).height;

      if (parseInt(imgWidth) > parseInt(imgHeight)) {
        this.$refs.preImg.style.height = "100%";
      } else {
        this.$refs.preImg.style.width = "100%";
      }
    }); */
  }
};
</script>

<style lang="scss" scoped>
@keyframes sway {
  0% {
    transform: rotateZ(40deg);
  }
  100% {
    transform: rotateZ(50deg);
  }
}

.hang {
  transform: rotateZ(45deg);
}

.card {
  display: block;
  width: 18vw;
  height: 18vw;
  border-radius: 0px 20px 20px 20px;
  margin-left: 13vw;
  margin-top: 7vw;
  position: relative;
  transition: all 1s;
  // background-image: url(../../assets/img/myDesk.jpg);
  background-size: cover;
  animation: sway 0.8s ease-in-out infinite alternate;
  transform-origin: top left;
  border: solid 1px $gray;

  &::before {
    content: "";
    display: block;
    width: 17px;
    height: 17px;
    background-color: rgb(182, 2, 2);
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .infos {
    position: absolute;
    width: 100%;
    z-index: 3;
    @include center(absolute);
    text-align: center;
    color: #fff;
    overflow: hidden;

    .title {
      @include singleOverHidden;
      font-weight: bold !important;
      font-size: 2.5vw !important;
    }

    .content {
      font-size: 1vw !important;
    }
  }
}

@media screen and (max-width: $phone_computer) {
  .card {
    margin-left: 22vw;
    margin-top: 30px;
    width: 30vw;
    height: 30vw;
  }
}
</style>
