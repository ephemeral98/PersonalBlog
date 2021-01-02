<template>
  <div class="writer_infos">
    <Modals
      :introInfo="introduce"
      :introduceModal="introModal"
      :pwdModal="pwdModal"
      :succMsg="succMsg"
      :failMsg="failMsg"
      @close-introduce="introModal = false"
      @close-pwd="pwdModal = false"
      @is-show-fail="failMsg = $event"
      @is-show-succ="succMsg = $event"
    />
    <header>
      <MyHead title="个人信息" />
    </header>
    <div class="main">
      <div class="change_portrait">
        <div class="avatar">
          <img src="http://qm23h04eq.hn-bkt.clouddn.com/portrait.png" alt="" />
        </div>
        <a href="javascript:void(0)" class="ava_change">
          更换头像
          <input type="file" class="ava_upload" @change="changeAvatar" />
        </a>
      </div>
      <div class="infos">
        <li>
          <div class="name">loginId</div>
          <div class="val">
            {{ loginId }}
          </div>
        </li>
        <li>
          <div class="name">密码</div>
          <div class="val">
            <button @click="pwdModal = true">更换</button>
          </div>
        </li>
        <li>
          <div class="name">昵称</div>
          <div class="val">
            <input
              type="text"
              class="nick_name"
              v-model="nickName"
              maxlength="12"
            />
          </div>
        </li>
        <li>
          <div class="name">个性签名</div>
          <div class="val">
            <input
              type="text"
              class="signature"
              v-model="signature"
              maxlength="30"
            />
          </div>
        </li>
        <li>
          <div class="name">个人介绍</div>
          <div class="val">
            <button @click="introModal = true">修改</button>
          </div>
        </li>
      </div>
      <button class="save" @click="saveInfos">保存</button>
    </div>
  </div>
</template>

<script>
import MyHead from "@/components/common/MyHead.vue";
import Modals from "./component/Modal.vue";
import { mapState } from "vuex";
import * as adminHttp from "@/service/AdminService.js";
import * as uploadHttp from "@/service/UploadService.js";
export default {
  components: {
    MyHead,
    Modals
  },
  async created() {
    // 一进来该页面，就获取我的信息
    const { loginId, nickName, signature, introduce } = this.adminInfos;
    this.loginId = loginId;
    this.nickName = nickName;
    this.signature = signature;
    this.introduce = introduce;
  },
  data() {
    return {
      temps: "",
      loginId: "",
      nickName: "",
      signature: "",
      introduce: "",
      pwdModal: false,
      introModal: false,
      succMsg: false,
      failMsg: false
    };
  },
  computed: {
    ...mapState("adminStore", {
      adminInfos: "data"
    })
  },
  methods: {
    /**
     * 上传头像
     */
    async changeAvatar(e) {
      console.log(e.target.files);
      const fData = new FormData();
      fData.append("singleImg", e.target.files[0], e.target.files[0].name);
      const resp = await uploadHttp.upSingle(fData);
      if (resp.data.status === "success") {
        // 成功弹窗
        this.succMsg = true;
      } else {
        // 失败弹窗
        this.failMsg = false;
      }
    },

    // 保存 昵称、个性签名
    async saveInfos() {
      // 发送修改请求
      const resp = await adminHttp.changeNickAndSign(this.loginId, {
        nickName: this.nickName,
        signature: this.signature
      });
      if (resp.data.status === "success") {
        this.succMsg = true;
      } else {
        this.failMsg = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.writer_infos {
  .main {
    width: 900px;
    margin: 5px auto 20px;
    box-shadow: 0 0 20px 0 gray;
    border-radius: 0 0 0 50px;
    padding: 5px;
    position: relative;

    .change_portrait {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: dashed 1.5px gray;

      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 5px 0 skyblue;

        img {
          width: 100%;
        }
      }

      .ava_change {
        @include upload_btn(ava_upload);
        margin-left: 50px;
      }

      button {
        margin-left: 60px;
        width: 100px;
        height: 40px;
        font-size: 18px;
        border-radius: 20px;
        border: solid 1.5px #c8e6c6;
        color: #008c8c;
        background-color: #fff;

        &:hover {
          background-color: #fb7299;
        }
      }
    }

    // 我的其他一些信息
    > .infos {
      // background-color: gold;
      margin: 50px 0 120px;

      > li {
        width: 100%;
        height: 80px;
        border-bottom: dashed 1.5px gray;
        display: flex;
        align-items: center;
        > div {
          text-align: left;
          font-size: 18px;
        }

        .name {
          flex: 0 0 150px;
          color: lightslategrey;
        }

        .val {
          flex: 10 0 auto;
          padding-left: 10px;

          button {
            width: 120px;
            height: 40px;
            font-size: 18px;
            background-color: skyblue;
            border-radius: 20px;

            &:hover {
              background-color: #07817a;
              color: #fff;
            }
          }

          input {
            height: 50px;
            font-size: 20px;
            padding: 0 5px;
            border: none;
            border-bottom: solid gray 2px;

            &.nick_name {
              width: 200px;
            }
            &.signature {
              width: 100%;
            }
          }
        }
      }
    }

    .save {
      width: 120px;
      height: 40px;
      background-color: lightskyblue;
      position: absolute;
      bottom: 2%;
      left: 5%;
      color: snow;
      font-size: 18px;
      border-radius: 20px;

      &:hover {
        color: #008c8c;
        background-color: #fb7299;
        font-weight: bold;
      }
    }
  }
}
</style>
