<template>
  <!-- 告白信 -->
  <section class="fate">
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <!-- 介绍 -->
      <div
        class="monologue"
        v-if="isFirstTime"
        ref="introduce"
        @click="isFirstTime = false"
      >
        {{ introduce }}
      </div>
    </transition>

    <MyContainer>
      <div class="fate_wrap">
        <!-- 你的QQ或者邮箱 -->
        <div class="contact" v-for="contact in contactInfo" :key="contact.name">
          <div
            class="tag"
            :class="{
              spin: contact.spinning,
              tag_expending: contact.expending
            }"
          >
            {{ contact.text }}
          </div>
          <input
            type="text"
            class="contact_inp"
            :class="[{ expending: contact.expending }]"
            :placeholder="contact.placeText"
            @focus.once="focusInput(contact)"
            :ref="contact.name"
            v-model="contact.content"
          />
        </div>
        <!-- 说点什么 -->
        <textarea
          class="talk"
          cols="30"
          rows="10"
          placeholder="
          对ta简单说点什么？
        "
          v-model="talkAbout"
          @keydown="controlMax"
          maxlength="520"
        ></textarea>
        <div class="count">{{ talkAbout.length }}/520</div>
        <!-- 提交 -->
        <BlinkBtn class="send_btn" @click.native="handleSend">发送</BlinkBtn>
      </div>
    </MyContainer>

    <transition
      enter-active-class="animate__animated animate__zoomInDown"
      leave-active-class="animate__animated animate__zoomOutDown"
    >
      <v-alert
        class="alert_wrap"
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
  </section>
</template>

<script>
import BlinkBtn from "@/components/common/BlinkBtn.vue";
import MyContainer from "@/components/layouts/MyContainer";
import * as handleAlert from "@/utils/handleAlertStatus.js";
import * as labHttp from "@/service/LaboratoryService.js";

export default {
  components: {
    MyContainer,
    BlinkBtn
  },
  data: () => ({
    isFirstTime: true, // 判断是不是首次进入
    introduce: `
    欢迎来到告白信页面，
    输入你的QQ号或者邮箱，再输入你喜欢的人的QQ号或者邮箱，我会匿名（用我的账号）帮你发一封邮件并邀请ta来做相同的操作。
  如果ta输入的也正是你当初填的QQ或者邮箱，你们两个都会送上我诚挚的祝福！

    请点击任意处进入...`,
    talkAbout: "", // 对ta说的话

    contactInfo: [
      {
        name: "yours",
        text: "Yours",
        placeText: "你的邮箱或者QQ",
        content: "",
        expending: false,
        spinning: false
      },
      {
        name: "ta",
        text: "TA",
        placeText: "TA的邮箱或者QQ",
        content: "",
        expending: false,
        spinning: false
      },
      {
        name: "name",
        text: "name",
        placeText: "Ta的称呼",
        content: "",
        expending: false,
        spinning: false
      }
    ],

    alertConfig: {
      type: "success",
      alertColor: "",
      alertContent: "发送成功",
      isShowAlert: false
    }
  }),
  methods: {
    // 点击 name 聚焦
    focusInput(which) {
      which.expending = true;
      which.spinning = true;
      const ele = this.$refs[which.name][0];
      ele.addEventListener("transitionend", () => {
        console.log("hello, end....");
        which.spinning = false;
      });
    },
    // 控制文本输入最大量
    controlMax() {
      const len = this.talkAbout.length;
      if (len >= 520) {
        this.talkAbout = this.talkAbout.slice(0, 520);
      }
    },

    // 发送邮件
    async handleSend() {
      console.log("send...");
      if (!this.contactInfo[0].content) {
        handleAlert.handleEmpty(this, "请填写你的QQ或者邮箱");
        return;
      }
      if (!this.contactInfo[1].content) {
        handleAlert.handleEmpty(this, "请填写ta的QQ或者邮箱");
        return;
      }

      /**
       * 是否要进一步转化成Email
       * @param {string} str
       * @return {boolean}
       */
      function toEmail(str) {
        const emailReg = /^([a-zA-Z]|[0-9])(\w|\W)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        const qqReg = /^\d{6,10}$/;
        // 填写的就是QQ账号，QQ号不可能低于6位，也不可能高于10位，只能是纯数字
        if (emailReg.test(str)) {
          return str;
        }
        if (qqReg.test(str)) {
          return str + "@qq.com";
        }
        return false;
      }

      const resY = toEmail(this.contactInfo[0].content);
      const resT = toEmail(this.contactInfo[1].content);

      if (!resY) {
        handleAlert.handleRes(
          this,
          "error",
          "",
          "你的QQ号或者邮箱填错了！",
          false
        );
      } else if (!resT) {
        handleAlert.handleRes(
          this,
          "error",
          "",
          "TA的QQ号或者邮箱填错了！",
          false
        );
      } else if (resY === resT) {
        handleAlert.handleRes(
          this,
          "error",
          "",
          "自己就不需要给自己发邮件了吧。。？",
          false
        );
      } else {
        // 发送邮件
        const resp = await labHttp.marriage(
          resY,
          resT,
          this.contactInfo[2].content,
          this.talkAbout
        );
        handleAlert.handleRes(this, resp.status, resp.msg, resp.msg);
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    console.log("intro----->", this.$refs.introduce);
    this.isFirstTime &&
      this.$typing(
        this.$refs.introduce,
        this.introduce,
        false,
        null,
        200,
        null,
        false
        // this.introduceFinish
      );
  }
};
</script>
<style lang="scss" scoped>
// 旋转动画
.spin {
  animation: spinning 0.3s infinite;
}

$tagWidth: 80px; // 滑块的宽度
$expendWidth: 500px; // 输入框延长后的宽度

// 输入框延伸
.expending {
  transition: all 1s;
  width: $expendWidth !important;
  padding: 0 $tagWidth + 5px 0 8px !important;
}

// 旋转到右侧
.tag_expending {
  left: calc(#{$expendWidth} - #{$tagWidth}) !important;
  transition: all 1s;
}

.fate_wrap {
  @include borderShadow;
  padding: 3vw;

  .contact {
    position: relative;
    margin-top: 50px;
    width: $expendWidth;
  }

  .tag {
    width: $tagWidth;
    height: 60px;
    background-color: $my_blue;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 $my_blue;
    font-size: 16px;
    font-style: italic;
    color: #fff;
    @include flexCenter;
  }

  .contact_inp {
    width: 240px;
    height: 60px;
    box-shadow: 0 0 10px 0 $my_pink;
    border-radius: 20px;
    padding-left: 85px;
    font-size: 18px !important;
    color: darken($my_blue, 20%);

    &::placeholder {
      color: $gray;
    }
  }

  .send_btn {
    width: 120px !important;
    height: 50px !important;
    position: static;
    transform: none;
    margin-top: 50px;
    font-size: 20px;
  }

  .talk {
    margin-top: 50px;
    display: block;
    width: 100%;
    padding: 1vw 1vw;
    border-radius: 7px;
    border: dashed 1.2px rgb(187, 187, 187);

    &:focus {
      border: none;
      box-shadow: 0 0 10px 0 $my_blue;
    }

    &::placeholder {
      font-style: italic;
    }
  }

  .count {
    color: darken($gray, 10%);
    font-style: italic;
    font-size: 12px;
  }
}

.alert_wrap {
  @include modal_center(300px, 60px);
  text-align: center;
  margin-top: 120px;
}

@media screen and (max-width: $i_md) {
  $expendWidth: 350px;

  .expending {
    width: $expendWidth !important;
    padding: 0 $tagWidth + 5px 0 8px !important;
  }

  .contact {
    width: $expendWidth !important;
  }

  .tag_expending {
    left: calc(#{$expendWidth} - #{$tagWidth}) !important;
  }
}

@media screen and (max-width: $phone_computer) {
  $expendWidth: 100%;
  .expending {
    width: 100% !important;
    padding: 0 85px 0 8px !important;
  }

  .contact {
    width: 100% !important;
  }
  .tag_expending {
    left: calc(#{$expendWidth} - #{$tagWidth}) !important;
  }
}
</style>
