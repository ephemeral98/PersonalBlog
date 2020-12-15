<template>
  <div class="">
    <b-alert
      class="status_msg"
      :show="alertConfig.dismissCountDown"
      dismissible
      :variant="alertConfig.color"
      @dismissed="alertConfig.dismissCountDown = 0"
    >
      {{ alertConfig.word }}
    </b-alert>
    <div class="title">评论</div>
    <div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        :placeholder="
          replyerName ? `@${replyerName}：` : '留下你的宝贵建议吧...'
        "
        v-model="commentContent"
        v-focus="replyerName"
        @keydown="controlMax"
        maxlength="300"
      ></textarea>
      <div class="count">{{ commentContent.length }}/300</div>
    </div>
    <button class="sub mt-2" @click="submit">提交评论</button>
  </div>
</template>

<script>
import * as commentHttp from "@/service/CommentService.js";
import * as handleAlert from "@/utils/handleAlertStatus.js";
import { mapState } from "vuex";
export default {
  directives: {
    focus: {
      update: (el, binding) => {
        // console.log(binding, binding.value, binding.oldValue);
        if (binding.value !== binding.oldValue) {
          el.focus();
        }
      }
    }
  },
  data: () => ({
    alertConfig: {
      dismissCountDown: 0,
      word: "无",
      color: "info"
    },
    commentContent: "",
    nickName: "Barry",
    email: "",
    parent: -1, // 默认是层主
    blogOwner: null,
    countDown: 2 // 倒计时 n秒 刷新
  }),
  computed: {
    ...mapState("commentStore", {
      floorId: "floorId",
      replyerName: "nickName"
    }),
    blogId() {
      return this.$route.params.articleId || -1; // 默认是留言板的评论
    }
  },
  methods: {
    // 控制字数
    controlMax() {
      const len = this.commentContent.length;
      if (len >= 300) {
        this.commentContent = this.commentContent.slice(0, 300);
      }
    },

    // 提交评论
    async submit() {
      // console.log(this.floorId, this.replyerName);
      const {
        blogId,
        nickName,
        email,
        floorId,
        blogOwner,
        commentContent,
        replyerName
      } = this;
      console.log(floorId, blogOwner, commentContent, replyerName);
      if (!commentContent) {
        handleAlert.handleEmpty(this);
        return;
      }
      this.parent = floorId || "-1";
      const parent = this.parent;
      const addCommentConfig = {
        blogId,
        parent,
        nickName,
        commentContent,
        email,
        toWho: replyerName,
        tag: blogOwner
      };
      // 发送ajax请求, 添加一条评论
      const resp = await commentHttp.addNewComment(addCommentConfig);
      // 清空输入内容
      this.commentContent = "";
      handleAlert.handleRes(resp.data, this);
    }
  },
  async created() {
    this.blogOwner = "0";
    /* const resp = await this.$store.dispatch("adminStore/whoAmI"); // 获取身份
    if (resp) {
      console.log(this.$store.state.adminStore.data);
      const { loginId } = this.$store.state.adminStore.data;
      if (loginId) {
        this.blogOwner = "0";
      }
    } */
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 30px;
}

.count {
  color: darken($gray, 10%);
  font-style: italic;
  font-size: 12px;
}

textarea,
input {
  padding: 1vw 1vw;
  border-radius: 7px;
  border: dashed 1.2px rgb(187, 187, 187);

  &:focus {
    border: solid 1.2px skyblue;
  }

  &::placeholder {
    font-style: italic;
  }
}

textarea {
  width: 100%;
}

.sub {
  align-self: flex-start;
  width: 15vw;
  height: 6.8vh;
  background: linear-gradient(to right, $my_blue, $my_pink);
  border-radius: 20px;
  font-size: 3.2vh;
  transition: all 0.2s;
  color: #fff;

  &:hover {
    box-shadow: 0 0 20px plum;
  }
}
</style>
