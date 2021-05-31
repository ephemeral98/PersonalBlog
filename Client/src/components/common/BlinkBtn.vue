<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes btnBg {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: right;
  }
}

.btn {
  width: 130px;
  height: 60px;
  @include center(absolute);
  cursor: pointer;
  border-radius: 30px;
  border: none;
  outline: none;
  transition: 1s ease-out;

  background-image: linear-gradient(
    to right,
    #fb7299bb,
    #9ed9ec,
    rgb(182, 160, 221)
  );
  background-size: 400%;
  color: #fff;
  font-size: 25px;

  animation: btnBg 5s ease-in-out infinite alternate;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -5px;
    top: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background-image: linear-gradient(
      to right,
      #fb7299bb,
      #9ed9ec,
      rgb(182, 160, 221)
    );
    border-radius: 30px;
    opacity: 0;
    transition: all 0.5s;
  }

  &:hover::before {
    filter: blur(20px);
    opacity: 1;
  }
  &:hover {
    width: 190px;
  }
}
</style>
