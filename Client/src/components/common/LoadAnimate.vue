<template>
  <div class="load_animate">
    <div class="words" ref="words">
      <p>加载资源 ...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    words: null,
    wordArr: [
      "加载资源【张无忌的九阳神功】蓄力完成!",
      "加载资源【东方不败的葵花宝典】蓄力完成!",
      "加载资源【萧峰的降龙十八掌】蓄力完成!",
      "加载资源【郭靖的左右降龙十八掌】蓄力完成!",
      "加载资源【杨过的黯然销魂掌】蓄力完成!",
      "加载资源【欧阳锋的蛤蟆功】蓄力完成!",
      "加载资源【黄药师的弹指神通】蓄力完成!",
      "加载资源【小龙女的玉女素心剑法】蓄力完成!",
      "加载资源【洪七公的打狗棒法】蓄力完成!",
      "加载资源【一灯大师的一阳指】蓄力完成!",
      "加载资源【周伯通的空明拳】蓄力完成!",
      "加载资源【虚竹的天山折梅手】蓄力完成!",
      "加载资源【段誉的六脉神剑】蓄力完成!",
      "加载资源【慕容复的斗转星移】蓄力完成!",
      "加载资源【杨逍的乾坤大挪移】蓄力完成!",
      "加载资源【谢逊的狮吼功】蓄力完成!",
      "加载资源【令狐冲的独孤九剑】蓄力完成!",
      "加载资源【鸠摩智的小无相功】蓄力完成!",
      "加载资源【金轮法王的龙象般若功】蓄力完成!",
      "加载资源【岳不群的辟邪剑法】蓄力完成!",
      "加载资源【周芷若的九阴白骨爪】蓄力完成!",
      "加载资源【黄蓉的玉箫剑法】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载资源【张三丰的太极剑】蓄力完成!",
      "加载完成!"
    ],
    timer: null,
    speedTime: 885, // 加速时间
    interval: 900, // 间隔时间
    count: 0
  }),
  computed: {
    disWidth() {
      return document.body.clientWidth || document.documentElement.clientWidth;
    },
    disHeight() {
      return (
        document.body.clientHeight || document.documentElement.clientHeight
      );
    },

    ...mapState("domStore", ["isLoadingWordsFast"])
  },
  methods: {
    /**
     * @param {Array} wordArr 文字
     * @param {DOM} wordDom 操作的元素
     * @param {Number} interval 间隔速度
     * @param {Number} speedTime 加速度
     */
    loadAnimate(wordArr, wordDom, interval, speedTime) {
      this.timer = setTimeout(() => {
        clearInterval(this.timer); // 每次进来都先清除原来的计时器，后面再造一个新的计时器
        interval = this.interval; // 先初始化一下, 再加速
        if (this.isLoadingWordsFast) {
          interval -= speedTime;
        }
        const wordsHeight = parseFloat(getComputedStyle(wordDom).height);
        if (wordsHeight >= this.disHeight) {
          // 满屏了...，清空元素
          wordDom.innerHTML = "";
        }
        const p = document.createElement("p");
        p.innerText = wordArr[this.count];
        wordDom.appendChild(p);
        this.count++;
        if (this.count < wordArr.length) {
          this.timer = setTimeout(
            this.loadAnimate,
            interval,
            wordArr,
            wordDom,
            interval,
            speedTime
          );
        }

        // 已全部显示，隐藏组件
        if (wordArr.length <= this.count) {
          this.$store.commit("domStore/setIsLoadingWords", false);
        }
      }, interval);
    }
  },
  mounted() {
    this.words = this.$refs.words;
    this.loadAnimate(this.wordArr, this.words, this.interval, this.speedTime);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.$store.commit("domStore/setIsLoadingWordsFast", false);
    this.$store.commit("domStore/setIsLoadingWords", false);
  }
};
</script>

<style lang="scss">
.load_animate {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(203, 220, 226);
  padding: 1vw;
  z-index: $top_level;
  .words {
    position: absolute;
    width: 100%;

    p {
      margin: 0.6vw;
      color: #929292 !important;
    }
  }
}

// 一般全面手机屏
@media screen and (min-width: 321px) and (max-width: 400px) {
  .words p {
    font-size: 15px;
  }
}

// IPhone5屏幕
@media screen and (max-width: 320px) {
  .words p {
    font-size: 12px;
  }
}
</style>
