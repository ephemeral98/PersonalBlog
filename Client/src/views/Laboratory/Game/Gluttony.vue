<template>
  <!-- 贪吃蛇 -->
  <section class="gluttony_wrap">
    <!-- 暂停时 才出来的控制面板 -->
    <!-- <div class="menu">
      <div class="start">开始</div>
    </div> -->
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <!-- 介绍 -->
      <div
        class="monologue"
        v-if="isFirstTime"
        ref="introduce"
        @click="isFirstTime = false"
      >
        {{ introduce }}
      </div>

      <!-- 通关时候 才出来的控制面板 -->
      <div class="menu" v-if="isShowMenu">
        <div class="pass_all" v-if="checkPoint > 2">恭喜，打爆机！</div>
        <div class="btn one_more_time" @click="oneMoreTime">
          {{ againText }}
        </div>
        <div class="btn next" @click="nextPoint" v-if="checkPoint < 3">
          下一关
        </div>
      </div>
    </transition>
    <!-- 控制按钮 -->
    <BlinkBtn class="game_handler" @click.native="gameHandler">{{
      isBegin ? "暂停" : "开始"
    }}</BlinkBtn>
    <BlinkBtn class="reset" @click.native="reSet">重新开始</BlinkBtn>
    <!-- 得分 -->
    <div class="score">{{ scoreObj.num }}</div>

    <div
      class="snake"
      ref="snake"
      :style="{
        width: mapWidth * divWidth + 'px',
        height: mapHeight * divHeight + 'px'
      }"
    ></div>

    <!-- 手机端的虚拟按键 -->
    <div class="control_btns" v-if="clientSize === 'mobile'">
      <div class="iconfont up_btn" @click="keyboardFunc('up')">&#xe6c8;</div>
      <div class="iconfont right_btn" @click="keyboardFunc('right')">
        &#xe6c8;
      </div>
      <div class="iconfont down_btn" @click="keyboardFunc('down')">
        &#xe6c8;
      </div>
      <div class="iconfont left_btn" @click="keyboardFunc('left')">
        &#xe6c8;
      </div>
      <div
        :class="['iconfont', 'speed_btn', { active: isSpeed }]"
        @click="speedFunc"
      >
        &#xe60d;
      </div>
    </div>
    <!-- 弹窗 -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          友情提示：
        </v-card-title>
        <v-card-text class="alert_content">
          {{ dialogContent }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import BlinkBtn from "@/components/common/BlinkBtn.vue";
export default {
  name: "gluttony",
  components: {
    BlinkBtn
  },
  data: () => ({
    divWidth: 10, // 蛇、食物的宽度
    divHeight: 10, // 蛇、食物的高度
    mapWidth: 30, // 地图的宽度
    mapHeight: 20, // 地图的高度
    snakeDirection: "right", // 蛇的默认走向
    isFirstTime: true, // 判断是不是首次进入
    snakeBody: [
      { x: 2, y: 0, flag: "" }, // 蛇头
      { x: 1, y: 0, flag: "" }, // 蛇身
      { x: 0, y: 0, flag: "" } // 蛇尾
    ],
    food: {
      x: null,
      y: null,
      flag: null
    },
    timer: null,
    isBegin: false, //是否已经开始了游戏
    speed: 230, // 蛇默认行走的速度
    isSpeed: false, //是否加速行驶
    dirChanging: false, // 方向改变中
    // 得分情况
    scoreObj: {
      num: 0, // 得分
      targetNum: 5 // 新手难度默认5分则胜出
    },
    againText: "再来一遍",
    checkPoint: 1, // 关卡
    isShowMenu: false, // 通关面板,
    isShowCelebrate: false, //胜利标语
    countDir: 0,
    firstChange: "",
    secChange: "",
    thirdChange: "",
    dialog: false,
    dialogContent: ""
  }),
  computed: {
    // 游戏介绍
    introduce() {
      const clientSize = this.$getClientSize();
      return clientSize === "mobile"
        ? `友情提示：按方向键旁边的加速键，可以获得直线加速哦。
        
          点击任意处进入...
        `
        : `友情提示：按w键，可以获得直线加速哦
        
          点击任意处进入...
        `;
    },
    // 吃到食物时候，蛇身的属性变化
    newStyle() {
      return (obj, i, color = "#008c8c") => {
        const { divWidth, divHeight } = this;

        let left, top;
        left = obj.x * divWidth + "px";
        top = obj.y * divHeight + "px";

        // let snakeHead = {};

        // pc端的蛇
        /* if (i === 0 && this.clientSize === "pc") {
          snakeHead = {
            backgroundSize: `100% 110%`,
            transform: snakeHeadRotate,
            backgroundImage: `url(${this.globalConst.qiBaseURL}/snakeHead.png)`,
            backgroundColor: ""
          };
        } */

        let food = {};
        // 食物
        if (i === -1) {
          food = {
            backgroundImage: `url(${this.globalConst.qiBaseURL}/apple.png)`,
            backgroundColor: "",
            backgroundSize: `100% 100%`
          };
        }

        return {
          width: divWidth + "px",
          height: divHeight + "px",
          borderRadius: "30%",
          backgroundColor: color,
          position: "absolute",
          left,
          top,
          // ...snakeHead,
          ...food
        };
      };
    },
    // pc mobile
    clientSize() {
      return this.$getClientSize();
    }
  },
  methods: {
    // 当前关卡再打一次
    oneMoreTime() {
      this.checkPoint = this.checkPoint < 3 ? this.checkPoint : 1;
      this.isShowMenu = false;
    },
    // 下一关
    nextPoint() {
      this.checkPoint++;
      this.isShowMenu = false;
    },

    // 显示蛇
    displaySnake() {
      this.snakeBody.forEach((snakeItem, i) => {
        // console.log(snakeItem.x);
        if (snakeItem.x !== null) {
          // 吃到食物的时候不创建
          const newBody = document.createElement("div");
          // 将节点保存到状态中，便于后面删除
          snakeItem.flag = newBody;

          /* if (i === 0) {
            // 蛇头
            newBody.classList.add("iconfont");
            newBody.innerHTML = "&#xedcb;";
          } */

          Object.assign(newBody.style, this.newStyle(snakeItem, i)); // 给新身体混入新属性
          this.$refs.snake?.appendChild(newBody);
        }
      });
    },

    /**
     * 创建食物
     * @param {*}
     * @returns
     */
    createFood() {
      console.log("创建食物.....");

      // 在创建食物之前，先获取蛇的坐标，因为食物不能在蛇的身上创建
      let x = this.$getRandom(0, this.mapWidth - 1);
      let y = this.$getRandom(0, this.mapHeight - 1);

      const _this = this;
      (function helper() {
        _this.snakeBody.forEach(snakeItem => {
          if (snakeItem.x === x && snakeItem.y === y) {
            x = _this.$getRandom(0, _this.mapWidth - 1);
            y = _this.$getRandom(0, _this.mapHeight - 1);
            helper();
          }
        });
      })();

      this.food = {
        x,
        y,
        flag: true
      };
    },
    // 显示食物
    displayFood() {
      // 清除食物,重新生成食物
      this.food.flag && this.$refs.snake.removeChild(this.food.flag);
      // 再创建食物
      this.createFood();
      const newFood = document.createElement("div");
      this.food.flag = newFood;

      console.log("food--->", this.food);

      Object.assign(newFood.style, this.newStyle(this.food, -1, "red"));

      this.$refs.snake?.appendChild(newFood);
    },

    // 蛇跑起来，
    run() {
      console.log("run...");
      // 后一个元素到前一个元素的位置
      for (let i = this.snakeBody.length - 1; i > 0; i--) {
        // 后一个元素到前一个元素的位置
        this.snakeBody[i].x = this.snakeBody[i - 1].x;
        this.snakeBody[i].y = this.snakeBody[i - 1].y;
      }
      // 根据方向处理蛇头
      switch (this.snakeDirection) {
        case "left":
          this.snakeBody[0].x -= 1;
          break;
        case "right":
          this.snakeBody[0].x += 1;
          break;
        case "up":
          this.snakeBody[0].y -= 1;
          break;
        case "down":
          this.snakeBody[0].y += 1;
          break;
      }

      // 判断出界
      if (
        this.snakeBody[0].x < 0 ||
        this.snakeBody[0].x >= this.mapWidth ||
        this.snakeBody[0].y < 0 ||
        this.snakeBody[0].y >= this.mapHeight
      ) {
        clearInterval(this.timer); // 清除定时器，
        this.dialog = true;
        this.dialogContent = "你嗝屁了...";
        this.reSet();
        return false; // 结束
      }
      const eatFoodRes = this.eatFood();
      if (eatFoodRes === false) {
        return false;
      }

      const eatSelfRes = this.eatSelf();
      if (eatSelfRes === false) {
        return false;
      }

      // 先删掉初始的蛇，在显示新蛇
      this.snakeBody.forEach(snakeItem => {
        if (snakeItem.flag != null) {
          // 当吃到食物时，flag是等于null，且不能删除
          this.$refs.snake.removeChild(snakeItem.flag);
        }
      });
      // 重新显示蛇
      this.displaySnake();
    },

    // 吃到食物
    eatFood() {
      // 判断蛇头吃到食物，xy坐标重合，
      if (
        this.snakeBody[0].x == this.food.x &&
        this.snakeBody[0].y == this.food.y
      ) {
        // 蛇加一节，因为根据最后节点定，下面display时，会自动赋值的
        this.snakeBody.push({ x: null, y: null, flag: null });

        // 得分
        this.scoreObj.num++;

        this.displayFood();

        // 胜利
        if (this.scoreObj.num >= this.scoreObj.targetNum) {
          // window.alert("你赢了");
          this.reSet();
          if (this.checkPoint > 2) {
            this.againText = "从头再来";
            this.isShowCelebrate = true;
          }
          this.isShowMenu = true;
        }
      }
    },

    // 吃到自己
    eatSelf() {
      // 吃到自己死亡，从第五个开始与头判断，因为前四个永远撞不到
      for (let i = 4; i < this.snakeBody.length; i++) {
        if (
          this.snakeBody[0].x == this.snakeBody[i].x &&
          this.snakeBody[0].y == this.snakeBody[i].y
        ) {
          clearInterval(this.timer); // 清除定时器，
          this.dialog = true;
          this.dialogContent = "狠起来，连自己都吃？";
          this.reSet();

          return false; // 结束
        }
      }
      // 先删掉初始的蛇，在显示新蛇
      for (let i = 0; i < this.snakeBody.length; i++) {
        if (this.snakeBody[i].flag != null) {
          // 当吃到食物时，flag是等于null，且不能删除
          this.$refs.snake.removeChild(this.snakeBody[i].flag);
        }
      }
      // 重新显示蛇
      this.displaySnake();
    },

    // 添加键盘事件
    keyboardFunc(btn) {
      function betrayalDir(dir1, dir2) {
        if (
          (dir1 === "up" && dir2 === "down") ||
          (dir1 === "down" && dir2 === "up") ||
          (dir1 === "left" && dir2 === "right") ||
          (dir1 === "right" && dir2 === "left")
        ) {
          return true;
        }
        return false;
      }

      const _this = this;
      /**
       * 处理方向
       * @param {String} nextDir
       */
      function handleDir(nextDir) {
        _this.firstChange = _this.secChange;
        _this.secChange = _this.thirdChange;
        _this.thirdChange = nextDir;

        // 处理玩家通过快速改变方向，导致吃到自己
        if (
          _this.dirChanging &&
          betrayalDir(_this.firstChange, _this.thirdChange)
        ) {
          const timer = setTimeout(() => {
            _this.snakeDirection = nextDir;
            _this.isSpeed && _this.speedFunc();
            clearTimeout(timer);
          }, _this.speed);
        } else {
          _this.snakeDirection = nextDir;
          _this.isSpeed && _this.speedFunc();
        }
        _this.dirChanging = true;
      }

      // 移动端
      if (btn === "up" && this.snakeDirection !== "down") {
        // 不允许返回，向上的时候不能向下
        handleDir(btn);
        this.snakeHeadRotate = `translateY(3px) rotate(-180deg)`;
        return;
      }
      if (btn === "right" && this.snakeDirection !== "left") {
        handleDir(btn);
        this.snakeHeadRotate = `translateY(3px) rotate(-90deg)`;
        return;
      }
      if (btn === "down" && this.snakeDirection !== "up") {
        handleDir(btn);
        this.snakeHeadRotate = `translateY(3px) rotate(0deg)`;
        return;
      }
      if (btn === "left" && this.snakeDirection !== "right") {
        handleDir(btn);
        this.snakeHeadRotate = `translateY(3px) rotate(90deg)`;
        return;
      }

      // PC端
      document.body.onkeydown = e => {
        const ev = e || window.event;
        switch (ev.code) {
          case "ArrowUp":
            if (this.snakeDirection !== "down") {
              handleDir("up");
              this.snakeHeadRotate = `translateY(3px) rotate(-180deg)`;
            }
            this.dirChanging = true;
            break;
          case "ArrowDown":
            if (this.snakeDirection !== "up") {
              handleDir("down");
              this.snakeHeadRotate = `translateY(3px) rotate(0deg)`;
            }
            this.dirChanging = true;
            break;
          case "ArrowLeft":
            if (this.snakeDirection !== "right") {
              handleDir("left");
              this.snakeHeadRotate = `translateY(3px) rotate(90deg)`;
            }
            this.dirChanging = true;
            break;
          case "ArrowRight":
            if (this.snakeDirection !== "left") {
              handleDir("right");
              this.snakeHeadRotate = `translateY(3px) rotate(-90deg)`;
            }
            this.dirChanging = true;
            break;
          case "KeyW":
            this.speedFunc();
            break;
        }
      };
    },

    // 重来
    reSet() {
      this.isBegin = false;
      clearInterval(this.timer);
      this.isSpeed = false;
      // 删除旧的
      for (let i = 0; i < this.snakeBody.length; i++) {
        if (this.snakeBody[i].flag !== null) {
          // 如果刚吃完就死掉，会加一个值为null的
          this.$refs.snake.removeChild(this.snakeBody[i].flag);
        }
      }
      this.snakeBody = [
        // 回到初始状态，
        { x: 2, y: 0, flag: "" },
        { x: 1, y: 0, flag: "" },
        { x: 0, y: 0, flag: "" }
      ];
      this.direction = "right";
      this.displaySnake(); // 显示初始状态

      this.snakeDirection = "right";
      this.scoreObj.num = 0;
    },
    // 开始、暂停 游戏
    gameHandler() {
      // 如果已经开始了游戏，要做的是暂停
      clearInterval(this.timer);
      if (!this.isBegin) {
        // 如果不是开始，则开始吧
        this.timer = setInterval(() => {
          this.run();
          this.dirChanging = false;
        }, this.speed);
      }
      this.isBegin = !this.isBegin;
    },
    /**
     * 加速
     */
    speedFunc() {
      console.log("加速...");
      // 只有开始了游戏，才能加速
      if (this.isBegin) {
        this.isSpeed = !this.isSpeed;
        const { speed, isSpeed } = this;
        const tempSpeed = isSpeed ? speed - speed * 0.5 : speed;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.run();
        }, tempSpeed);
      }
    }
  },

  watch: {
    // 关卡设置
    checkPoint: {
      handler(newPoint) {
        // 关卡
        if (this.clientSize === "mobile") {
          switch (newPoint) {
            case 1:
              this.mapHeight = 20;
              this.mapWidth = 30;
              this.speed = 250;
              break;
            case 2:
              this.mapHeight = 30;
              this.mapWidth = 30;
              this.speed = 120;
              break;
            default:
              this.mapHeight = 40;
              this.mapWidth = 30;
              this.speed = 66;
              break;
          }
        } else {
          switch (newPoint) {
            case 1:
              this.mapHeight = 20;
              this.mapWidth = 30;
              this.speed = 100;
              break;
            case 2:
              this.mapHeight = 20;
              this.mapWidth = 50;
              this.speed = 40;
              break;
            default:
              this.mapHeight = 20;
              this.mapWidth = 50;
              this.speed = 20;
              break;
          }
        }

        this.food.flag && this.displayFood();
      },
      immediate: true
    }
  },

  created() {
    if (this.clientSize === "mobile") {
      this.divWidth = 10;
      this.divHeight = 10;
    } else {
      this.divWidth = 20;
      this.divHeight = 20;
    }
  },

  mounted() {
    this.displaySnake();
    this.displayFood();
    this.keyboardFunc();
    this.isFirstTime &&
      this.$typing(
        this.$refs.introduce,
        this.introduce,
        false,
        null,
        200,
        null,
        false
        // this.introduceFinish
      );
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="scss" scoped>
.gluttony_wrap {
  width: 100vw;
  height: 100vh;
  padding: 10px;

  .game_handler {
    width: 120px !important;
    height: 50px !important;
    transform: none;
    font-size: 20px;
    left: 5%;
    top: 10%;
  }

  .reset {
    @extend .game_handler;
    left: auto;
    right: 5%;
  }

  // 得分
  .score {
    position: absolute;
    @include center(fixed);
    transform: none;
    top: 10%;
    font-size: 45px;
    color: darken(#c8e6c6, 40%);
  }

  // 手机端的虚拟按键
  .control_btns {
    width: 100%;
    height: 170px;
    position: absolute;
    left: 0;
    bottom: 0;
    // background-color: pink;

    > [class*="_btn"] {
      width: 60px;
      height: 60px;
      // background-color: #00c8c8;
      box-shadow: 0 0 10px rgb(191, 191, 191);
      position: absolute;
      border-radius: 50%;
      @include flexCenter;
      font-size: 40px !important;
    }

    .up_btn {
      top: 0px;
      left: 85px;
      transform: rotate(-90deg);
    }

    .right_btn {
      top: 50px;
      left: 150px;
    }

    .down_btn {
      bottom: 10px;
      left: 85px;
      transform: rotate(90deg);
    }

    .left_btn {
      top: 50px;
      left: 10px;
      transform: rotate(180deg);
    }

    .speed_btn {
      width: 100px;
      height: 100px;
      right: 10px;
      top: 40px;
      padding-left: 32px;
      box-sizing: border-box;
    }

    .active {
      color: red;
      box-shadow: 0 0 10px 0 red;
    }
  }

  // 游戏
  .snake {
    // background-color: lightBlue;
    box-shadow: 0 0 20px 0 darken(#c8e6c6, 20%);
    @include center(absolute);
    // border: solid 5px;
    // border-image: url("http://gzqsoul.icu/flowerBorder.png") 43 26 round;

    .snake_icon {
      // @include flexCenter;
      color: hotpink !important;
      background-color: blue !important;

      /* &.snake_head {
    color: green;
  } */
    }
  }

  // 通关面板
  .menu {
    @include mask;
    @include flexCenter;
    flex-direction: column;

    > div {
      height: 60px;
      @include flexCenter;
    }

    > .btn {
      width: 100px;
      box-shadow: 0 0 10px 0 skyblue;
      color: #fff;
      margin-top: 10px;
      cursor: pointer;
    }

    .pass_all {
      top: 20%;
      height: auto;
      font-size: 5vw;
      text-align: center;
      @include txtGradient($my_blue, $my_pink, $green, yellow);
    }
  }
}

.monologue {
  align-items: center;
  padding: 10px;
}

.alert_content {
  font-size: 25px;
  @include flexCenter;
  margin-top: 10px;
}

@media screen and (max-width: $phone_computer) {
  .pass_all {
    font-size: 9vw !important;
  }

  .score {
    font-size: 30px !important;
  }
}
</style>
