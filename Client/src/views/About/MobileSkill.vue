<template>
  <!-- 移动端适配显示的技能树 -->
  <div class="skill_wrap">
    <div class="across_left1"></div>
    <div class="across_right1"></div>
    <div class="across_right2"></div>
    <div class="across_down1"></div>
    <div class="across_down2"></div>
    <div class="across_down3"></div>
    <!-- 技能菜单 -->
    <transition
      enter-active-class="animate__animated animate__flip"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div class="skill_menu" v-show="isShowSkillMenu">
        <span class="title">{{ skillMenu.text }}</span>
        <div class="container">
          <div v-for="(item, i) in skillMenu.list" :key="i">
            <div class="title">[{{ item.title }}]</div>
            <div class="content" v-if="typeof item.content === 'string'">
              {{ item.content }}
            </div>
            <div class="content" v-else>
              <div v-for="c in item.content" :key="c.name">
                <span>{{ c.name }}</span>
                <span>{{ c.val }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="skills">
      <div
        @click="handleShowSkillMenu(skill.text, skill.skillMenu)"
        :class="[skill.boxSize, skill.name, { hiddenBox: skill.level === 0 }]"
        v-for="skill in skillList"
        :key="skill.name"
      >
        <img :src="globalConst.qiBaseURL + skill.src" alt="" class="logo" />
        <div class="lv">Lv{{ skill.level }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getAllSkills } from "@/service/SkillService.js";
export default {
  props: ["skills"],
  data: () => ({
    skillList: [
      {
        name: "basic",
        text: "三大基础",
        src: "/basic.png",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "前端三大基础包括：[HTML]、[CSS]、[JavaScript]"
          },
          {
            title: "技能属性",
            content: [
              { name: "智力: ", val: "60" },
              {
                name: "命中率: ",
                val: "60%"
              },
              {
                name: "暴击率: ",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "有手就行"
          }
        ]
      },
      {
        name: "otherPackage",
        text: "第三方库",
        src: "/package.png",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "优秀的第三方库有许多，比如[JQuery]、[Bootstrap]，让你搭建项目不用一步一步徒手堆，毕竟人和动物的区别是 是否会制造和和使用工具"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "10"
              },
              {
                name: "魔防: ",
                val: "15"
              },
              {
                name: "暴击率: ",
                val: "20%"
              },
              {
                name: "命中率: ",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[HTML]、[CSS]、[JavaScript]"
          }
        ]
      },
      {
        name: "net",
        text: "网络通信",
        src: "/net.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "计算机网络相关，主要包括ajax、fetch等异步通信。get、post、put、delete等请求方法。cookie、session、token等存储方式。"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "30"
              }
            ]
          }
        ]
      },
      {
        name: "project",
        text: "工程化",
        src: "/project.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "工程化包括[Npm]、[Yarn]等包管理器、[Webpack]、[gulp]、[Vite]等构件工具、[Sass]、[Less]等预处理器"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "30"
              },
              {
                name: "暴击率: ",
                val: "40%"
              },
              {
                name: "魔防: ",
                val: "50%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[html][css][javaScript]"
          }
        ]
      },
      {
        name: "vue",
        text: "Vue全家桶",
        src: "/vue.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "三大主流框架之一，国内非常火爆的框架，用的template让开发者上手相对比较轻松。数据驱动，不再需要手动操作DOM。全家桶包括Vue、Vue-Router、Vue-Cli、Vuex"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "40"
              },
              {
                name: "暴击率: ",
                val: "40%"
              },
              {
                name: "魔防: ",
                val: "40%"
              },
              {
                name: "命中率: ",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[html][css][javaScript]"
          }
        ]
      },
      {
        name: "sql",
        text: "数据库",
        src: "/sql.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "当代持久化数据利器"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "40"
              }
            ]
          }
        ]
      },
      {
        name: "node",
        text: "Node.js",
        src: "/node.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "让[javaScript]不再局限于浏览器端。可用于开发服务器"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "30"
              },
              {
                name: "暴击率: ",
                val: "30%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[javaScript]"
          }
        ]
      },
      {
        name: "react",
        text: "React全家桶",
        src: "/react.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "三大主流框架之一，目前几乎和[Vue]平分天下，上手难度比[Vue]大，用的jsx语法，在一些场景比[Vue]的template更加灵活"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "50"
              },
              {
                name: "暴击率:",
                val: "50%"
              },
              {
                name: "命中率:",
                val: "50%"
              },
              {
                name: "魔防:",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[javaScript]"
          }
        ]
      },
      {
        name: "ts",
        text: "TypeScript",
        src: "/ts.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "让[javaScript]有了类型系统，避免了很多不严谨产生的问题，是[javaScript]的超集，完全兼容[javaScript]"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "30"
              },
              {
                name: "暴击率: ",
                val: "30%"
              },
              {
                name: "命中率: ",
                val: "30%"
              },
              {
                name: "魔防: ",
                val: "30%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[javaScript]"
          }
        ]
      },
      {
        name: "miniapp",
        text: "小程序",
        src: "/miniapp.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "小程序开发"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[javaScript]"
          }
        ]
      },
      {
        name: "hybrid",
        text: "跨端开发",
        src: "/cross.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "能被js改写的终将被js改写，js不仅能在浏览器上运行，能被[uni-app]、[React Native]、[taro]等打包成IOS和安卓的程序，能被[electron]打包成桌面端程序"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力: ",
                val: "30"
              },
              {
                name: "暴击率: ",
                val: "50%"
              },
              {
                name: "命中率: ",
                val: "50%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[vue] or [react]"
          }
        ]
      }
    ],

    skillMenu: {
      text: "JavaScript",
      list: [
        {
          title: "技能说明",
          content: "前端三大基础包括：[HTML]、[CSS]、[JavaScript]"
        },
        {
          title: "技能属性",
          content: [
            { name: "智力: ", val: "60" },
            {
              name: "命中率: ",
              val: "60%"
            },
            {
              name: "暴击率: ",
              val: "40%"
            }
          ]
        },
        {
          title: "前置技能",
          content: "有手就行"
        }
      ]
    },

    isShowSkillMenu: false,
    timer: null
  }),
  methods: {
    handleShowSkillMenu(text, menu) {
      clearInterval(this.timer);
      this.skillMenu.text = text;
      this.skillMenu.list = menu;
      this.isShowSkillMenu = true;
      this.timer = setTimeout(() => {
        this.isShowSkillMenu = false;
      }, 3000);
    },
    // 获取技能加点
    fetchMainSkills() {
      this.skillList.forEach(skill => {
        this.skills?.datas?.forEach(msk => {
          if (skill.name === msk.name) {
            skill.level = msk.level;
          }
        });
      });
    }
  },
  watch: {
    skills: {
      handler(val) {
        if (val) {
          this.fetchMainSkills();
        }
      },
      deep: true,
      immediate: true
    }
  }

  /* async created() {
    const { mainSkills, exSkills } = await getAllSkills();
    // console.log(mainSkills, exSkills);
    // debugger;

    this.skillList.forEach(skill => {
      mainSkills.datas.forEach(msk => {
        if (skill.name === msk.name) {
          skill.level = msk.level;
        }
      });
    });

    this.exSkillList.forEach(skill => {
      exSkills.datas.forEach(esk => {
        if (skill.name === esk.name) {
          skill.level = esk.level;
        }
      });
    });
  } */
};
</script>

<style lang="scss" scoped>
$gold1: rgb(235, 235, 135);
$gold2: rgb(255, 235, 124);
$gold3: yellow;
$gold4: lightyellow;
$gold5: rgb(255, 246, 193);

// 激活状态动画
@keyframes activeColor {
  0% {
    box-shadow: 0 0 10px 0 $gold2;
  }

  50% {
    box-shadow: 0 0 30px 0 gold;
  }

  100% {
    box-shadow: 0 0 10px 0 $gold2;
  }
}

// 流光动画
@mixin flowColor($flowName: "flowDown", $dir: bottom) {
  @keyframes #{$flowName} {
    0% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold1,
        $gold2,
        $gold3,
        $gold4,
        $gold5
      );
    }

    10% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold5,
        $gold1,
        $gold2,
        $gold3,
        $gold4
      );
    }

    20% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold4,
        $gold5,
        $gold1,
        $gold2,
        $gold3
      );
    }

    30% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold3,
        $gold4,
        $gold5,
        $gold1,
        $gold2
      );
    }

    40% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold2,
        $gold3,
        $gold4,
        $gold5,
        $gold1
      );
    }

    50% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold1,
        $gold2,
        $gold3,
        $gold4,
        $gold5
      );
    }

    60% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold5,
        $gold1,
        $gold2,
        $gold3,
        $gold4
      );
    }

    70% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold4,
        $gold5,
        $gold1,
        $gold2,
        $gold3
      );
    }

    80% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold3,
        $gold4,
        $gold5,
        $gold1,
        $gold2
      );
    }

    90% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold2,
        $gold3,
        $gold4,
        $gold5,
        $gold1
      );
    }

    100% {
      box-shadow: 0 0 10px 0 gold;
      background-image: linear-gradient(
        to $dir,
        $gold1,
        $gold2,
        $gold3,
        $gold4,
        $gold5
      );
    }
  }
}

@include flowColor("flowDown", bottom); //流光动画向下
@include flowColor("flowRight", right); // 流光动画向右
@include flowColor("flowLeft", left); // 流光动画向右

$jsCol: 300px; // js 所在列 （主线技能）
$boxWidth: 60px; // 每个技能的宽度
$miniboxWidth: 40px; // 小技能的宽度

@mixin pos($w: 0, $h: 0, $left: 0, $top: 0) {
  width: $w;
  height: $h;
  left: $left;
  top: $top;
}

$boxDis: 80px; // 盒子之间的距离

.skill_wrap {
  margin: 100px auto;
  width: 95%;
  height: 1300px;
  padding: 10px;
  @include borderShadow;
  // padding: 10px;
  box-sizing: border-box;
  position: relative;
  // background-color: rgba(255, 255, 255, 0);
  // backdrop-filter: blur(5px); // 不能放在这里，要放到根元素那，不然会影响 position 定位

  .skills {
    @include flexCenter;
    flex-direction: column;
  }
}

html {
  backdrop-filter: blur(5px);
}

@mixin boxStyle($w) {
  width: $w;
  height: 80px;
  box-shadow: 0 0 10px 0 gold;
  @include flexCenter;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  margin-top: $boxDis;

  animation: activeColor 2s infinite;

  .logo {
    display: block;
    width: $w;
    height: $w;
  }
}

.box {
  @include boxStyle($boxWidth);

  &:not(:nth-of-type(1))::after {
    content: "";
    display: block;
    width: 10px;
    height: $boxDis;
    // background-color: green;
    position: absolute;
    top: -$boxDis;
    left: 50%;
    transform: translateX(-50%);
    animation: flowDown 0.8s infinite;
  }
}

.hiddenBox {
  @extend .box;
  opacity: 0.5;
  box-shadow: 0 0 10px gray !important;
}

.lv {
  font-size: 12px;
}

.minibox {
  @include boxStyle($miniboxWidth);
  height: 60px;
  position: absolute;
}

.hybrid {
  left: 72%;
  transform: translateY(18px);
}

.miniapp {
  left: 15vw;
  transform: translateY(18px);
}

.sql {
  left: 72%;
  transform: translateY(330px);
}

[class^="across_"] {
  position: absolute;
  background-color: gold;
}

.across_left1 {
  @include pos(22.3vw, 10px, 19.7vw, 610px);
  animation: flowLeft 0.8s infinite;
}

.across_right1 {
  @include pos(22vw, 10px, 51vw, 610px);
  animation: flowRight 0.8s infinite;
}

.across_down1 {
  @include pos(10px, 65px, 21%, 610px);
  animation: flowDown 0.8s infinite;
}

.across_down2 {
  @include pos(10px, 65px, 76%, 610px);
  animation: flowDown 0.8s infinite;
}

.across_right2 {
  @include pos(22vw, 10px, 51vw, 930px);
  animation: flowRight 0.8s infinite;
}

.across_down3 {
  @include pos(10px, 65px, 76%, 930px);
  animation: flowDown 0.8s infinite;
}

.skill_menu {
  @include modal_center(80vw, auto);
  // @include center(fixed);
  bottom: auto !important;
  background-color: #111;
  color: #818181;
  // min-height: 100vw;
  width: 75vw;
  margin: 20% auto;
  padding: 2.5vw;
  box-sizing: border-box;
  z-index: 999;

  > .title {
    font-size: 28px !important;
    font-weight: bold;
    color: #fff;
  }

  .container {
    padding: 0 !important;

    > div {
      margin-top: 20px;
    }
    .title {
      color: #ffdb8f;
      font-size: 16px !important;
    }
    .content {
      width: 100%;
      max-height: 20vw;
      overflow: hidden;
      @include mulOverHidden(4);
      font-size: 12px;
    }
  }
}
</style>
