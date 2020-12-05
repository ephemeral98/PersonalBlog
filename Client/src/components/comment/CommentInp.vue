<template>
  <div class="comment_inp">
    <v-row class="title">评论</v-row>
    <v-row>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        :placeholder="
          replyerName ? `@${replyerName}：` : '留下你的宝贵建议吧...'
        "
        v-model="alertConfig.msgConent"
        v-focus="replyerName"
      ></textarea>
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
      msgConent: "",
      type: "success",
      alertColor: "green"
    },
    nickName: "",
    email: "",
    blogId: -1, // 默认是留言板的评论
    parent: -1 // 默认是层主
  }),
  computed: {
    ...mapState("commentStore", {
      floorId: "floorId",
      replyerName: "nickName"
    })
  },
  methods: {
    async submit() {
      // console.log(this.floorId, this.replyerName);
      const { blogId, nickName, email, floorId } = this;
      if (!this.alertConfig.msgConent) {
        this.handleAlertStatus("error", "抱歉，内容不能为空哦");
        return;
      }
      this.nickName = nickName ? nickName : "匿名";
      this.parent = floorId ? floorId : "-1";
      console.log(
        blogId,
        this.parent,
        this.nickName,
        this.alertConfig.msgConent,
        email
      );
      // 发送ajax请求
      const resp = await commentHttp.addNewComment(
        blogId,
        this.parent,
        this.nickName,
        this.alertConfig.msgConent,
        email
      );
      console.log(resp);
      if (resp.data.status === "success") {
        this.handleAlertStatus("success", "评论成功");
      } else {
        this.handleAlertStatus("error", "评论失败");
      }

      // 清空输入内容
      this.alertConfig.msgConent = "";
    },
    // 处理弹窗的
    handleAlertStatus(status, content) {
      if (status === "success") {
        this.alertConfig.alertContent = content;
        this.alertConfig.type = "success";
        this.alertConfig.alertColor = "green";
      } else {
        this.alertConfig.alertContent = content;
        this.alertConfig.type = "error";
        this.alertConfig.alertColor = "red";
      }
      this.alertConfig.isShowAlert = true;
      setTimeout(() => {
        this.alertConfig.isShowAlert = false;
      }, 2300);
    }
  }
};
</script>

<style lang="scss" scoped>
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
