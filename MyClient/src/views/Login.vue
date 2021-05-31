<template>
  <div class="login">
    <div class="main">
      <b-container class="bv-example-row" style="height: 100%">
        <b-row style="height: 100%">
          <b-col cols="7" class="left">你见过凌晨四点的洛杉矶吗？</b-col>
          <b-col cols="5" class="right">
            <div class="content">
              <div class="title">用户登录</div>
              <input type="text" placeholder="loginId" v-model="loginId" />
              <input
                type="password"
                placeholder="password"
                v-model="password"
              />
              <!-- <input
                type="text"
                placeholder="Verification code"
                v-model="verCode"
              /> -->
              <!-- <img
                :src="captchaUrl"
                alt=""
                id="captcha"
                @click="reflash"
                ref="captchaImg"
              /> -->
              <button @click="signIn">Sign In</button>
              <button v-b-modal.tips @click="$bvModal.show('bv-modal-signUp')">
                Sign Up
              </button>

              <b-modal id="bv-modal-signUp" hide-footer>
                <template #modal-title> 来自管理员的友情提示： </template>
                <div class="d-block text-center">
                  <h3>对不起，该模块尚未对外开放！</h3>
                </div>
              </b-modal>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import * as adminHttp from "@/service/AdminService.js";
export default {
  data() {
    return {
      loginId: "",
      password: "",
      tips: "",
      captcha: null,
      verCode: "",
      captchaUrl: `http://8.129.235.98:2333/captcha?${Math.random()}`
    };
  },
  methods: {
    showSignMsg(msg, callback) {
      this.$bvModal &&
        this.$bvModal
          .msgBoxOk(msg, {
            title: "来自管理员的友情提示：",
            size: "sm",
            buttonSize: "sm",
            // okVariant: "success",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          })
          .then(value => {
            this.tips = value;
            callback();
          })
          .catch(err => {
            console.log(err);
          });
    },

    async signIn() {
      const { loginId, password, verCode: captcha } = this;
      const user = await this.$store.dispatch("adminStore/login", {
        loginId,
        password,
        captcha
      });
      // alert(user.msg);
      try {
        console.log(user.status);
        if (user.status === "success") {
          this.showSignMsg("登录成功", () => {
            this.$router.push({
              path: this.$route.meta.redirectPath
            });
          });
        } else if (user.status === "fail") {
          this.showSignMsg("账号或者密码错误", () => {
            // this.reflash();
          });
        } /* else if (user.status === 401) {
          this.showSignMsg("验证码错误", () => {
            this.reflash();
          });
        } */
      } catch (err) {
        console.log("路由不让进", err);
      }
    }

    /* reflash() {
      this.$refs.captchaImg.src = `http://localhost:2333/captcha?${Math.random()}`;
    } */
  },

  async created() {
    const resp = adminHttp.addOne();
    console.log(resp);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/common/center.scss";
@import "../assets/common/font.scss";
.login {
  width: 100%;
  height: 100%;
  background-image: url(http://guozhenqiang.xyz/loginBg.jpg);
  background-size: cover;

  .main {
    width: 60%;
    height: 70%;
    // border: solid 2px skyblue;
    @include center(absolute);

    text-align: left;
    .left {
      background-color: #fff;
      font-size: 40px;
      padding: 25px 30px 0 20px;
      font-weight: bold;
      color: darken($my_blue, 10%);
      opacity: 0.5;
    }
    .right {
      background-color: #fff;
      display: flex;
      align-items: center;
      // justify-content: center;

      .content {
        // background: red;
        height: 70%;
        width: 80%;
        color: gray;
        margin: 0 auto;
        font-size: 15px;

        .title {
          font-size: 20px;
          font-style: italic;
        }

        input {
          margin: 10px 0;
          width: 100%;
          height: 40px;
          border: solid 1.2px gray;
          @include placeHolder;
        }

        button {
          width: 100%;
          height: 40px;
          border-radius: 7px;
          font-size: 18px;
          background-color: hotpink;
          border: none;
          margin: 5px 0;

          &:nth-of-type(1) {
            margin-top: 30px;
          }

          &:hover {
            color: rgb(211, 74, 211);
          }
        }
      }
    }
  }
}
#tips {
  p {
    color: hotpink;
    font-size: 16px;
  }
}
#captcha {
  width: 15vw;
  // height: 80px;
  border: solid 2px red;
  cursor: pointer;
}
</style>
