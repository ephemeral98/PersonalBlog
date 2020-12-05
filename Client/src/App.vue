<template>
  <v-app>
    <router-view @touchmove.prevent @mousewheel.prevent />
  </v-app>
</template>

<script>
import "@/assets/common/index.scss";
export default {
  name: "App"
};
</script>
