<template>
  <div class="article_card_list">
    <TopBar />
    <CompHead>信息技术</CompHead>
    <v-container style="padding-bottom: 20vh">
      <v-row class="cards">
        <v-flex v-for="n in 8" :key="n" sm4 xs6 class="mt-5">
          <ArticleCard class="card" />
        </v-flex>
      </v-row>
    </v-container>
    <ToolsBar></ToolsBar>
    <MyFoot />
  </div>
</template>

<script>
import TopBar from "@/components/common/TopBar";
import CompHead from "@/components/common/CompHead.vue";
import ArticleCard from "./ArticleCard.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import ToolsBar from "@/components/common/ToolsBar.vue";
export default {
  components: {
    TopBar,
    CompHead,
    MyFoot,
    ArticleCard,
    ToolsBar
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
  @include borderShadow;
}
</style>
