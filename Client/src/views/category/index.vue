<template>
  <v-main class="category">
    <TopBar />

    <header class="welcome_head">
      <CentralWord welcomeWord="分类" />
      <EnterMain></EnterMain>
    </header>

    <MyContainer>
      <div class="wrapper d-flex justify-center">
        <!-- <div class="title">分类：{{ categories.total }}</div> -->
        <div class="content mt-10 justify-center">
          <li
            v-for="kind in categories.datas"
            :key="kind.id"
            class="float-left"
          >
            <router-link :to="{ name: 'articleCardList' }">
              <div class="door">
                <div class="door_inner">
                  {{ kind.name }} ({{ kind.count || 0 }})
                </div>
                <div class="door_l"></div>
                <div class="door_r"></div>
                <div class="doorplate">
                  {{ kind.name }} ({{ kind.count || 0 }})
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
import TopBar from "@/components/common/TopBar";
import CentralWord from "@/components/common/CentralWord";
import EnterMain from "@/components/common/CentralWord/EnterMain";
import MyContainer from "@/components/common/MyContainer.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import * as categoryHttp from "@/service/CategoryService.js";

export default {
  name: "Home",
  components: {
    TopBar,
    CentralWord,
    EnterMain,
    MyContainer,
    MyFoot
  },
  data: () => ({
    categories: {
      total: 10,
      datas: [
        {
          id: 2,
          name: "科技",
          count: 333
        },
        {
          id: 3,
          name: "英语",
          count: 444
        },
        {
          id: 4,
          name: "语文",
          count: 555
        },
        {
          id: 5,
          name: "数学",
          count: 666
        },
        {
          id: 6,
          name: "体育",
          count: 777
        },
        {
          id: 7,
          name: "体育",
          count: 777
        },
        {
          id: 8,
          name: "体育",
          count: 777
        },
        {
          id: 9,
          name: "体育",
          count: 777
        },
        {
          id: 10,
          name: "体育",
          count: 777
        },
        {
          id: 11,
          name: "体育",
          count: 777
        },
        {
          id: 12,
          name: "体育",
          count: 777
        }
      ]
    }
  }),
  async created() {
    const { totals, datas } = await categoryHttp.getAllKind();
    this.categories = {
      totals,
      datas
    };
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

      .door {
        width: 200px;
        height: 200px;
        box-shadow: 0 0 5px #333;
        background-size: 100% 100%;
        position: relative;
        perspective: 1000px;
        margin: 2vw;

        .door_inner {
          width: 100%;
          height: 100%;
          font-size: 25px;
          color: $green;
          @include flexCenter;
          background-image: linear-gradient(
            to right bottom,
            $my_blue,
            plum,
            skyblue,
            $my_pink
          );
        }

        &:hover {
          .doorplate {
            display: none;
          }
          .door_l {
            transform: rotateY(-120deg);
          }
          .door_r {
            transform: rotateY(120deg);
          }
        }

        @mixin door_config {
          width: 50%;
          height: 100%;
          background-color: #fdcd2c;
          position: absolute;
          top: 0;
          transition: all 0.5s;

          &::before {
            content: "";
            border: 1px solid #000000;
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            border-radius: 50%;
            transform: translateY(-50%);
          }
        }

        // 左门
        .door_l {
          @include door_config;
          left: 0;
          border-right: 1px solid #000000;
          transform-origin: left;

          &::before {
            right: 5px;
          }
        }

        // 右门
        .door_r {
          @include door_config;
          right: 0;
          border-left: 1px solid #000;
          transform-origin: right;

          &::before {
            left: 5px;
          }
        }

        // 门牌
        .doorplate {
          min-width: 120px;
          max-width: 180px;
          background-color: pink;
          position: absolute;
          left: 10%;
          top: 59%;
          text-align: center;
          padding: 5px 0 10px;
          transform: rotateZ(-10deg);
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
