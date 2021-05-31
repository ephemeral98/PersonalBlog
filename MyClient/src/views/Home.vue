<template>
  <div class="home">
    <div class="content">
      <div class="title">
        —— Welcome home, <span class="user">{{ adminInfos.nickName }}</span> ——
      </div>
      <router-link to="/write" class="">写</router-link> |
      <router-link to="/showDatas" class="">查看数据</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState("adminStore", {
      adminInfos: "data"
    })
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common/center.scss";
.home {
  height: 100%;
  background-image: linear-gradient(to right bottom, $my_blue, $my_pink);

  .content {
    background-color: #fff;
    width: 100%;
    font-size: 30px;
    @include center(absolute);
    text-align: center;

    .title {
      font-size: 50px;
      margin: 20px 0;
    }

    a {
    }
  }
}
</style>
