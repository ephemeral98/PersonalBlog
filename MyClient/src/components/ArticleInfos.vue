<template>
  <div class="article_info">
    <header style="text-align: center">
      <span>文章信息</span>
    </header>
    <div class="info_chunk">
      <div
        class="content"
        v-for="(value, key, i) in this.articleDetailInfo"
        :key="i"
      >
        <span class="name">{{ value.name }}：</span>
        <router-link
          class="val"
          v-if="key === 'commentNum'"
          :to="{ name: 'comments', params: { articleId: articleId } }"
          >评论总数：{{ commentsCount || "0" }}， 楼层数：{{
            floorsCount || "0"
          }}</router-link
        >
        <span class="val" v-else>{{ value.val || "0" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    /* articleDetailInfo: {
      wordNum: { name: "字数", val: 0 },
      readNum: { name: "阅读数", val: 0 },
      likeNum: { name: "点赞数", val: 0 },
      commentNum: { name: "评论数", val: null }
    } */
  }),
  computed: {
    ...mapState("commentStore", ["floorsData", "floorsCount", "commentsCount"]),
    ...mapState("articleStore", ["articleDetail"]),
    articleId() {
      // console.log(this.$store);
      return this.$route.params.id;
    },
    articleDetailInfo() {
      return {
        wordNum: {
          name: "字数",
          val: this.articleDetail ? this.articleDetail.wordsNum : ""
        },
        readNum: {
          name: "阅读数",
          val: this.articleDetail ? this.articleDetail.readNum : ""
        },
        likeNum: {
          name: "点赞数",
          val: this.articleDetail ? this.articleDetail.likeNum : ""
        },
        commentNum: { name: "评论数", val: null }
      };
    }
  },
  mounted() {
    this.$store.dispatch("commentStore/getMoreComments", [
      1,
      5,
      this.articleId
    ]); // temp: +id
  }
};
</script>

<style lang="scss" scoped>
.article_info {
  overflow: auto;
  height: 100%;
  position: relative;

  header {
    width: 100%;
    height: 50px;
    font-size: 24px;
    line-height: 50px;
    border-bottom: solid 2px rgb(129, 166, 214);
    border-radius: 8px;
    position: fixed;
    background: rgba(203, 242, 253, 0.404);
  }
  .info_chunk {
    width: 98%;
    // margin: 150px auto 0;
    @include center(absolute);
    border: solid 1.5px rgba(190, 190, 190, 0.541);
    border-radius: 8px;
    box-shadow: 0 0 2px gray;
    text-align: left;
    font-size: 20px;

    > .content {
      width: 100%;
      height: 70px;
      text-align: left;
      font-size: 20px;
      line-height: 70px;
      display: flex;

      .name {
        flex: 0 0 150px;
        text-align: center;
      }

      .val {
        flex: 1 0 auto;
        padding: 0 10px;
      }

      &:nth-child(2n) .name {
        background-color: #d9d9d9;
      }
      &:nth-child(2n-1) .val {
        background-color: #d9d9d9;
      }
    }
  }
}
</style>
