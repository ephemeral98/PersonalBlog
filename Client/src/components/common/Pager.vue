<template>
  <!-- 分页组件 -->
  <div class="pager_wrap">
    <span class="item home" @click="goTo(1)">
      <i class="iconfont">&#xe618;</i>
    </span>
    <span class="item prev" @click="prev">
      <i class="iconfont">&#xe6c8;</i>
    </span>
    <div class="page_list">
      <span
        :class="['item', { active: current === n }]"
        v-for="n in panelNumber"
        :key="n"
        @click="goTo(n)"
        >{{ n }}</span
      >
    </div>
    <span class="item next" @click="next">
      <i class="iconfont">&#xe6c8;</i>
    </span>
    <span class="item last" @click="goTo(totals)">
      <i class="iconfont">&#xe618;</i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // 当前页数
    current: {
      type: Number,
      default: 1
    },
    // 总页数
    totals: {
      type: Number
    },
    // 面板页数
    panel: {
      type: Number,
      default: 3
    }
  },
  data: () => ({}),
  computed: {
    // 面板中最小数字
    minPanel() {
      let min;
      if (this.panel === 1) {
        min = this.current - Math.floor(this.panel / 2);
      } else {
        min = this.current - Math.floor(this.panel / 2);
        // 为了面板数字 的数量到最后几页不减少
        if (min + this.panel > this.totals) {
          min = this.totals + 1 - this.panel;
        }
      }
      return min < 1 ? 1 : min;
    },
    // 面板中最大数字
    maxPanel() {
      const max = this.minPanel + this.panel - 1;
      return max > this.totals ? this.totals : max;
    },
    // 面板中显示的数字
    panelNumber() {
      const count = [];
      for (let i = this.minPanel; i <= this.maxPanel; i++) {
        count.push(i);
      }
      return count;
    }
  },
  methods: {
    goTo(e) {
      this.$emit("go-to", e);
    },
    prev() {
      console.log("上一页");
      if (this.current !== 1) {
        this.$emit("go-to", this.current - 1);
      }
    },
    next() {
      console.log("下一页");
      if (this.current !== this.totals) {
        this.$emit("go-to", this.current + 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  background-color: #fff;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  transition: 0.2s ease-in-out;
  margin: 0 5px;
  box-shadow: 0 0 10px $my_blue;

  &:hover {
    background-color: $my_blue;
    width: 80px;
    color: #fff;
  }

  @include flexCenter;
}

.pager_wrap {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
}

.page_list {
  display: flex;
}

.active {
  color: #fff;
  width: 80px;
  background-color: $my_blue;
}

.home,
.prev,
.next,
.last {
  width: 50px;
}

.prev,
.last {
  transform: rotateZ(180deg);
}
</style>
