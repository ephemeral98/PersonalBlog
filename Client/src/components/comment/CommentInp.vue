<template>
  <div class="comment_inp">
    <v-row class="my_title iconfont">评论 &#xe658;</v-row>
    <v-row>
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
    </v-row>
    <v-row class="mt-2">
      <v-col>
        <input type="text" placeholder="称呼" class="mt-2" v-model="nickName" />
      </v-col>
      <v-col
        ><input type="text" placeholder="邮箱" class="mt-2" v-model="email"
      /></v-col>
    </v-row>
    <v-row class="mt-5">
      <button class="sub" @click="submit">提交评论</button>
    </v-row>
    <transition
      enter-active-class="animate__animated animate__zoomInDown"
      leave-active-class="animate__animated animate__zoomOutDown"
    >
      <v-alert
        class="status_msg"
        :color="alertConfig.alertColor"
        dense
        elevation="8"
        outlined
        prominent
        text
        :type="alertConfig.type"
        v-if="alertConfig.isShowAlert"
        >{{ alertConfig.alertContent }}</v-alert
      >
    </transition>
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
      alertContent: "",
      isShowAlert: false,
      msgContent: "",
      type: "success",
      alertColor: "green"
    },
    nickName: "",
    parent: -1, // 默认是层主
    email: "",
    commentContent: ""
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
    controlMax() {
      const len = this.commentContent.length;
      if (len >= 300) {
        this.commentContent = this.commentContent.slice(0, 300);
      }
    },

    async submit() {
      // console.log(this.floorId, this.replyerName);
      const {
        blogId,
        nickName,
        email,
        floorId,
        commentContent,
        replyerName
      } = this;
      if (!this.commentContent) {
        handleAlert.handleEmpty(this);
        return;
      }
      this.nickName = nickName ? nickName : "匿名";
      console.log(this.nickName);
      this.parent = floorId ? floorId : "-1";
      const parent = this.parent;
      const addCommentConfig = {
        blogId,
        parent,
        nickName: this.nickName,
        commentContent,
        email,
        toWho: replyerName,
        tag: "1"
      };
      // 发送ajax请求
      const resp = await commentHttp.addNewComment(addCommentConfig);
      handleAlert.handleRes(this, resp, "评论成功", "评论失败");
      // 清空输入内容
      this.commentContent = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.comment_inp {
  background-color: $square_bgColor;
}

.my_title {
  font-size: 1.3rem;
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

.count {
  color: darken($gray, 10%);
  font-style: italic;
  font-size: 12px;
}

.sub {
  width: 100%;
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

.status_msg {
  @include modal_center(300px, 60px);
  text-align: center;
}
</style>
