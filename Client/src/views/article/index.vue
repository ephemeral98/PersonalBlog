<template>
  <div class="article">
    <CompHead>
      <div>{{ artInfo.title || "标题" }}</div>
      <div class="art_info d-flex justify-center">
        <div class="d-flex justify-center flex-wrap">
          <div>
            <span
              >{{ artInfo.date }}.{{ artInfo.month }}.{{ artInfo.year }}</span
            >
          </div>
          <div class="iconfont">
            &#xe665; <span>{{ artInfo.readNum || 0 }}</span>
          </div>
          <div class="iconfont">
            &#xe742; <span>{{ artInfo.wordsNum || 0 }}</span>
          </div>
          <div class="iconfont">
            &#xe658; <span>{{ floorsCount || 0 }}</span>
          </div>
          <div class="iconfont">
            &#xe61a; <span>{{ artInfo.likeNum || 0 }}</span>
          </div>
        </div>
      </div>
    </CompHead>
    <v-container>
      <div class="art_content">
        <div class="introduce">
          <div class="my_title iconfont">前言 &#xe607;</div>
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
import CompHead from "@/components/common/CompHead.vue";
import CommentList from "@/components/comment/CommentList.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import ToolsBar from "@/components/common/ToolsBar";
import * as articleHttp from "@/service/ArticleService.js";
import { mapState } from "vuex";

export default {
  components: {
    CompHead,
    CommentList,
    MyFoot,
    ToolsBar
  },
  data: () => ({
    artInfo: {},
    isLikeThisTime: false // 每次只能like一次（刷新后还能继续like）
  }),
  computed: {
    ...mapState("commentStore", ["floorsCount"]),
    articleId() {
      return this.$route.params.articleId;
    }
  },

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
    // 发送ajax 获取文章信息
    const resp = await articleHttp.getArticleInfo(this.articleId);
    this.artInfo = resp;
    console.log(resp);

    this.$refs.artWord.innerHTML = this.artInfo.content; // 文章内容
    this.$refs.introContent.innerHTML = this.artInfo.introduce; // 文章介绍

    // wangEditor 如果代码块溢出。。
    const words = this.$refs.artWord;
    const codes = words.querySelectorAll("code");
    codes.forEach(c => {
      c.style.width = "100%";
      c.style.overflowX = "auto";
      c.style.display = "block";
    });

    // 异步分发，获取该文章下的评论
    this.$store.dispatch("commentStore/getMoreComments", [
      1,
      5,
      +this.articleId
    ]);
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
  > div {
    margin: 0 auto;
    background-color: rgba($my_blue, 50%);
    font-size: 15px;
    font-weight: normal;
    color: #fff;
  }

  span {
    margin-right: 18px;
  }
}

.art_content {
  .introduce {
    padding: 1.5vw;
    @include borderShadow;

    .my_title {
      border-bottom: dashed 2px $gray;
    }
  }

  .art_word {
    margin: 3vw 0;
    padding: 1.5vw;
    @include borderShadow;
    overflow: hidden;
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
