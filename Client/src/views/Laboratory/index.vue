<template>
  <!-- 实验室页面 -->
  <div class="laboratory_wrap">
    <header class="welcome_head">
      <CentralWord welcomeWord="实验室" />
      <EnterMain></EnterMain>
    </header>
    <MyContainer>
      <div class=" laboratory_content mt-5 justify-center flex">
        <li v-for="kind in labKind" :key="kind.name" class="door">
          <router-link
            :to="{
              name: kind.name
            }"
          >
            <div class="door_inner">
              {{ kind.text }}
            </div>
            <div class="door_l"></div>
            <div class="door_r"></div>
            <div class="doorplate">
              {{ kind.text }}
            </div>
          </router-link>
        </li>
      </div>
    </MyContainer>
  </div>
</template>

<script>
import MyContainer from "@/components/layouts/MyContainer";
export default {
  name: "laboratory",
  components: {
    MyContainer
  },
  data: () => ({
    labKind: [
      {
        name: "fate",
        text: "告白信"
      },
      {
        name: "game",
        text: "小游戏"
      },
      {
        name: "voice",
        text: "戴上耳机进来"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.laboratory_wrap {
  overflow: hidden;
}

.laboratory_content {
  padding: 3vw 0;
  @include borderShadow;
  @include flexCenter;
  flex-wrap: wrap;
  // overflow: hidden;

  &:hover {
    transform: translateY(7px);
  }

  .door {
    width: 26vw;
    height: 26vw;

    box-shadow: 0 0 15px #333;
    background-size: 100% 100%;
    position: relative;
    perspective: 1000px;
    margin: 3vw 3vw 0;
    border-radius: 10px;

    .door_inner {
      border-radius: 10px;
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
        box-shadow: 0 0 10px #000;
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
      transform-origin: left;
      border-right: 1px solid darken(gold, 10%);
      box-shadow: 0 0 20px gold;
      border-radius: 10px 0 0 10px;

      &::before {
        right: 5px;
      }
    }

    // 右门
    .door_r {
      @include door_config;
      border-radius: 0 10px 10px 0;

      right: 0;
      transform-origin: right;
      border-left: 1px solid darken(gold, 10%);
      box-shadow: 0 0 20px gold;

      &::before {
        left: 5px;
      }
    }

    // 门牌
    .doorplate {
      min-width: 120px;
      max-width: 180px;
      background-color: rgba(255, 0, 0, 0.224);
      position: absolute;
      left: 10%;
      top: 59%;
      text-align: center;
      padding: 5px 0 10px;
      transform: rotateZ(-10deg);
    }
  }
}

@media screen and (max-width: $i_md) {
  .laboratory_content {
    flex-direction: column;

    .door {
      width: 90%;
      height: 85vw;
      margin: 7vw 0;
    }
  }
}
</style>
