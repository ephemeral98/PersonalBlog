<template>
  <!-- 关于我页面的主要内容： -->
  <v-main class="home">
    <!-- 介绍 -->
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div
        class="monologue"
        v-if="clientSize === 'mobile' && isFirstTime"
        ref="introduce"
        @click="isFirstTime = false"
      >
        {{ introduce }}
      </div>
    </transition>

    <!-- <CompHead>关于我</CompHead> -->
    <header class="welcome_head">
      <CentralWord welcomeWord="关于我" />
      <EnterMain></EnterMain>
    </header>

    <!-- 自我介绍 -->
    <div class="wrapper">
      <h1>Hey guys, welcome to my personal blog!</h1>
      <div class="content mt-5">
        <ul class="tags">
          <li>前端攻城狮</li>
          <li>喜欢电子产品</li>
          <li>喜欢美剧、港剧</li>
          <li>喜欢篮球、羽毛球、桌球</li>
        </ul>
        <div class="infos mt-5">
          <p>
            老板好，我系Barry
          </p>
          <p>
            平时闲的时候就比较喜欢看电影。游戏的话，像王者荣耀、LOL、吃鸡等，我都不会玩。
          </p>
          <p>
            其实在以前我是比较喜欢玩游戏的，那时候qq飞车，cf、dnf盛行时期，没错，我就是其中的一个网瘾少年。
          </p>
          <p>后来，dnf号借朋友被封了，就再没怎么玩了。</p>
          <p>如果有好看的电视剧、电影，记得留言推荐给我啊~</p>
          <p>
            该网站项目是我用Vue全家桶+node技术搭建的，功能的话，我有空会陆续更新，如果发现bug
            或者 有好的idea记得联系我！
          </p>
          <p>
            我是计算机软件专业前端方向，以下是我前端学习之路以及技能加点情况：
          </p>
        </div>
      </div>
    </div>

    <!-- 技能树 -->
    <!-- 手机端 -->
    <MobileSkill :skills="mainSkills" v-if="clientSize === 'mobile'" />
    <!-- pc端 -->
    <PcSkill :mainSkills="mainSkills" :exSkills="exSkills" v-else />

    <!-- 联系方式 -->
    <div class="contact">
      <li class="qq">
        <i class="iconfont">&#xe876;</i>
        <div class="card">3502969036</div>
      </li>
      <li class="wechat">
        <i class="iconfont">&#xe6ea;</i>
        <div class="card"></div>
      </li>
      <li class="github">
        <a
          href="https://github.com/ephemeral98/PersonalBlog"
          target="_blank"
          class="iconfont"
          >&#xe691;</a
        >
        <div class="card">这是该博客项目的开源地址，快来白嫖~</div>
      </li>
    </div>

    <MyFoot />
  </v-main>
</template>

<script>
import { getAllSkills } from "@/service/SkillService.js";
import MobileSkill from "./MobileSkill.vue";
import PcSkill from "./PcSkill.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import CentralWord from "@/components/common/CentralWord";
import EnterMain from "@/components/common/CentralWord/EnterMain.vue";

export default {
  name: "About",
  components: {
    CentralWord,
    EnterMain,
    MyFoot,
    MobileSkill,
    PcSkill
  },
  data: () => ({
    mainSkills: "",
    exSkills: "",
    isFirstTime: true, // 判断是不是首次进入
    introduce: `您好，您目前浏览的是手机端版本，出于手机屏幕大小限制，关于我页面中的展示
    
    我做了相关的删减。
    用电脑可以看得更全面哦~
    
    请点击任意处进入...
    `
  }),
  computed: {
    // pc mobile
    clientSize() {
      return this.$getClientSize();
    }
  },
  methods: {
    // 手机端 完成 要做的事情
    /* introduceFinish() {
      this.isFirstTime && window.alert("hello,,,");
    } */
  },
  async created() {
    const { mainSkills, exSkills } = await getAllSkills();
    this.mainSkills = mainSkills;
    this.exSkills = exSkills;
  },
  mounted() {
    this.clientSize === "mobile" &&
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
.wrapper {
  margin: 0 auto;
  width: 95%;
  padding: 20px;
  @include borderShadow;

  &:hover {
    transform: translateY(7px);
  }

  .tags {
    padding-left: 0;
    li::before {
      content: "√";
      margin-right: 5px;
      color: $my_blue;
    }
  }
}
.contact {
  margin-left: 100px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > li {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }

  .iconfont {
    font-size: 30px;
    cursor: pointer;
    color: darken($gray, 10%);
    transition: all 1s;
  }

  // 联系的 的名片
  @mixin card-basic($w, $color) {
    width: $w;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    box-shadow: 0 0 20px 0 $color;
    transition: all 1s;
    color: #fff;

    &::after {
      display: block;
      content: "";
      width: 0;
      border: solid 10px transparent;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 100%);
      transition: all 2s;
    }
  }

  .wechat {
    position: relative;

    .card {
      @include card-basic(100px, $wechat_color);
      background-image: url(#{$qiBaseURL}/QRcode.png);
      background-size: 100%;
      transform: translate(-30%, -110%);
    }
    &:hover {
      .iconfont {
        color: $wechat_color !important;
      }
      .card {
        height: 100px;
        padding: 10px;

        &::after {
          border-top: solid 10px $wechat_color;
        }
      }
    }
  }

  .qq {
    position: relative;
    .card {
      @include card-basic(110px, $qq_color);
      transform: translate(-31%, -128%);
      border-radius: 10px;
      font-size: 0;
    }
    &:hover {
      .iconfont {
        color: $qq_color;
      }

      .card {
        color: #fff;
        height: 40px;
        padding: 10px;
        line-height: 20px;
        background-color: $qq_color;
        font-size: 14px;

        &::after {
          border-top: solid 10px $qq_color;
        }
      }
    }
  }

  .github {
    border-radius: 50%;
    border: solid 2px transparent;
    position: relative;
    transition: all 1s;
    border: solid 5px transparent;
    line-height: 35px;

    .card {
      @include card-basic(150px, #000);
      transform: translate(-39%, -128%);
      border-radius: 10px;
      font-size: 0;
    }
    &:hover {
      border: solid 5px #000;
      .iconfont {
        color: #000;
      }

      .card {
        color: #fff;
        height: 60px;
        padding: 10px;
        line-height: 20px;
        background-color: #000;
        font-size: 14px;

        &::after {
          border-top: solid 10px #000;
        }
      }
    }
  }
}

@media screen and (max-width: $i_md) {
  .contact {
    margin: 30px auto 0 !important;
  }
}
</style>
