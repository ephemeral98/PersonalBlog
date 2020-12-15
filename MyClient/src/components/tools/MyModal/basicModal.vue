<template>
  <div class="basic__modal">
    <div class="mask" @click="$emit('close-modal')"></div>
    <div class="info" :style="this.modalConfig.modalStyle">
      <div class="title">{{ modalConfig.title }}</div>
      <textarea
        name=""
        class="content"
        cols="30"
        rows="10"
        v-model="mainTxt"
        v-if="this.modalConfig.text || false"
      ></textarea>
      <div class="content" v-else>{{ modalConfig.content }}</div>
      <div class="control">
        <button
          class="confirm__btn"
          @click="$emit('confirm-modal', mainTxt)"
          v-if="this.modalConfig.confirmBtn"
        >
          {{ this.modalConfig.confirmBtn || "确定发布" }}
        </button>
        <button class="cancel__btn" @click="$emit('close-modal')">
          {{ this.modalConfig.cancelBtn || "取消" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalConfig: {
      type: Object
    }
  },
  data() {
    return {
      mainTxt: this.modalConfig.content || "无"
    };
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
    // height: 400px;
    max-width: 90%;
    background-color: snow;
    @include center(fixed);
    z-index: 10002;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 lightblue;
    display: flex;
    flex-direction: column;

    .title {
      flex: 0 0 50px;
      line-height: 50px;
      font-size: 20px;
      // background-color: red;
      border-radius: 8px;
      text-align: center !important;
    }

    .content {
      flex: 1 0 0;
      padding: 15px;
      font-size: 20px;
      border: solid 1.2px rgb(206, 206, 206);
      text-align: left;
    }

    .control {
      // background-color: red;
      flex: 0 0 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .confirm__btn,
      .cancel__btn {
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
