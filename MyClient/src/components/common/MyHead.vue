<template>
  <div class="my_head">
    <div class="cap">{{ title }}</div>
    <div
      class="my_info"
      @mouseover="showMyInfo = true"
      @mouseleave="showMyInfo = false"
    >
      <div class="portrait">
        <img src="http://qm23h04eq.hn-bkt.clouddn.com/portrait.png" alt="" />
      </div>
      <transition
        enter-active-class="animate__animated animate__zoomInDown"
        leave-active-class="animate__animated animate__zoomOutDown"
      >
        <div class="infos" v-if="showMyInfo">
          <div class="myPortrait">
            <img
              src="http://qm23h04eq.hn-bkt.clouddn.com/portrait.png"
              alt=""
            />
          </div>
          <div class="name">{{ nickName }}</div>
          <ul class="tools">
            <router-link tag="li" :to="{ name: 'writerInfos' }"
              >修改资料</router-link
            >
            <li @click="loginOut">退出</li>
          </ul>
        </div>
      </transition>
    </div>
    <router-link to="/" class="back_home iconfont">&#xe503;</router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["title"],
  data() {
    return {
      showMyInfo: false,
      nickName: ""
    };
  },
  computed: {
    ...mapState("adminStore", {
      adminInfos: "data"
    })
  },
  async created() {
    const resp = await this.$store.dispatch("adminStore/whoAmI");
    if (resp) {
      this.nickName = this.adminInfos.nickName;
    }
  },
  methods: {
    /**
     * 退出账号
     */
    loginOut() {
      this.$store.dispatch("adminStore/quit");
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.my_head {
  width: 100%;
  height: 60px;
  background-color: #fb7299;
  position: relative;
  display: flex;
  align-items: center;

  .cap {
    width: 500px;
    height: 100%;
    background-color: #04b4f3;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    border-radius: 0 50px 0 50px;
  }

  .my_info {
    position: absolute;
    right: 12%;

    // 头像
    .portrait {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;

      img {
        width: 100%;
        display: block;
      }
    }
    .infos {
      width: 240px;
      height: 300px;
      background-color: #fff;
      position: absolute;
      left: -90px;
      top: 50px;
      box-shadow: 0 0 20px 0 gray;
      border-radius: 8px;
      z-index: 999;

      .myPortrait {
        @extend .portrait;
        width: 100px;
        height: 100px;
        margin: -50px auto;
        box-shadow: 0 0 10px 0 skyblue;
      }

      .name {
        font-size: 28px;
        margin-top: 24%;
        text-align: center;
      }

      .tools {
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 5%;

        > li {
          width: 100%;
          height: 50px;
          border-top: solid 1.5px rgb(196, 196, 196);
          box-sizing: border-box;
          text-align: left;
          padding-left: 20px;
          font-size: 18px;
          line-height: 50px;
          cursor: pointer;

          &:hover {
            color: #fb7299;
          }
        }
      }
    }
  }

  // 回到首页
  .back_home {
    width: 70px;
    height: 50px;
    background-color: rgba($my_blue, 50%);
    position: absolute;
    right: 3%;
    line-height: 50px;
    font-size: 24px;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease-in-out;

    &:hover {
      border-radius: 0 0 0 30px;
      background-color: $my_blue;
    }
  }
}
</style>
