<template>
  <div class="list">
    <Article
      v-for="(art, i) in articles"
      :art="art"
      :queue="i"
      :key="art.id"
      class="art_item"
    />
  </div>
</template>

<script>
import Article from "./Article.vue";
export default {
  name: "articleListComp",
  props: ["articles"],
  components: {
    Article
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;

  .art_item {
    margin: 2.3vh 0 !important;
    background-color: $square_bgColor;

    &:first-child {
      margin-top: 0;
    }
  }

  // 手机屏
  @media screen and (max-width: $phone_computer) {
    .art_item {
      height: 70vh;
    }
  }
}
</style>
