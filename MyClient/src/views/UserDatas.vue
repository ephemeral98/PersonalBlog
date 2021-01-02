<template>
  <div class="userDatas">
    <header>
      <MyHead :title="navWord" />
    </header>
    <div class="main">
      <div class="leftNav">
        <div class="myInfo">
          <div class="portrait">
            <img
              src="http://qm23h04eq.hn-bkt.clouddn.com/portrait.png"
              alt=""
            />
          </div>
          <div class="name">{{ nickName }}</div>
          <div class="signature">{{ signature }}</div>
        </div>
        <div class="navBar">
          <router-link
            v-for="nav in navBarList"
            :key="nav.name"
            tag="li"
            :to="{ name: nav.name }"
            >{{ nav.word }}</router-link
          >
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MyHead from "../components/common/MyHead.vue";
import { mapState } from "vuex";
export default {
  components: {
    MyHead
  },
  data() {
    return {
      nickName: "",
      signature: "",
      navWord: "",
      navBarList: [
        {
          word: "文章分类",
          name: "categories"
        },
        {
          word: "留言板",
          name: "msgWall"
        },
        {
          word: "上传",
          name: "uploadPage"
        },
        {
          word: "每日一句",
          name: "dayWord"
        }
      ]
    };
  },
  computed: {
    ...mapState("adminStore", {
      adminInfos: "data"
    })
  },
  async created() {
    console.log(this.$store.state.adminStore.data);
    // const resp = await this.$store.dispatch("adminStore/whoAmI");

    // if (resp) {
    this.nickName = this.adminInfos.nickName;
    this.signature = this.adminInfos.signature;
    this.navWord = this.$route.meta.word;
    // }
  },
  beforeRouteUpdate(to, from, next) {
    this.navWord = to.meta.word;
    next();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common/center.scss";
.userDatas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // 内容区
  .main {
    display: flex;
    height: 100%;

    // 左边信息栏
    .leftNav {
      text-align: center;
      flex: 0 0 200px;
      // width: 200px;
      height: 100%;
      background-color: #33333d;

      // 我的信息栏
      .myInfo {
        overflow: hidden;
        // 头像
        .portrait {
          width: 110px;
          height: 110px;
          background-color: pink;
          border-radius: 50%;
          position: relative;
          margin: 50px auto 0;

          img {
            width: 95px;
            height: 95px;
            display: block;
            border-radius: 50%;
            @include center(absolute);
          }
        }
        // 名字和签名
        .name {
          font-size: 28px;
          color: #fff;
        }
        .signature {
          max-height: 230px;
          font-size: 15px;
          color: gray;
        }
      }

      // 导航栏
      .navBar {
        margin-top: 50px;

        li {
          height: 45px;
          border-bottom: 1.2px solid rgb(112, 112, 112);
          line-height: 45px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.486);
          cursor: pointer;

          &:hover {
            background-color: skyblue;
            color: #fff;
          }

          &.router-link-active {
            font-size: 30px;
            color: gold;
          }
        }
      }
    }

    // 内容区
    .content {
      flex: 10 1 auto;
      height: 90%;
      // background-color: red;
      position: relative;
      overflow: auto;
    }
  }
}
</style>
