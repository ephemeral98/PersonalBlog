<template>
  <div class="basic__modal">
    <div class="mask" @click="$emit('close-modal')"></div>
    <div class="info" :style="basicConfig && basicConfig.modalStyle">
      <div class="title">
        <slot name="title">
          <div class="title">来自管理员的友情提示</div>
        </slot>
      </div>
      <div :class="basicConfig.msg ? 'contentMsg' : 'content'">
        <slot name="content">无</slot>
      </div>
      <div class="footer">
        <slot name="controlBtn">
          <button class="confirm_btn" @click="$emit('confirm-modal', mainTxt)">
            确认
          </button>
          <button class="cancel_btn" @click="$emit('close-modal')">取消</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    basicConfig: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/common/center.scss";
.basic__modal {
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    @include center(fixed);
    z-index: 10001; // 比编辑器层级多1
  }
  .info {
    background-color: #fff;
    @include center(fixed);
    z-index: 10002;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 lightblue;

    .title {
      min-width: 200px;
      line-height: 50px;
      font-size: 20px;
      border-radius: 8px;
      text-align: center;
    }

    .content {
      min-width: 240px;
      min-height: 50px;
      padding: 0 5px;
      font-size: 15px;
      line-height: 50px;
    }

    .contentMsg {
      @extend .content;
      border: solid 1.5px rgba(172, 172, 172, 0.377);
      border-left: none;
      border-right: none;
      // height: 80px;
      // line-height: 80px;
      font-size: 23px;
    }

    .footer {
      min-width: 200px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-left: none;
      border-right: none;
      margin: 10px 0 3px;
      // background-color: gold;

      .confirm_btn,
      .cancel_btn {
        height: 40px;
        align-self: center;
        padding: 20px;
        font-size: 20px;
        line-height: 0;
        background-color: lightblue;
        border-radius: 8px;
        transition: all 1s;

        &:hover {
          background-color: pink;
        }
      }
    }
  }
}
</style>
