<template>
  <v-main class="home">
    <!-- <CompHead>关于我</CompHead> -->
    <header class="welcome_head">
      <CentralWord welcomeWord="关于我" />
      <EnterMain></EnterMain>
    </header>

    <MyContainer>
      <div class="wrapper">
        <h1>Hey guys, welcome to my personal blog!</h1>
        <div class="content mt-5">
          <ul class="tags">
            <li>大三</li>
            <li>喜欢电子产品</li>
            <li>喜欢美剧、港剧</li>
            <li>喜欢篮球、羽毛球、桌球</li>
          </ul>
          <div class="infos mt-5">
            <p>
              你好啊，我叫Barry，之前比较喜欢看美剧《闪电侠》，后来英语课也就取了这个名字。
            </p>
            <p>
              不大喜欢玩游戏，也许是厌倦了，也许是没时间。其实在中学时候的我是比较喜欢玩游戏的。
            </p>
            <p>
              那时候qq飞车，cf、dnf盛行时期的时候，没错，我就是其中的一个网瘾少年。
            </p>
            <p>后来，dnf号借朋友被封了，就再没怎么玩了。</p>
            <p>
              我是计算机专业，主攻前端方向的，目前正在学习React，但是看到Vue3出来之后，React似乎没那么香了。
            </p>
            <p>如果有好看的电视剧、电影，记得留言推荐给我啊~</p>
          </div>
        </div>
      </div>
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
    </MyContainer>

    <MyFoot />
  </v-main>
</template>

<script>
// @ is an alias to /src
import MyContainer from "@/components/common/MyContainer.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import CentralWord from "@/components/common/CentralWord";
import EnterMain from "@/components/common/CentralWord/EnterMain.vue";
// import Test from "@/components/common/Test.vue";

export default {
  components: {
    CentralWord,
    EnterMain,
    MyContainer,
    MyFoot
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
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
  margin-top: 30px;
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
<<<<<<< HEAD
      background-image: url(#{$qiBaseURL}/QRcode.png);
=======
      background-image: url(http://qm23h04eq.hn-bkt.clouddn.com/QRcode.png);
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
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
