<template>
  <div class="articleDetail">
    <router-link class="home" :to="{ name: 'Home' }">首页</router-link>
    <a href="javascript:void(0)" class="back" @click="back">返回分类</a>
    <transition enter-active-class="animate__animated animate__bounceInDown">
      <!-- <StatusModal
        :StatusConfig="toStatusModal"
        v-if="showStatus"
        @close-status-modal="handleCloseStatus"
      /> -->
    </transition>
    <full-page :options="options">
      <div class="section">
        <!-- 修改文章内容区 -->
        <div class="editorArea">
          <MyEditor :artcleInfos="editorInfo" />
        </div>
      </div>
      <div class="section">
        <!-- 文章信息区 -->
        <div class="articlecomment">
          <ArticleInfos v-if="isShowInfos" :articleDetailInfo="toArtConfig" />
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import MyEditor from "../../components/MyEditor";
import ArticleInfos from "../../components/ArticleInfos.vue";
import * as ArticleHttp from "../../service/ArticleService.js";

export default {
  components: {
    MyEditor,
    ArticleInfos
  },

  data() {
    return {
      artDetail: {}, // 用来装一篇文章的所有信息
      toStatusModal: {},
      showStatus: false,
      isShowInfos: false,
      isShowIssue: false,
      options: {
        afterLoad: this.afterLoad,
        scrollOverflow: true,
        scrollBar: false,
        keyboardScrolling: true,
        // anchors: ['page1', 'page2', 'page3'],
        sectionsColor: [
          "#41b883",
          "#fff",
          "#fff",
          "#fec401",
          "#1bcee6",
          "#ee1a59",
          "#2c3e4f",
          "#ba5be9",
          "#b4b8ab"
        ]
      },
      toArtConfig: {}
    };
  },
  computed: {
    editorInfo() {
      // 给myEditor的信息（标题和内容）
      return this.artDetail;
    }
  },
  methods: {
    afterLoad: function(origin, destination) {
      // fullpage 滚到第 n 屏的时候
      if (destination.index === 1) {
        this.isShowInfos = true;
      } else if (destination.index === 2) {
        this.isShowIssue = true;
      }
    },
    handleCloseStatus() {
      this.showStatus = false;
      this.$router.go(0);
    },
    handleOpenStatus(e) {
      this.toStatusModal = {
        StatusContent: e.msg
      };
      if (e.status === "success") {
        // 打开成功状态的模态框
        this.toStatusModal.btn = "Ok";
        this.toStatusModal.halo = "0 0 20px 0 #c0d6cb";
      } else {
        this.toStatusModal.btn = "Cancel";
        this.toStatusModal.halo = "0 0 20px 0 red";
      }
      this.showStatus = true;
    },
    back() {
      this.$router.back();
    }
  },
  watch: {
    artDetail() {
      this.toArtConfig = {
        wordNum: { name: "字数", val: this.artDetail.wordsNum },
        readNum: { name: "阅读数", val: this.artDetail.readNum },
        likeNum: { name: "点赞数", val: this.artDetail.likeNum },
        commentNum: { name: "评论数", val: null }
      };
    }
  },
  async created() {
    const id = this.$route.params.id;
    const articleInfo = await ArticleHttp.findAticleById(id);
    this.artDetail = articleInfo.data.data; // 一篇文章的细节信息

    // 异步分发，获取该文章下的评论
    this.$store.dispatch("commentStore/getMoreComments", [1, 5, 4]); // temp: +id
    // this.floorsCount = this.$store.state.commentStore.floorsCount;
    console.log(this.$store.state);

    console.log("文章的所有细节信息都拿到了。", this.artDetail);
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/common/center.scss";
.v-enter-to {
  @include modal__center;
}

.articleDetail {
  height: 100%;

  // 编辑器栏
  .editorArea {
    height: 100%;
    // color: #ff5e4557;
  }

  // 信息栏
  .articlecomment,
  .articleInfos {
    overflow: auto;
    height: 100%;
  }

  .back {
    background-color: rgba($my_blue, 0.4);
    display: block;
    padding: 5px;
    position: fixed;
    top: 0;
    z-index: 9;
    margin-top: 100px;

    &:hover {
      color: #fff;
      background-color: $my_pink;
    }
  }
  .home {
    @extend .back;
    margin-top: 50px;
  }
}
</style>
