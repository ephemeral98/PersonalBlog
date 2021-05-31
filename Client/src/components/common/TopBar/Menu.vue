<template>
  <div class="menu" @touchmove.prevent @mousewheel.prevent>
    <v-row style="max-height: 40vh; overflow:hidden; text-overflow: ellipsis;">
      <MyCard style="box-shadow: none; padding: 0" :menuCard="true" />
    </v-row>
    <hr style="" class=" divider" />

    <v-row class="flex-column" style="min-height:60vh">
      <v-col class="item pl-2" v-for="nav in navList" :key="nav.name">
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
  width: 200px !important;
  height: 100vh !important;
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
    padding: 0;
    width: 100vw;
    flex: 0 0 6vh;
    line-height: 6vh;
    font-size: 10vh;
    text-align: center;

    a {
      color: $my_blue;
    }
  }
}
</style>
