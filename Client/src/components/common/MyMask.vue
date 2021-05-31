<template>
  <div class="mask" @touchmove.prevent @mousewheel.prevent></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("domStore", {
      isShowMask: "mask"
    })
  }
};
</script>

<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.507);
  position: fixed;
  top: 0;
  left: 0;
  z-index: $mask_level;
}
</style>
