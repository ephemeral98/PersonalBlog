<template>
  <div class="comment mt-10">
    <!-- 写评论 -->
    <CommentInp />
    <div class="comment_list">
      <CommentItem
        v-for="floor in floorsData"
        :key="floor.id"
        :floor="floor"
        @who="getWho"
      />
    </div>
    <button
      class="more"
      @click="moreComment"
      v-if="floorsData && floorsData.length < floorsCount"
    >
      看更多评论
    </button>
    <div class="nomore" v-else>没有更多了...</div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import CommentInp from "./CommentInp.vue";
import { mapState } from "vuex";
export default {
  components: {
    CommentItem,
    CommentInp
  },
  data: () => ({
    loadTimes: 2 // 第2次加载开始
  }),
  computed: {
    ...mapState("commentStore", ["floorsData", "floorsCount"])
  },
  methods: {
    /**
     * 回复谁
     */
    getWho(...e) {
      console.log(e);
    },
    /**
     * 获取更多评论
     */
    async moreComment() {
      // 从第二次加载开始，每次追加载7条评论
      this.$store.dispatch("commentStore/getMoreComments", [this.loadTimes, 7]);
      this.loadTimes++;
    }
  }
};
</script>
<style lang="scss" scoped>
.comment {
  padding: 1.7vw 1vw 100px;

  position: relative;

  @include borderShadow;

  .comment_list {
    margin-top: 50px;
    // background-color: lightblue;
  }

  .more {
    width: 140px;
    padding: 5px 10px;
    border: solid 1px lighten(gray, 40%);
    font-size: 20px;
    color: gray;
    transition: all 0.8s;
    @include center(absolute);
    top: 98.5%;

    &:hover {
      box-shadow: 0 0 20px lighten(gray, 10%);
    }
  }

  .nomore {
    @extend .more;
    border: none;
    &:hover {
      box-shadow: none;
    }
  }
}
</style>
