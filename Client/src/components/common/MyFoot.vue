<template>
  <div class="my_foot mt-10">
    <div>Created in 2020 By Barry</div>
    <div>只有越来越强大，才能越来越童话</div>
    <a class="record" href="https://beian.miit.gov.cn" target="_blank"
      >粤ICP备2020139302号</a
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.my_foot {
  width: 100vw;
  // height: 14vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: $gray;
  padding: 1vh 1vh 0;
  position: relative;

  div,
  .record {
    color: #000;
    margin: 0.5vh 0 0;
  }
}
</style>
