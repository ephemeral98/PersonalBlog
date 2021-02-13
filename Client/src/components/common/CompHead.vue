<template>
  <div class="comp_head">
    <div class="comp_head_center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.comp_head {
  width: 100vw;
  height: 56vh;
  background-image: url("#{$qiBaseURL}/loginBg.jpg");
  background-size: cover;
  background-position: 38% 35%;
  position: relative;

  .comp_head_center {
    @include center(absolute);
    font-size: 6.5vh;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
}
</style>
