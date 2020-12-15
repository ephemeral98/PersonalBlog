<template>
  <transition-group
    enter-active-class="animate__animated animate__backInDown"
    leave-active-class="animate__animated animate__rollOut"
  >
    <!-- 修改密码弹窗 -->
    <MyModal
      v-if="pwdModal"
      key="changePwd"
      :basicConfig="pwdModalConfig"
      @close-modal="$emit('close-pwd')"
    >
      <template #title>
        <div class="title">更换密码</div>
      </template>
      <template #content>
        <p>
          <input
            type="text"
            placeholder="请输入旧密码"
            class="pwd"
            v-model="oldPwd"
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="请输入新密码"
            class="pwd"
            v-model="newPwd"
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="请重复新密码"
            class="pwd"
            v-model="reNewPwd"
          />
        </p>
      </template>
      <template #controlBtn>
        <button class="confirm_btn" @click="conChangePwd">确认修改</button>
        <button class="cancel_btn" @click="$emit('close-pwd')">
          取消
        </button>
      </template>
    </MyModal>

    <!-- 修改个人介绍弹窗 -->
    <MyModal
      :basicConfig="toInfoModal"
      v-show="introduceModal"
      @close-modal="$emit('close-introduce')"
      key="introduce"
    >
      <template v-slot:title>
        <div class="title">来自管理员的提醒</div>
      </template>
      <template v-slot:content>
        <div id="editor"></div>
      </template>
      <template v-slot:controlBtn>
        <button class="confirm_btn" @click="conChangeIntro">确认修改</button>
        <button class="cancel_btn" @click="$emit('close-introduce')">
          取消
        </button>
      </template>
    </MyModal>

    <!-- 成功消息弹窗 -->
    <MyModal
      :basicConfig="successMsgModal"
      v-if="succMsg"
      @close-modal="handleOk"
      key="success"
    >
      <template #title>
        来自管理员的提醒
      </template>
      <template v-slot:content>
        <div>
          修改成功！
        </div>
      </template>
      <template v-slot:controlBtn>
        <button class="cancel_btn" @click="handleOk">
          Ok
        </button>
      </template>
    </MyModal>

    <!-- 失败消息弹窗 -->
    <MyModal
      :basicConfig="failMsgModal"
      v-if="failMsg"
      key="fail"
      @close-modal="$emit('is-show-fail', false)"
    >
      <template #title>
        修改失败
      </template>
      <template v-slot:content>
        <div>
          {{ failMsgTxt || "修改失败" }}
        </div>
      </template>
      <template v-slot:controlBtn>
        <button class="cancel_btn" @click="$emit('is-show-fail', false)">
          Cancel
        </button>
      </template>
    </MyModal>
  </transition-group>
</template>

<script>
import E from "wangeditor";
import MyModal from "../../../components/tools/MyModal";
import * as AdminService from "../../../service/AdminService";
import { mapState } from "vuex";
export default {
  props: ["introduceModal", "pwdModal", "introInfo", "succMsg", "failMsg"],
  components: {
    MyModal
  },

  data() {
    return {
      editor: null,

      oldPwd: "",
      newPwd: "",
      reNewPwd: "",

      pwdModalConfig: {
        modalStyle: {
          width: "240px",
          height: "255px"
        }
      },
      toInfoModal: {
        modalStyle: {
          boxShadow: "0 0 20px 0 skyblue"
        }
      },
      successMsgModal: {
        msg: true,
        modalStyle: {
          boxShadow: "0 0 20px 0 #c8e6c6"
        }
      },
      failMsgModal: {
        modalStyle: {
          boxShadow: "0 0 20px 0 red"
        }
      }
    };
  },
  computed: {
    ...mapState("adminStore", {
      adminInfos: "data"
    })
  },
  methods: {
    /**
     * 确认修改密码
     */
    async conChangePwd() {
      // 获取密码
      console.log(this.oldPwd, this.newPwd, this.reNewPwd);
      // 发送修改请求
      const resp = await AdminService.changePwd(this.adminInfos.loginId, {
        oldPwd: this.oldPwd,
        newPwd: this.newPwd,
        reNewPwd: this.reNewPwd
      });

      // 清空刚输入的密码，先隐藏修改弹窗，再弹出消息弹窗
      this.oldPwd = this.newPwd = this.reNewPwd = "";
      this.$emit("close-pwd");
      if (resp.data.status === "success") {
        // this.succMsg = true;
        this.$emit("is-show-succ", true);
      } else {
        this.failMsgTxt = resp.data.msg;
        // this.failMsg = true;
        this.$emit("is-show-fail", true);
      }
    },
    /**
     * 确认修改个人介绍
     */
    async conChangeIntro() {
      const introContent = this.editor.txt.html();
      // 发送请求修改
      const resp = await AdminService.changeIntroduce(
        this.adminInfos.loginId,
        introContent
      );

      // 先隐藏修改弹窗
      this.$emit("close-introduce");
      if (resp.data.status === "success") {
        // 再弹出消息弹窗
        // this.succMsg = true;
        this.$emit("is-show-succ", true);
      } else {
        this.failMsgTxt = resp.data.msg;
        // this.failMsg = true;
        this.$emit("is-show-fail", true);
      }
    },

    handleOk() {
      this.$emit("is-show-succ", false);
      this.$router.go(0);
    }
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.create();
    // 获取原先的个人介绍内容 (index传来的)
    this.editor.txt.html(this.introInfo);
  },

  watch: {
    // 获取原先的个人介绍内容 (index传来的)
    introInfo: {
      handler() {
        this.editor.txt.html(this.introInfo);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/common/center.scss";
.v-enter-to,
.v-leave-to {
  @include modal__center;
}

.pwd {
  width: 170px;
  height: 35px;
  padding: 0 5px;
  margin: 5px 0 0;
  border: solid 1.5px rgba(146, 146, 146, 0.651);
  border-radius: 8px;
}

// 修改个人介绍
#editor {
  text-align: left;
  width: 800px;
}

// 确认按钮、取消按钮
.confirm_btn,
.cancel_ben {
  height: 40px;
  align-self: center;
  padding: 20px;
  font-size: 20px;
  line-height: 0;
  background-color: lightblue;
  border-radius: 8px;
  transition: all 1s;

  &:hover {
    background-color: pink;
  }
}
</style>
