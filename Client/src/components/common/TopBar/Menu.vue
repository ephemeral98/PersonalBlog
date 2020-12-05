<template>
  <div class="menu" @touchmove.prevent @mousewheel.prevent>
    <v-row style="height: 40vh">
      <MyCard style="box-shadow: none; padding: 0" />
    </v-row>
    <hr style="" class="mt-10 divider" />

    <v-row class="mt-5 flex-column">
      <v-col class="item mt-2 pl-2" v-for="nav in navList" :key="nav.name">
        <router-link
          @click.native="closeMenu"
          :to="{ name: nav.name }"
          :class="[nav.icon, 'iconfont']"
          >{{ nav.word }}</router-link
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MyCard from "../MyCard.vue";
export default {
  props: ["navList"],
  components: {
    MyCard
  },
  methods: {
    closeMenu() {
      this.$store.commit("domStore/showMenu", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  width: 60vw !important;
  height: 100vh;
  background-color: #f6f8fa;
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  padding: 1.2vh !important;
  z-index: $pop_level;

  .divider {
    width: 100%;
    border: dashed $gray 1.5px;
    border-left: none;
    border-right: none;
  }

  img {
    width: 70%;
    border-radius: 50%;
  }

  .item {
    width: 100vw;
    flex: 0 0 7vh;
    line-height: 7vh;
    font-size: 4vw;
    text-align: center;

    a {
      color: $my_blue;
    }
  }
}
</style>
