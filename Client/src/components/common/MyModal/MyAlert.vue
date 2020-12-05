<template>
  <BasicModal :basicConfig="alertConfig" v-show="isShow" class="modal">
    <template #content>
      <div class="content">敬请期待</div>
    </template>
    <template #controlBtn>
      <button class="cancel_btn" @click="closeModal">Ok</button>
    </template>
  </BasicModal>
</template>

<script>
import BasicModal from "./BasicModal";
export default {
  components: {
    BasicModal
  },
  data: () => ({
    isShow: false,
    alertConfig: {
      msg: true
    }
  }),
  methods: {
    closeModal() {
      this.isShow = false;
    },
    showModal() {
      this.isShow = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.modal {
  @include modal_center;
}
</style>
