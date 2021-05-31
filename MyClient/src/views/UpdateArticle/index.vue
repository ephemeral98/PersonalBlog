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
          <MyEditor />
        </div>
      </div>
      <div class="section">
        <!-- 文章信息区 -->
        <div class="articlecomment">
          <ArticleInfos :articleDetailInfo="toArtConfig" />
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import MyEditor from "../../components/MyEditor";
import ArticleInfos from "../../components/ArticleInfos.vue";
// import * as ArticleHttp from "../../service/ArticleService.js";

export default {
  components: {
    MyEditor,
    ArticleInfos
  },

  data() {
    return {
      toStatusModal: {},
      showStatus: false,
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
  async created() {
    console.log(this);
    const id = this.$route.params.id;
    // 一篇文章的细节信息
    this.$store.dispatch("articleStore/getArtById", id);
    console.log("hello");
  },
  beforeDestroy() {
    this.$store.state.articleStore.articleDetail = null;
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
    background-color: $gray;
    display: block;
    padding: 5px;
    position: fixed;
    top: 0;
    z-index: 9;
    margin-top: 100px;
    color: gray;

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
