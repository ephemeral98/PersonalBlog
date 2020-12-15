<template>
  <transition-group
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__rollOut"
  >
    <!-- 更新发布弹窗 -->
    <MyModal
      v-if="showDeclareModal"
      :basicConfig="showDeclareConfig"
      @close-modal="$emit('show-declaremodal', false)"
      key="showDeclareModal"
    >
      <template #title>
        <div class="title">请输入文章介绍</div>
      </template>
      <template #content>
        <textarea
          name=""
          class="kindName"
          v-model="introduceContent"
        ></textarea>
      </template>
      <template #controlBtn>
        <button class="confirm_btn" @click="confirmSubmit(introduceContent)">
          确认发布
        </button>
        <button class="cancel_btn" @click="$emit('show-declaremodal', false)">
          取消
        </button>
      </template>
    </MyModal>

    <!-- 成功弹窗 -->
    <MyModal
      v-if="succModal"
      :basicConfig="succConfig"
      @close-modal="confirmSucc"
      key="succModal"
      @click="succModal = false"
    >
      <template v-slot:content>
        <div class="content">{{ statusMsg }}</div>
      </template>
      <template v-slot:controlBtn>
        <button class="confirm_btn" @click="confirmSucc">Ok</button>
      </template>
    </MyModal>
    <!-- 失败弹窗 -->
    <MyModal
      v-if="failModal"
      :basicConfig="failConfig"
      @close-modal="failModal = false"
      key="failModal"
    >
      <template v-slot:title>
        <div class="title">发布失败</div>
      </template>
      <template v-slot:content>
        <div class="content">{{ statusMsg }}</div>
      </template>
      <template v-slot:controlBtn>
        <button class="cancel_btn" @click="failModal = false">Cancel</button>
      </template>
    </MyModal>
  </transition-group>
</template>

<script>
import MyModal from "../tools/MyModal";
import * as articleHttp from "../../service/ArticleService.js";
export default {
  props: ["showDeclareModal", "showDelModal", "updateConfig", "illegalConfig"],
  components: {
    MyModal
  },
  data() {
    return {
      succModal: false,
      failModal: false,
      introduceContent: "无",
      delKindByNameContent: "无",
      statusMsg: "",
      showDeclareConfig: {
        msg: false
      },
      showDelConfig: {
        msg: false
      },
      succConfig: {
        msg: true,
        modalStyle: {
          boxShadow: "0 0 20px #c8e6c6"
        }
      },
      failConfig: {
        msg: true,
        modalStyle: {
          boxShadow: "0 0 20px red"
        }
      }
    };
  },
  methods: {
    // 更新发布
    async confirmSubmit(tex) {
      // this.$emit("kind-name", e);

      // 发送一个请求：发布or更新文章
      const {
        id,
        title,
        content,
        issueId,
        CategoryId,
        surface,
        wordsNum
      } = this.updateConfig;
      const res = await articleHttp.declare({
        id,
        introduce: tex,
        title,
        content,
        issueId,
        CategoryId,
        surface,
        wordsNum
      });
      // 清空消息，关闭弹窗
      // 如果是更新的话就不要清空了
      if (!this.updateConfig) {
        this.introduceContent = "无";
      }
      this.$emit("show-declaremodal", false);
      // 返回的消息
      this.statusMsg = res.data.msg;
      if (res.data.status === "success") {
        // 成功弹窗
        this.succModal = true;
      } else {
        // 失败弹窗
        this.failModal = true;
      }
    },
    /**
     * 确认成功
     */
    confirmSucc() {
      this.succModal = false;
      /**
       * 刷新一下页面
       */
      // 由于标题以改变，要重新埋一下标题
      this.$router.go(0);
    }
  },

  created() {
    if (this.illegalConfig) {
      this.statusMsg = this.illegalConfig;
      this.failModal = true;
      this.$emit("accept-illeagal", "");
    }
    // 文章的介绍数据 是 updateArticle 拿到的，传给 MyEditor，再当MyEditor拿到传给我的时候，已经不再是异步传输了
    this.introduceContent = this.updateConfig.introduceContent;
  },

  watch: {
    illegalConfig(val) {
      if (val) {
        this.statusMsg = this.illegalConfig;
        this.failModal = true;
        this.$emit("accept-illeagal", "");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/common/myBtn.scss";
@import "../../assets/common/center.scss";
.v-enter-to,
.v-leave-to {
  @include modal__center;
}
.kindName {
  font-size: 18px;
  margin: 20px;
  border: none;
}
</style>
