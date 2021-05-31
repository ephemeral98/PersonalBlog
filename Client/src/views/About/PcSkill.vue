<template>
  <div class="skill_wrap">
    <div class="arrow_down1"></div>
    <div class="arrow_down2"></div>
    <div class="arrow_down3"></div>
    <div class="arrow_down4"></div>
    <div class="arrow_down5"></div>
    <div class="arrow_down6"></div>
    <div class="arrow_down7"></div>
    <div class="arrow_down8"></div>
    <div class="arrow_down9"></div>
    <div class="arrow_down10"></div>
    <div class="arrow_down11"></div>
    <div class="arrow_down12"></div>
    <div class="arrow_down13"></div>
    <div class="arrow_down14"></div>
    <div class="arrow_down15"></div>
    <div class="arrow_down16"></div>
    <div class="arrow_down17"></div>
    <div class="arrow_right1"></div>
    <div class="arrow_right2"></div>
    <div class="arrow_right3"></div>
    <div class="arrow_right4"></div>
    <div class="across1"></div>
    <div class="across2"></div>
    <div class="across3"></div>
    <div class="across4"></div>

    <div class="skills">
      <div
        @mouseenter="skill.isShowSkillMenu = true"
        @mouseleave="skill.isShowSkillMenu = false"
        :class="[skill.boxSize, skill.name, { hiddenBox: skill.level === 0 }]"
        v-for="skill in skillList"
        :key="skill.name"
      >
        <div v-show="skill.isShowSkillMenu" class="skill_menu">
          <span class="title">{{ skill.text }}</span>
          <div class="container">
            <div v-for="(item, i) in skill.skillMenu" :key="i">
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
        <img :src="globalConst.qiBaseURL + skill.src" alt="" class="logo" />
        <div class="lv">Lv{{ skill.level }}</div>
      </div>
    </div>

    <!-- ex技能 -->
    <div class="ex_list">
      <div class="ex title">ex技能：</div>
      <div
        :class="['ex', 'box', { hiddenBox: ex.level === 0 }]"
        v-for="ex in exSkillList"
        :key="ex.name"
      >
        <div v-show="ex.isShowSkillMenu" class="skill_menu">
          <span class="title">{{ ex.text }}</span>
          <div class="container">
            <div v-for="(item, i) in ex.skillMenu" :key="i">
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
        <img :src="globalConst.qiBaseURL + ex.src" alt="" class="logo" />
        <div class="lv">{{ ex.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mainSkills", "exSkills"],
  data: () => ({
    skillList: [
      {
        name: "html",
        text: "HTML",
        src: "/html.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "整个前端开发最简单的技能，网页的骨架。目前最新版本[HTML5]新增了许多新特性了"
          },
          {
            title: "技能属性",
            content: [{ name: "智力:", val: "50" }]
          },
          {
            title: "前置技能",
            content: "有手就行"
          }
        ]
      },
      {
        name: "javascript",
        text: "JavaScript",
        src: "/javascript.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "整个前端开发最重要的技能，是核心基础！包括[ES][DOM][BOM]，目前最新[ES6+]每年一更"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "50"
              },
              {
                name: "魔防:",
                val: "50"
              },
              {
                name: "暴击率:",
                val: "50%"
              },
              {
                name: "命中率:",
                val: "50%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "有手有脑就行"
          }
        ]
      },
      {
        name: "css",
        text: "CSS",
        src: "/css.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "如果说html是房子骨架，那么css就是刷油漆、上颜色。目前最新版本[CSS3]增加了许多好看的样式"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "命中率:",
                val: "10%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[html]"
          }
        ]
      },
      {
        name: "jquery",
        text: "JQuery",
        src: "/jq.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "三大框架的出现，[jQuery]的作用越来越小了，但是对付一些小型的页面，比如一些广告还是比较好的"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
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
        name: "bootstrap",
        text: "BootStrap",
        src: "/bootstrap.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "不用写一行[css]，就能有比较好看的样式。非常适合后台管理系统"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[css][javaScript]"
          }
        ]
      },
      {
        name: "mpvue",
        text: "mpvue",
        src: "/mpvue.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "美团的开源小程序框架，用的Vue的语法，不再需要用那有点恶心的原生小程序开发了。。"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[Vue]"
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
                name: "智力:",
                val: "30"
              }
            ]
          }
        ]
      },
      {
        name: "mock",
        text: "Mock.js",
        src: "/mockjs.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "前后端分离，各自按照需求接口的约定进行开发，而mockjs，主要作用是模拟数据"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "命中率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[网络通信][javaScript]"
          }
        ]
      },
      {
        name: "uniapp",
        text: "uni-app",
        src: "/uniapp.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "跨端开发利器，一套代码，多端运行，包括网页端、小程序、安卓、IOS。用的[Vue]的语法"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[Vue]"
          }
        ]
      },
      {
        name: "webpack",
        text: "Webpack",
        src: "/webpack.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "写代码就按照你的方式踏踏实实的写，其他事情，交给[webpack]处理。[webpack]面前，一切皆模块！"
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
                val: "40%"
              },
              {
                name: "魔防:",
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
        name: "sass",
        text: "Sass",
        src: "/sass.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "css预处理器，编写css的时候，更加轻便"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[css]"
          }
        ]
      },
      {
        name: "less",
        text: "Less",
        src: "/less.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "css预处理器，编写css的时候，更加轻便"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[css]"
          }
        ]
      },
      {
        name: "postcss",
        text: "PostCSS",
        src: "/postcss.jpg",
        level: 0,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "css预处理器，编写css的时候，更加轻便"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[css]"
          }
        ]
      },
      {
        name: "stylus",
        text: "Stylus",
        src: "/stylus.jpg",
        level: 0,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "css预处理器，编写css的时候，更加轻便"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[css]"
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
                name: "智力:",
                val: "40"
              },
              {
                name: "暴击率:",
                val: "40%"
              },
              {
                name: "魔防:",
                val: "40%"
              },
              {
                name: "命中率:",
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
        name: "element",
        text: "Element",
        src: "/element.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "饿了么团队开源项目，基于Vue的样式组件"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[Vue]"
          }
        ]
      },
      {
        name: "vuetify",
        text: "Vuetify",
        src: "/vuetify.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "国外基于Vue的样式组件"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[Vue]"
          }
        ]
      },
      {
        name: "vuessr",
        text: "VueSSR",
        src: "/vuessr.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "Vue的服务端渲染"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "命中率:",
                val: "30%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[Vue][node]"
          }
        ]
      },
      {
        name: "nuxt",
        text: "Nuxt.js",
        src: "/nuxt.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "Vue的服务端渲染框架"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "命中率:",
                val: "30%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[Vue][node]"
          }
        ]
      },
      {
        name: "sql",
        text: "数据库",
        src: "/sql.jpg",
        level: 1,
        boxSize: "box",
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
                name: "智力:",
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
                name: "智力:",
                val: "30"
              },
              {
                name: "暴击率:",
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
        name: "express",
        text: "Express",
        src: "/express.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "基于[node.js]的框架，更轻易的开发服务器"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "30%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[node.js]"
          }
        ]
      },
      {
        name: "koa",
        text: "KOA",
        src: "/koa.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "基于[node.js]的框架，更轻易的开发服务器，比[Express]处理异步更加友好，其洋葱模型尤为出名。"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "35%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[node.js]"
          }
        ]
      },
      {
        name: "egg",
        text: "Egg.js",
        src: "/egg.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "基于[node.js]的框架，更轻易的开发服务器，阿里出品，可以理解为大礼包版本的[KOA]"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[node.js]"
          }
        ]
      },
      {
        name: "nest",
        text: "Nest.js",
        src: "/nest.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "对比[Egg.js]，它完美支持[TypeScript]"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[node.js]"
          }
        ]
      },
      {
        name: "mysql",
        text: "MySQL",
        src: "/mysql.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "关系型数据库，传统的sql语句，社区版免费开源"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "40"
              },
              {
                name: "暴击率:",
                val: "40%"
              },
              {
                name: "命中率:",
                val: "30%"
              },
              {
                name: "魔防:",
                val: "30%"
              }
            ]
          }
        ]
      },
      {
        name: "mongodb",
        text: "MongoDB",
        src: "/mongoDB.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "非关系型数据库，存取速度比较快，通过键值对存取。"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          }
        ]
      },
      {
        name: "sequelize",
        text: "Sequelize",
        src: "/sequelize.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "[MySQL]的ORM框架，不再需要数据驱动程序，能做出可移植的数据库"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[node.js][MySQL]"
          }
        ]
      },
      {
        name: "mongoose",
        text: "Mongoose.js",
        src: "/mongoose.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "[MongoDB]的ORM框架"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[node.js][MongoDB]"
          }
        ]
      },
      {
        name: "taro",
        text: "Taro",
        src: "/taro.jpg",
        level: 1,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "跨端开发利器，一套代码，多端运行，包括网页端、小程序、RN。用的[React]的语法"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "40%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[React]"
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
        name: "reactssr",
        text: "ReactSSR",
        src: "/reactssr.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "react的服务端开发"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "20%"
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
        name: "next",
        text: "next.js",
        src: "/next.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "react的服务端开发框架"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "命中率:",
                val: "30%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[React]"
          }
        ]
      },
      {
        name: "antdesign",
        text: "Ant Design",
        src: "/antDesign.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "基于react的组件库"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "20%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[React]"
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
                name: "智力:",
                val: "30"
              },
              {
                name: "暴击率:",
                val: "30%"
              },
              {
                name: "命中率:",
                val: "30%"
              },
              {
                name: "魔防:",
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
        boxSize: "box",
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
        name: "rn",
        text: "React Native",
        src: "/rn.jpg",
        level: 0,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "RN是Facebook于2015年4月开源的跨平台移动应用开发框架，支持iOS和安卓两大平台"
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
        name: "flutter",
        text: "Flutter",
        src: "/flutter.jpg",
        level: 0,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "跨平台开发利器，但是语法并不是[javaScript]，而是[Dart]，而[Dart]可以转义为[javaScript]"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "30"
              },
              {
                name: "暴击率:",
                val: "30%"
              }
            ]
          },
          {
            title: "前置技能",
            content: "[Dart]"
          }
        ]
      },
      {
        name: "electron",
        text: "Electron",
        src: "/electron.jpg",
        level: 0,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "利用[javaScript]开发桌面端程序，而大名鼎鼎的VSCode就是用electron开发出来的"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
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
        name: "webGl",
        text: "WebGL",
        src: "/webGl.jpg",
        level: 0,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "可以绘制很多精美的图形"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
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
        name: "vite",
        text: "Vite",
        src: "/vite.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "伴随着Vue3出来的，尤大大放弃了[webpack]。。自己搞了个脚手架。[Vite]根本没有打包过程，直接启动的服务器，所以对比[webpack]速度快很多。"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "20"
              },
              {
                name: "暴击率:",
                val: "30%"
              }
            ]
          }
        ]
      },
      {
        name: "grunt",
        text: "Grunt",
        src: "/grunt.jpg",
        level: 0,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "构建工具...，这玩意其实也快走出历史的舞台了"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "10%"
              }
            ]
          }
        ]
      },
      {
        name: "gulp",
        text: "Gulp",
        src: "/gulp.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "基于流的构建化工具"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "10%"
              }
            ]
          }
        ]
      },
      {
        name: "echarts",
        text: "ECharts",
        src: "/echarts.jpg",
        level: 1,
        boxSize: "minibox",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "轻松绘制出图表"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "10"
              },
              {
                name: "暴击率:",
                val: "30%"
              }
            ]
          }
        ]
      },
      {
        name: "angular",
        text: "Angular",
        src: "/angular.jpg",
        level: 0,
        boxSize: "box",
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "三大主流框架之一，由于出现的时间点比较尴尬，以及使用的复杂度比较大，造成了三大框架中使用的人数最少的一个。"
          },
          {
            title: "技能属性",
            content: [
              {
                name: "智力:",
                val: "30"
              },
              {
                name: "暴击率:",
                val: "30%"
              },
              {
                name: "命中率",
                val: "20%"
              },
              {
                name: "魔防",
                val: "20"
              }
            ]
          }
        ]
      }
    ],
    exSkillList: [
      {
        name: "docker",
        text: "Docker",
        src: "/docker.jpg",
        level: 0,
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "近些年非常流行的一个技术，本人了解的不多，百度一下吧。。"
          }
        ]
      },
      {
        name: "linux",
        text: "Linux",
        src: "/linux.jpg",
        level: 0,
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "开源操作系统，基于命令式操作。当然也有许多发行版本：Ubuntu、CentOS、等"
          }
        ]
      },
      {
        name: "photoshop",
        text: "PhotoShop",
        src: "/ps.jpg",
        level: 1,
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content: "修图神器，亚洲四大邪术之一。"
          }
        ]
      },
      {
        name: "Git",
        src: "/git.jpg",
        level: 1,
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "代码仓库，版本控制，团队合作开发的利器，特点是分布式开发。"
          }
        ]
      },
      {
        name: "SVN",
        src: "/svn.jpg",
        level: 1,
        isShowSkillMenu: false,
        skillMenu: [
          {
            title: "技能说明",
            content:
              "代码仓库，版本控制，团队合作开发的利器，特点是集中式开发。"
          }
        ]
      }
    ]
  }),

  methods: {
    // 获取技能加点
    fetchMainSkills() {
      this.skillList.forEach(skill => {
        this.mainSkills.datas &&
          this.mainSkills.datas.forEach(msk => {
            if (skill.name === msk.name) {
              skill.level = msk.level;
            }
          });
      });
    },
    // 获取ex技能加点
    fetchExSkills() {
      this.exSkillList.forEach(skill => {
        console.log(this.exSkills);
        this.exSkills.datas &&
          this.exSkills.datas.forEach(esk => {
            if (skill.name === esk.name) {
              skill.level = esk.level;
            }
          });
      });
    }
  },
  watch: {
    exSkills: {
      handler(val) {
        console.log(val);
        if (val) {
          this.fetchExSkills();
        }
      },
      deep: true,
      immediate: true
    },
    mainSkills: {
      handler(val) {
        if (val) {
          this.fetchMainSkills();
        }
      },
      deep: true,
      immediate: true
    }
  }
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

$jsCol: 300px; // js 所在列 （主线技能）
$boxWidth: 60px; // 每个技能的宽度
$miniboxWidth: 40px; // 小技能的宽度

@mixin pos($left: $jsCol, $top: 0) {
  left: $left;
  top: $top;
}

.skill_wrap {
  margin: 50px auto;
  width: 1300px;
  height: 1600px;
  @include borderShadow;
  // padding: 10px;
  box-sizing: border-box;
  position: relative;
  // background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
}

.box {
  width: $boxWidth;
  height: 80px;
  box-shadow: 0 0 10px 0 gold;
  @include flexCenter;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;

  animation: activeColor 2s infinite;

  .skill_menu {
    width: 250px;
    min-height: 380px;
    background-color: #111;
    color: #818181;
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    left: $boxWidth;
    top: 0;
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
        max-height: 90px;
        overflow: hidden;
        @include mulOverHidden(4);
        font-size: 12px;
      }
    }
  }

  .logo {
    display: block;
    width: $boxWidth;
    height: $boxWidth;
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
  @extend .box;
  width: $miniboxWidth;
  height: 60px;

  .skill_menu {
    left: $miniboxWidth;
  }

  .logo {
    width: $miniboxWidth;
    height: $miniboxWidth;
  }
}

.ex_list {
  display: flex;
  // transform: translateY(600px);
  align-items: center;
  @include center(absolute);
  top: 95%;

  .title {
    font-size: 26px;
    font-weight: bold;
    @include txtGradient("EX技能：", $my_blue, $my_pink, gold);
    position: static;
  }

  .box {
    margin-left: 30px;
    position: static !important;
  }
}

.html {
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 20px;
  bottom: 0;
}

.javascript {
  @include pos($jsCol, 90px);
}

.css {
  @include pos(938px, 92px);
}

.jquery {
  @include pos($jsCol, 260px);
}

.bootstrap {
  @include pos(618px, 262px);
}

.mpvue {
  @include pos(230px, 740px);
}

.net {
  @include pos($jsCol, 390px);
}

.mock {
  @include pos(418px, 390px);
}

.uniapp {
  @include pos(210px, 645px);
}

.webpack {
  @include pos($jsCol, 517px);
}

.sass {
  @include pos(880px, 506px);
}

.less {
  @include pos(990px, 506px);
}

.postcss {
  @include pos(1100px, 506px);
}

.stylus {
  @include pos(1180px, 506px);
}

.vue {
  @include pos($jsCol, 645px);
}

.element {
  @include pos(418px, 645px);
}

.vuetify {
  @include pos(500px, 645px);
}

.vuessr {
  @include pos(880px, 645px);
}

.nuxt {
  @include pos(990px, 645px);
}

.node {
  @include pos($jsCol, 776px);
}

.mysql {
  @include pos(70px, 912px);
}

.mongodb {
  @include pos(148px, 912px);
}

.sequelize {
  @include pos(70px, 1018px);
}

.mongoose {
  @include pos(148px, 1018px);
}

.express {
  @include pos(418px, 776px);
}

.koa {
  @include pos(500px, 776px);
}

.egg {
  @include pos(582px, 776px);
}

.nest {
  @include pos(664px, 776px);
}

.sql {
  @include pos(112px, 776px);
}

.taro {
  @include pos(210px, 1165px);
}

.react {
  @include pos($jsCol, 1165px);
}

.reactssr {
  @include pos(880px, 1165px);
}

.next {
  @include pos(990px, 1165px);
}

.antdesign {
  @include pos(418px, 1165px);
}

.ts {
  @include pos($jsCol, 1292px);
}

.miniapp {
  @include pos(0, 645px);
}

.rn {
  @include pos(230px, 1255px);
}

.flutter {
  @include pos(172px, 1255px);
}

.webGl {
  @include pos(113px, 1255px);
}

.electron {
  @include pos(54px, 1255px);
}

.vite {
  @include pos(582px, 517px);
}

.grunt {
  @include pos(418px, 517px);
}

.gulp {
  @include pos(500px, 517px);
}

.echarts {
  @include pos(230px, 260px);
}

.angular {
  @include pos(700px, 1292px);
}

[class^="arrow_down"] {
  float: right;
  width: 10px;
  height: 40px;
  // background-color: blue;
  position: absolute;

  animation: flowDown 0.8s infinite;
}

/* [class^="arrow_down"]::after {
  content: "";
  display: block;
  border: solid 10px transparent;
  border-top: solid 15px pink;
  position: absolute;
  bottom: 0;
} */

.arrow_down1 {
  @include pos(325px, 175px);
  height: 80px;
}

.arrow_down2 {
  @include pos(963px, 175px);
  height: 80px;
}

.arrow_down3 {
  @include pos(644px, 218px);
}

.arrow_down4 {
  @include pos(325px, 345px);
}

.arrow_down5 {
  @include pos(325px, 475px);
}

.arrow_down6 {
  @include pos(325px, 600px);
}

.arrow_down7 {
  @include pos(325px, 730px);
}

.arrow_down8 {
  @include pos(325px, 860px);
  height: 300px;
}

.arrow_down9 {
  @include pos(325px, 1248px);
}

.arrow_down10 {
  @include pos(905px, 263px);
  height: 238px;
}

.arrow_down11 {
  @include pos(1015px, 263px);
  height: 238px;
}

.arrow_down12 {
  @include pos(137px, 860px);
  height: 20px;
}

.arrow_down13 {
  @include pos(100px, 890px);
  height: 20px;
}

.arrow_down14 {
  @include pos(170px, 890px);
  height: 20px;
  animation: none;
  box-shadow: 0 0 10px 0 lightGray;
}

.arrow_down15 {
  @include pos(170px, 995px);
  height: 20px;
  animation: none;
  box-shadow: 0 0 10px 0 lightGray;
}

.arrow_down16 {
  @include pos(100px, 995px);
  height: 20px;
}

.arrow_down17 {
  top: 725px !important;
  left: 24px;
  height: 490px !important;
}

[class^="across_down"] {
  float: right;
  width: 10px;
  height: 80px;
  position: absolute;
  animation: flowDown 0.8s infinite;
}

[class^="arrow_right"] {
  width: 90px;
  height: 10px;
  position: absolute;
  animation: flowRight 0.8s infinite;
}

/* [class^='arrow_right']::after {
      content: '';
      display: block;
      border: solid 10px transparent;
      border-left: solid 15px pink;
      position: absolute;
      bottom: 0;
      // transform: translate(90px, 25%);
    } */

.arrow_right1 {
  @include pos(940px, 680px);
  width: 50px;
  animation: none;
  box-shadow: 0 0 10px lightGray;
}

.arrow_right2 {
  @include pos(940px, 1203px);
  width: 50px;
  animation: none;
  box-shadow: 0 0 10px lightGray;
}

.arrow_right3 {
  @include pos(60px, 680px);
  width: 150px;
}

.arrow_right4 {
  @include pos(24px, 1205px);
  width: 185px;
}

[class^="arrow_right"] {
  position: absolute;
}

/* [class^="arrow_right"]::after {
  content: "";
  display: block;
  border: solid 10px transparent;
  border-left: solid 15px purple;
  position: absolute;
  right: 0;
  top: 50%;
} */

[class^="across"] {
  height: 10px;
  position: absolute;
  animation: flowRight 0.8s infinite;
}

.across1 {
  @include pos(335px, 209px);
  width: 628px;
}

.across2 {
  @include pos(905px, 255px);
  width: 120px;
}

.across3 {
  @include pos(100px, 880px);
  width: 80px;
}

.across4 {
  @include pos($jsCol, 810px);
  width: 400px;
  animation: none;
  box-shadow: 0 0 3px 0 lightGray;
  opacity: 1 !important;
}
</style>
