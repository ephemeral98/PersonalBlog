<template>
  <div class="vuetify_alert">
    <transition
      enter-active-class="animate__animated animate__zoomInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <v-alert
        color="green"
        dense
        elevation="8"
        outlined
        prominent
        text
        type="success"
        v-if="isShow"
        ><slot></slot
      ></v-alert>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["color", "elevation", "type"],
  data: () => ({
    isShow: false
  }),
  mounted() {
    this.isShow = true;
  },
  beforeDestroy() {
    this.isShow = false;
    console.log("hello", this.isShow);
  }
};
</script>

<style></style>
