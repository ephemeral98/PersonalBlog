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
<<<<<<< HEAD
  background-image: url("#{$qiBaseURL}/loginBg.jpg");
=======
  background-image: url(http://qm23h04eq.hn-bkt.clouddn.com/loginBg.jpg);
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
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
