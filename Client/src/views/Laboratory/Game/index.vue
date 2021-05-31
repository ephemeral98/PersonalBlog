<template>
  <div class="game_wrap">
    <!-- <router-link
      :class="['game_item', g.name]"
      v-for="g in games"
      :key="g.name"
      :to="{ name: g.name }"
    >
      <div v-if="g.isDone">{{ g.text }}</div>
      <div v-else @click="unFinish">{{ g.text }}</div>
    </router-link> -->

    <!-- 先暂时这么写 -->
    <router-link
      :style="{
        'background-image': `url(${globalConst.qiBaseURL}/snake.jpg)`
      }"
      :class="['game_item', 'gluttony']"
      :to="{ name: 'gluttony' }"
      >贪吃蛇</router-link
    >
    <div
      :class="['game_item', g.name]"
      v-for="g in games"
      :key="g.name"
      @click="unFinish"
      :style="{
        'background-image': `url(${globalConst.qiBaseURL}${g.url})`
      }"
    >
      <div v-if="!g.isDone">
        {{ g.text }}
      </div>
    </div>
    <!-- 弹窗 -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          友情提示：
        </v-card-title>

        <v-card-text class="alert_content">
          敬请期待！
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    games: [
      {
        name: "puzzle",
        text: "拼图小游戏",
        isDone: false,
        url: "/puzzle.jpg"
      },
      {
        name: "pushBox",
        text: "推箱子",
        isDone: false,
        url: "/pushBox.jpg"
      },
      {
        name: "pixelBird",
        text: "像素鸟",
        isDone: false,
        url: "/bird.jpg"
      },
      {
        name: "rubikCube",
        text: "魔方",
        isDone: false,
        url: "/magicBox.jpg"
      }
    ]
  }),

  methods: {
    unFinish() {
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.game_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: $top_bar_height;

  .game_item {
    flex: 1;
    width: 100%;
    height: 100%;
    // background-color: pink;
    @include flexCenter;
    font-size: 40px;
    color: #fff;
    background-size: cover;
    background-position: 48% 0;
    opacity: 0.4;

    &:hover {
      opacity: 1;
      box-shadow: 0 0 10px $my_blue;
    }
  }
}
.alert_content {
  font-size: 25px;
  margin-top: 10px;
}
@media screen and (max-width: $phone_computer) {
  .game_wrap {
    flex-direction: column;
  }
}
</style>
