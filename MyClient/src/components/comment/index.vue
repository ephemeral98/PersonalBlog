<template>
  <div class="comment">
    <aside>
      <button class="back_article iconfont" @click="back" v-if="isShowBackArt">
        返回文章 &#xe60f;
      </button>
      <button class="delMany iconfont" @click="delMany">
        批量删除 &#xe651;
      </button>
      <router-link class="home iconfont" :to="{ name: 'Home' }"
        >回到首页 &#xe503;</router-link
      >
    </aside>
    <CommentList
      class="content"
      :getPickName="isGetPickName"
      @noPick="isGetPickName = $event"
    />
  </div>
</template>

<script>
import CommentList from "@/components/comment/CommentList.vue";
export default {
  components: {
    CommentList
  },
  data: () => ({
    isGetPickName: false
  }),
  computed: {
    isShowBackArt() {
      console.log(this.$route.params);
      return this.$route.params.articleId;
    },
    articleId() {
      return this.$route.params.articleId || -1;
    }
  },
  methods: {
    back() {
      history.back();
    },
    delMany() {
      console.log("del many");
      this.isGetPickName = true;
    }
  },
  created() {
    this.$store.dispatch("commentStore/getMoreComments", [
      1,
      5,
      +this.articleId
    ]);
  }
};
</script>
<style lang="scss" scoped>
.comment {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  aside {
    position: fixed;
    top: 10%;
    right: 0;
    z-index: 9;

    .btn {
      width: 100px;
      height: 50px;
      background-color: lighten($gray, 5%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      margin: 1vw 0;
      color: #fff;
      // border-radius: 10px;

      &:hover {
        color: darken($my_blue, 30%);
        background-color: rgba($my_pink, 100%);
      }
    }

    .back_article {
      @extend .btn;
    }

    .delMany {
      @extend .btn;
    }

    .home {
      @extend .btn;
    }
  }

  .content {
    margin-top: 60px;
  }
}
</style>
