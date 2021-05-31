<template>
  <v-main class="category">
    <header class="welcome_head">
      <CentralWord welcomeWord="文章分类" />
      <EnterMain></EnterMain>
    </header>

    <MyContainer>
      <div class="wrapper d-flex justify-center">
        <!-- <div class="title">分类：{{ categories.total }}</div> -->
        <div class="content mt-10 justify-center">
          <li v-for="kind in categories" :key="kind.id" class="float-left">
            <router-link
              :to="{
                name: 'articleCardList',
                params: { CategoryId: kind.id },
                query: { CategoryName: kind.name }
              }"
            >
              <div class="book">
                <div class="book_face">
                  {{ kind.name }}
                </div>
                <div class="details">
                  <h2>{{ kind.name }}</h2>
                  <div style="margin-top:20px">
                    累计文章数量：{{ kind.count || 0 }}
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </div>
      </div>
    </MyContainer>

    <MyFoot />
  </v-main>
</template>

<script>
// @ is an alias to /src
import CentralWord from "@/components/common/CentralWord";
import EnterMain from "@/components/common/CentralWord/EnterMain";
import MyContainer from "@/components/layouts/MyContainer.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import * as categoryHttp from "@/service/CategoryService.js";

export default {
  name: "category",
  components: {
    CentralWord,
    EnterMain,
    MyContainer,
    MyFoot
  },
  data: () => ({
    categories: {}
  }),
  async created() {
    try {
      const resp = await categoryHttp.getAllKindAndCount();
      // 去掉分类标题的 书名号
      const res = resp.map(item => {
        item.name = item.name.replace("《", "");
        item.name = item.name.replace("》", "");
        return item;
      });

      this.categories = res;
    } catch (error) {
      console.log("获取文章分类失败");
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  .wrapper {
    padding: 3vw 0;
    @include borderShadow;

    &:hover {
      transform: translateY(7px);
    }

    .title {
      font-size: 5vh !important;
      text-align: center;
    }

    .content {
      width: 90%;

      .book {
        $bookBg: #3b515c;

        width: 200px;
        height: 300px;
        margin: 2vw;
        background: #fff;
        color: #333;
        transform-style: preserve-3d;
        /* 开启3D空间 */
        transform: perspective(2000px);
        box-shadow: inset 300px 0 50px rgba(0, 0, 0, 0.5),
          0 20px 100px rgba(0, 0, 0, 0.5);
        transition: 1s;

        &:hover {
          transform: perspective(2000px) rotate(-10deg);
          box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5),
            0 10px 100px rgba(0, 0, 0, 0.5);
        }

        &::before {
          /*上边框*/
          content: "";
          position: absolute;
          /* top: -5px; */
          left: 0;
          width: 100%;
          height: 5px;
          /* z-index: 10; */
          background-color: $bookBg;
          /* transform: skewX(-45deg); */
          /*X轴扭曲*/
        }

        &::after {
          /*右边框*/
          content: "";
          position: absolute;
          top: 0;
          right: -5px;
          width: 5px;
          height: 100%;
          background-color: $bookBg;
        }

        .book_face {
          background-color: $bookBg;
          border: solid 3px #333;
          border-left: none;
          width: 102%;
          height: 100%;
          position: relative;
          transform-origin: left;
          /*更改元素变形位置*/
          transition: 1s cubic-bezier(0.15, 1.7, 0.84, 0.58);
          @include flexCenter;
          font-size: 20px;
          font-weight: bold;
          padding: 20px;
          box-sizing: border-box;
        }

        &:hover {
          .book_face {
            transform: rotateY(-155deg);
            /*Y轴转动*/
          }
        }

        .details {
          /*文本效果*/
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          padding: 20px;
          z-index: -1;
        }
      }
    }
  }

  // 手机屏，通栏布局
  @media screen and (max-width: $phone_computer) {
    .content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}
</style>
