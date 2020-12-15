<template>
  <transition-group
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__rollOut"
  >
    <!-- 批量删除文章弹窗 -->
    <MyModal
      v-if="isShowDel"
      :basicConfig="delArtConfig"
      @close-modal="isShowDel = false"
      key="delArtModal"
    >
      <template #content>
        <div class="content">{{ delTitleGroup }}</div>
      </template>
      <template #controlBtn>
        <button class="confirm_btn" @click="confirmSubmit">确认删除</button>
        <button class="cancel_btn" @click="isShowDel = false">取消</button>
      </template>
    </MyModal>

    <!-- 成功弹窗 -->
    <MyModal
      v-if="succModal"
      :basicConfig="succConfig"
      @close-modal="confirmSucc"
      key="succModal"
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
        <div class="title">删除失败</div>
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
import * as articlesHttp from "../../service/ArticleService.js";

export default {
  props: ["toFailModal", "toDelModal"],
  components: {
    MyModal
  },
  data() {
    return {
      statusMsg: "无",
      succModal: false,
      failModal: false,
      isShowDel: false,
      delGroup: [],
      //   delArtModal: false,
      delArtConfig: {
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
    /**
     * 确认删除文章
     */
    async confirmSubmit() {
      // 先把infoModal隐藏
      this.isShowDel = false;

      // 获取删除的文章id，array
      const ids = this.delGroup.reduce((accu, art) => {
        accu.push(art.id);
        return accu;
      }, []);
      const resp = await articlesHttp.delArticle(ids); //temp

      this.statusMsg = resp.data.msg;
      if (resp.data.status === "success") {
        this.succModal = true;
      } else {
        this.failModal = true;
      }
    },

    // 确认删除Ok
    confirmSucc() {
      this.succModal = false;
      this.$router.go(0);
    }
  },
  watch: {
    toFailModal: {
      handler(val) {
        this.statusMsg = val.content;
        this.failModal = val.isShow;
      },
      deep: true,
      immediate: true
    },
    toDelModal: {
      handler(val) {
        this.delGroup = val.data;
        this.isShowDel = val.isShow;
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    /**
     * 批量删除文章
     */
    delTitleGroup() {
      let delTitle = "";
      for (let i = 0, len = this.delGroup.length; i < len; i++) {
        delTitle += this.delGroup[i].title;
        if (i === len - 1) {
          delTitle += "?";
        } else {
          delTitle += "、";
        }
      }
      // 弹窗确认
      return `确定要删除：${delTitle}`;
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
</style>
