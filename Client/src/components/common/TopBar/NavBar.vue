<template>
  <v-col class="nav_bar" @touchmove.prevent @mousewheel.prevent>
    <v-row justify="end" class="nav_list d-none d-sm-flex">
      <div class="nav" justify="start" ref="navItem">
        <router-link
          :to="{ name: nav.name }"
          v-for="nav in navList"
          :key="nav.name"
          cols="2"
          :class="[nav.icon, 'iconfont']"
          >{{ nav.word }}</router-link
        >
      </div>
    </v-row>

    <v-app-bar-nav-icon
      class="d-block d-sm-none menu"
      @click="showMenu"
    ></v-app-bar-nav-icon>
  </v-col>
</template>

<script>
export default {
  props: ["navList"],
  methods: {
    showMenu() {
      this.$store.commit("domStore/showMenu", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav_bar {
  padding: 0;

  .nav_list {
    width: 100%;
    height: 100%;
    margin-right: 1vw;

    .nav {
      height: 100%;
      position: relative;
      display: flex;
      margin-right: 1.5vw;

      a {
        width: 100px;
        height: 100%;
        z-index: 3;
        line-height: $top_bar_height;
        text-align: center;
        color: darken($my_blue, 20%);
        font-size: $font_size;

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          background-color: $my_pink;
          width: 0;
          height: 4px;
          transition: all 0.5s;
        }

        &.router-link-exact-active {
          border-bottom: solid $my_pink 4px;
          color: darken($my_pink, 10%);
        }
        &:hover {
          animation-name: shake;
          animation-duration: 0.5s;
          color: darken($my_pink, 10%);

          &::after {
            width: 100px;
          }
        }
      }
    }
  }

  .menu {
    width: 10vw;
    position: absolute;
    right: 2vw;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }
}
</style>
