<template>
  <v-container class="my_container mt-15">
    <v-layout>
      <v-flex xs12 sm9_5 md9_5 lg9_5 xl9_5 mb-7 cla>
        <!-- 主要内容放在这 -->
        <slot></slot>
      </v-flex>
      <v-flex class="d-sm-flex flex-column tips" xs12 sm2_5 md2_5 lg2_5 xl2_5>
        <MyCard class="my_card" />
        <div class="declare mt-5">
          <div class="my_title iconfont">公告&#xec40;</div>
          <div class="content">
            如果你来访，我不在，请和我门外的花坐一会儿。它们很温暖，我注视它们很多很多日子了。它们开得不茂盛，想起来什么说什么。
          </div>
        </div>
      </v-flex>
    </v-layout>

    <ToolsBar></ToolsBar>
  </v-container>
</template>

<script>
// @ is an alias to /src
import MyCard from "@/components/common/MyCard.vue";
import ToolsBar from "@/components/common/ToolsBar";

export default {
  components: {
    MyCard,
    ToolsBar
  },
  data: () => ({
    page: 2
  })
};
</script>

<style lang="scss" scoped>
.my_container {
  .tips {
    align-self: start;
    margin-left: 20px;
    width: 100%;

    .declare {
      width: 100%;
      box-shadow: 0 0 20px gray;
      padding: 5px 20px;

      .my_title {
        color: $my_pink;
        font-size: 1.3rem;
      }
    }

    .my_card {
      @extend .declare;
    }
  }
}

// 电脑屏
@media screen and (min-width: $phone_computer) {
  .tips {
    position: -webkit-sticky;
    position: sticky;
    top: $top_bar_height;
  }
}

// 手机屏
@media screen and (max-width: $phone_computer) {
  .tips {
    margin: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .layout {
    flex-direction: column;
  }
}
</style>
