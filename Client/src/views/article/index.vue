<template>
  <div class="article">
    <TopBar />
    <CompHead>
      <div>{{ artInfo.title || "标题" }}</div>
      <div class="art_info d-flex justify-center flex-wrap">
        <div>
          <span>{{ artInfo.month }}.{{ artInfo.date }}.{{ artInfo.year }}</span>
        </div>
        <div>
          阅读：<span>{{ artInfo.readNum }}</span>
        </div>
        <div>
          字数：<span>{{ artInfo.wordNum }}</span>
        </div>
        <div>
          评论：<span>{{ floorsCount || 0 }}</span>
        </div>
        <div>
          点赞：<span>{{ artInfo.likeNum || 0 }}</span>
        </div>
      </div>
    </CompHead>
    <v-container>
      <div class="art_content">
        <div class="introduce">
          <div class="title">前言</div>
          <div class="intro_content" ref="introContent"></div>
        </div>
        <div class="art_word">
          <div class="word" ref="artWord">
            <!-- {{ artInfo.content || 无 }} -->
          </div>
        </div>
      </div>
      <hr class="devide" />
      <CommentList />
    </v-container>
    <MyFoot />

    <!-- <div class="like">赞</div> -->
    <ToolsBar>
      <v-icon class="thumb" @click="giveLike">mdi-thumb-up</v-icon>
    </ToolsBar>
  </div>
</template>

<script>
import TopBar from "@/components/common/TopBar";
import CompHead from "@/components/common/CompHead.vue";
import CommentList from "@/components/comment/CommentList.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import ToolsBar from "@/components/common/ToolsBar";
import * as articleHttp from "@/service/ArticleService.js";

export default {
  components: {
    TopBar,
    CompHead,
    CommentList,
    MyFoot,
    ToolsBar
  },
  data: () => ({
    artInfo: {},
    articleId: null,
    floorsCount: 0,
    isLikeThisTime: false // 每次只能like一次（刷新后还能继续like）
  }),
  methods: {
    async giveLike(e) {
      if (this.isLikeThisTime) {
        return;
      }
      console.log("like", this.articleId);
      const resp = await articleHttp.addLike(this.articleId);
      // console.log(resp);
      if (resp) {
        e.target.classList.add("like_picked");
      }
      this.isLikeThisTime = true;
    }
  },
  async created() {
    const { articleId } = this.$route.params; // 该文章的id
    this.articleId = articleId;
    // 发送ajax 获取文章信息
    const resp = await articleHttp.getArticleInfo(articleId);
    this.artInfo = resp;
    console.log(resp);

    this.$refs.artWord.innerHTML = this.artInfo.content; // 文章内容
    this.$refs.introContent.innerHTML = this.artInfo.introduce; // 文章介绍

    // 异步分发，获取该文章下的评论
    this.$store.dispatch("commentStore/getMoreComments", [1, 5, +articleId]);
    this.floorsCount = this.$store.state.commentStore.floorsCount;
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>
<style lang="scss" scoped>
.article {
  .container {
    margin-top: 100px;
    border-radius: 10px;
  }
}
.art_info {
  width: 100vw;
  font-size: 15px;
  font-weight: normal;
  color: gray;

  span {
    margin-right: 18px;
  }
}

.art_content {
  .introduce {
    padding: 1.5vw;
    @include borderShadow;

    .title {
      border-bottom: dashed 2px $gray;
    }
  }

  .art_word {
    margin: 3vw 0;
    padding: 1.5vw;
    @include borderShadow;
  }
}

.devide {
  margin: 7vh 0;
  border: dashed 1.5px $my_blue;
  border-left: none;
  border-right: none;
}

.like_picked {
  transform: rotateZ(-15deg);
  color: $my_blue;
  border: dashed 2px $my_pink;
  border-radius: 50%;
  padding: 7px;
}
</style>
