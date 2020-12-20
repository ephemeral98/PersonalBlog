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

    <!-- 上传图片弹窗 -->
    <MyModal
      v-show="uploadConfig.isShow"
      :basicConfig="basicUpConfig"
      @close-modal="$emit('show-uploadmodal')"
      key="uploadModal"
    >
      <template #title>
        <div class="title picked_name">
          {{ pickedName ? `已选：${pickedName}` : "请选择图片" }}
        </div>
      </template>
      <template #content>
        <div class="content">
          <img :src="uploadImg" alt="" ref="upImg" />
          <input type="file" class="upload_btn" @change="changeUpload" />
        </div>
      </template>
      <template #controlBtn>
        <button class="cancel_btn" @click="$emit('show-uploadmodal')">
          Ok
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
        <div class="content">{{ statusMsg || "成功" }}</div>
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
        <div class="content">{{ statusMsg || "失败" }}</div>
      </template>
      <template v-slot:controlBtn>
        <button class="cancel_btn" @click="failModal = false">Cancel</button>
      </template>
    </MyModal>
  </transition-group>
</template>

<script>
import MyModal from "../tools/MyModal";
import * as articleHttp from "@/service/ArticleService.js";
import * as uploadHttp from "@/service/UploadService.js";
import { mapState } from "vuex";
import fplaceHolerImg from "@/assets/img/portrait.png";
export default {
  props: [
    "showDeclareModal",
    "showDelModal",
    "updateConfig",
    "illegalConfig",
    "uploadConfig"
  ],
  components: {
    MyModal
  },
  data() {
    return {
      pickedName: null,
      newUploadImg: "",
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
      basicUpConfig: {
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
  computed: {
    ...mapState("articleStore", ["articleDetail"]),
    uploadImg() {
      return (this.articleDetail && this.articleDetail.face) || fplaceHolerImg;
    },
    articleId() {
      return this.$route.params.id;
    }
  },
  methods: {
    changeUpload(e) {
      console.log(e.target.files[0]);
      this.newUploadImg = e.target.files;
      this.pickedName = e.target.files[0].name;
      // 图片预览
      const f = e.target.files[0];
      const src = window.URL.createObjectURL(f);
      console.log(src);
      console.log(this.$refs.upImg);
      this.$refs.upImg.src = src;
    },

    async confirmUp(upImg) {
      console.log(upImg);
      const fData = new FormData();
      fData.append("singleImg", upImg[0], upImg[0].name);
      const resp = await uploadHttp.upSingle(fData);
      console.log(resp);
      if (resp.data.status === "success") {
        // 把路径保存下来
        // this.newUploadImg = resp.data.data;
        // return require(`../../assets/logo.png`);
        return resp.data.data;
      }
      // 失败弹窗
      this.failModal = true;
      this.statusMsg = resp.data.msg;
    },

    // 更新发布
    async confirmSubmit(tex) {
      // this.$emit("kind-name", e);
      let src;
      if (this.newUploadImg) {
        // 先获取上传图片返回来的路径
        src = await this.confirmUp(this.newUploadImg);
        console.log(src);
      }
      // 发送一个请求：发布or更新文章
      const {
        title,
        content,
        issueId,
        CategoryId,
        surface,
        wordsNum
      } = this.updateConfig;
      const res = await articleHttp.declare({
        id: this.articleId,
        introduce: tex,
        title,
        content,
        issueId,
        CategoryId,
        surface,
        wordsNum,
        face: src || this.uploadImg
      });
      // 清空消息，关闭弹窗
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
  },

  watch: {
    illegalConfig(val) {
      if (val) {
        this.statusMsg = this.illegalConfig;
        this.failModal = true;
        this.$emit("accept-illeagal", "");
      }
    },
    articleDetail() {
      this.introduceContent = this.articleDetail
        ? this.articleDetail.introduce
        : "";
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

.content {
  position: relative;

  img {
    width: 300px;
    height: 300px;
    border: solid 1.2px $my_blue;
    display: block;
    margin: 0 auto;
  }

  .upload_btn {
    width: 300px;
    height: 300px;
    @include center(absolute);
    opacity: 0;
    font-size: 0;
    cursor: pointer;
  }
}

.picked_name {
  @include mulOverHidden(3);
}
</style>
