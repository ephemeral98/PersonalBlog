<template>
  <div
    class="voice_wrap"
    :style="{
      'background-image': `url(${globalConst.qiBaseURL}${activeImg})`
    }"
    @click.self="toggleVoice"
  >
    <div
      ref="ball"
      :class="['ball open_ball', { active_ball: activeMenu, inflat: isInFlat }]"
      @click="openMenu"
    >
      <div v-show="!isInFlat">More</div>
      <div class="voices" v-show="isInFlat">
        <img
          @click="changeVoice(v)"
          :class="['voice_item', { active_voice: v.isActive }]"
          v-for="v in voices"
          :src="globalConst.qiBaseURL + v.logo"
          :key="v.url"
          :alt="v.text"
          :title="v.text"
        />
      </div>
    </div>
    <div class="ball close_ball" v-show="isShowCloseBtn" @click="closeMenu">
      Close
    </div>
    <!-- 声音 -->
    <audio loop="true;" ref="sing">
      <source :src="singing" />
    </audio>
    <!-- 弹窗 -->
    <v-dialog v-model="isShowTips" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          友情提示：
        </v-card-title>
        <v-card-text class="alert_content">
          点击背景可以播放和暂停声音哦~
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isShowTips = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 状态 -->
    <transition
      enter-active-class="animate__animated animate__zoomInDown"
      leave-active-class="animate__animated animate__zoomOutDown"
    >
      <v-alert
        class="status_msg"
        color="green"
        dense
        elevation="8"
        prominent
        type="success"
        v-show="isShowAlert"
        >{{ singingText }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    beforeMusicStatus: "",
    activeImg: "/rain.jpg",
    isPlaying: false, // 是否正在播放
    activeMenu: false,
    isInFlat: false,
    isShowCloseBtn: false,
    isShowTips: false,
    isShowAlert: false,
    alertDuration: 2500, // alert停留的时间
    timer: null,
    singingText: "下雨天",
    singing:
      "https://sound-ks1.cdn.missevan.com/aod/202102/25/158b6c80b2ad9850f15b07eec35e8d7049151717.m4a",

    voices: [
      {
        id: 1,
        text: "下雨天",
        url:
          "https://sound-ks1.cdn.missevan.com/aod/202102/25/158b6c80b2ad9850f15b07eec35e8d7049151717.m4a",
        img: "/rain.jpg",
        logo: "/rainLogo.jpg",
        isActive: true
      },
      {
        id: 2,
        text: "下雪天",
        url:
          "https://sound-ks1.cdn.missevan.com/aod/202010/29/f72162c3e76558c07957095f215a8f51071922.m4a",
        img: "/snow.jpg",
        logo: "/snowLogo.jpg",
        isActive: false
      },
      {
        id: 3,
        text: "图书馆自习",
        url:
          "https://sound-ks1.cdn.missevan.com/aod/202009/02/eeeafeecb521ba6ec3682eac5a3b8bac155811.m4a",
        img: "/library.jpg",
        logo: "/libraryLogo.jpg",
        isActive: false
      },
      {
        id: 4,
        text: "还原考试现场",
        url:
          "https://sound-ks1.cdn.missevan.com/aod/202010/26/6d5e961adb6ee345d07e59fb7cbe7a69184823.m4a ",
        img: "/exam.jpg",
        logo: "/examLogo.jpg",
        isActive: false
      },
      {
        id: 5,
        text: "失眠神器",
        url:
          "https://sound-ks1.cdn.missevan.com/aod/202011/15/013e5614c97588ba9b3486432c951e85053952.m4a",
        img: "/sleep.jpg",
        logo: "/sleepLogo.jpg",
        isActive: false
      },
      {
        id: 6,
        text: "哈尔的移动城堡",
        url:
          "https://sound-ks1.cdn.missevan.com/aod/202008/14/f56908021165f0a7ce085465ef7b418d150127.m4a",
        img: "/hal.jpg",
        logo: "/halLogo.jpg",
        isActive: false
      }
    ]
  }),
  methods: {
    // 打开菜单
    openMenu() {
      console.log("hello, open...");
      // 中在展开菜单的时候，再次点击这里无效
      if (!this.isInFlat) {
        this.activeMenu = true;
        this.$refs.ball.addEventListener("transitionend", this.handleAnimate);
      }
    },
    // 关闭菜单
    closeMenu() {
      this.isInFlat = false;
      this.isShowCloseBtn = false;
      this.activeMenu = false;
    },
    // 处理打开菜单时候触发的动画
    handleAnimate() {
      console.log("用完了。。");
      // 用完之后，立马清除，等待下次再用
      this.$refs.ball.removeEventListener("transitionend", this.handleAnimate);

      this.isInFlat = true;
      this.isShowCloseBtn = true;
    },
    // 播放与停止
    toggleVoice() {
      if (this.isPlaying) {
        this.$refs.sing.pause();
        this.isPlaying = false;
      } else {
        console.log("play...");
        this.$refs.sing.play();
        this.isPlaying = true;
        this.isShowAlert = true;
        clearInterval(this.timer);
        this.timer = setTimeout(() => {
          this.isShowAlert = false;
          clearInterval(this.timer);
        }, this.alertDuration);
      }
    },
    // 切换声音
    changeVoice(v) {
      this.$refs.sing.pause();
      this.singing = v.url; // 切换音频路径
      this.$refs.sing.load(); // 重新加载音频，达到切换的效果
      this.$refs.sing.play(); // 再播放
      this.activeImg = v.img;
      this.singingText = v.text; // 正在播放的声音名字
      this.isShowAlert = true;
      this.isPlaying = true;
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        this.isShowAlert = false;
        clearInterval(this.timer);
      }, this.alertDuration);

      this.voices.forEach(item => {
        item.isActive = false;
        if (v.id === item.id) {
          item.isActive = true;
        }
      });
    }
  },
  created() {
    // 获取一下进来时的背景音乐状态
    this.beforeMusicStatus = this.$store.state.domStore.isPlayMusic;

    // 关掉背景音乐
    this.$store.commit("domStore/setIsPlayMusic", false);
  },
  destroyed() {
    // 离开的时候可能开启背景音乐
    this.$store.commit("domStore/setIsPlayMusic", this.beforeMusicStatus);
  },
  mounted() {
    this.isShowTips = true;
  }
};
</script>

<style lang="scss" scoped>
.voice_wrap {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.ball {
  width: 100px;
  height: 100px;
  backdrop-filter: blur(5px);
  position: fixed;
  left: 93%;
  top: 90%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 1s;
  @include flexCenter;
}

// 打开小球，有显示内容
.open_ball {
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 20px #fff;
  padding: 3vw;
  box-sizing: border-box;

  .voices {
    width: 100%;
    @include flexCenter;
    flex-wrap: wrap;

    .voice_item {
      width: 100px;
      height: 100px;
      border-radius: 50%;

      margin: 20px 50px;
      cursor: pointer;
    }

    .active_voice {
      box-shadow: 0 0 20px #333;
    }
  }
}

// 关闭小球
.close_ball {
  background-color: rgba(51, 51, 51, 0.714);
  box-shadow: 0 0 20px 0 #333;
  z-index: 999;
  color: #fff;
}

// 小球在屏幕居中状态
.active_ball {
  @include center(fixed);
}

// 延伸状态（打开状态）
.inflat {
  width: 100%;
  height: 100%;
  border-radius: 0;
  cursor: auto !important;
}

.alert_content {
  font-size: 25px;
  @include flexCenter;
  margin-top: 10px;
  line-height: 1.5;
}

.status_msg {
  @include modal_center(300px, 60px);
  text-align: center;
}

@media screen and (max-width: $phone_computer) {
  .voice_wrap {
    background-size: cover !important;
    background-position: center !important;
  }

  .ball {
    left: 83%;
    top: 92%;
  }

  // 小球在屏幕居中状态
  .active_ball {
    @include center(fixed);
  }

  .voices {
    .voice_item {
      margin: 20px !important;
    }
  }
}
</style>
