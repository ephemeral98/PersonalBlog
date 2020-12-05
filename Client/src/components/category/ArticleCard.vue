<template>
  <router-link
    :to="{ name: 'article', params: { articleId: 4 } }"
    class="card hang"
  >
    <!-- <img src="../../assets/img/luna7.png" alt="" ref="preImg" /> -->
    <div class="infos">
      <div class="title">这是标题</div>
      <div class="content mt-sm-3">2020-11-15 · 数码科技</div>
    </div>
  </router-link>
</template>

<script>
export default {
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
  overflow: hidden;
  position: relative;
  background-image: url(../../assets/img/luna7.png);
  background-size: cover;
  animation: sway 0.8s ease-in-out infinite alternate;
  transform-origin: top left;

  .infos {
    position: absolute;
    width: 100%;
    z-index: 3;
    @include center(absolute);
    text-align: center;
    color: #fff;

    .title {
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
