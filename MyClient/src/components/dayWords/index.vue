<template>
  <div class="day_words">
    <b-alert
      class="status_msg"
      :show="alertConfig.dismissCountDown"
      dismissible
      :variant="alertConfig.color"
      @dismissed="alertConfig.dismissCountDown = 0"
    >
      {{ alertConfig.word }}
    </b-alert>
    <div class="inp">
      <h3>write words：</h3>
      <input type="text" v-model="inpContent" />
      <button class="sub iconfont" @click="sub">添加 &#xe603;</button>
      <button class="del_many iconfont" @click="delManyWords">
        批量删除 &#xe651;
      </button>
    </div>
    <div class="content">
      <li class="d-flex mt-2" v-for="word in words" :key="word.id">
        <input type="checkbox" :value="word.id" v-model="pickedWords" />
        <div class="words">
          {{ word.content }}
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import * as dayWordsHttp from "@/service/DayWordsService.js";
import * as handleAlert from "@/utils/handleAlertStatus.js";
export default {
  data: () => ({
    pickedWords: [],
    inpContent: "",
    words: null,
    alertConfig: {
      dismissCountDown: 0,
      word: "无",
      color: "success"
    }
  }),
  methods: {
    async delManyWords() {
      if (this.pickedWords.length === 0) {
        handleAlert.handleEmpty(this, "请选择要删除的句子");
      } else {
        const resp = await dayWordsHttp.delManyWords(this.pickedWords);
        handleAlert.handleRes(resp, this);
      }
    },
    async sub() {
      if (!this.inpContent) {
        handleAlert.handleEmpty(this);
      } else {
        const resp = await dayWordsHttp.addWords(this.inpContent);
        handleAlert.handleRes(resp, this);
      }
    }
  },
  async created() {
    const resp = await dayWordsHttp.getAllWords();
    this.words = resp;
  }
};
</script>
<style lang="scss" scoped>
.day_words {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  width: 80%;

  .inp {
    padding: 10px;
    border-bottom: dashed 1.5px $gray;

    input {
      margin-top: 10px;
      border: none;
      padding: 0 10px;
      width: 100%;
      height: 60px;
      border-radius: 20px;
      background-color: lighten($my_blue, 20%);
      font-size: 18px;
    }

    .sub {
      @include normal_btn;
      margin: 10px 10px 0;
    }

    .del_many {
      @include normal_btn;
      margin: 10px 10px 0;
    }
  }

  .content {
    width: 100%;
    height: 60%;
    overflow: auto;

    > li {
      margin: 0 auto;
      width: 99%;
      height: 60px;
      line-height: 50px;
      align-items: center;

      > input {
        flex: 0 0 10px;
      }

      .words {
        background-color: lighten($gray, 12%);
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 10px;
        flex: 1 0 0;
        margin: 0 15px;
        border-radius: 10px;
      }
    }
  }
}
</style>
