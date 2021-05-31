<template>
  <div class="article_card_list">
    <CompHead>{{ kind }}</CompHead>
    <v-container style="padding-bottom: 25vh">
      <v-row class="cards">
        <v-flex v-for="n in articles" :key="n.id" sm4 xs6 class="mt-5">
          <ArticleCard class="card" :article="n" />
        </v-flex>
      </v-row>
      <button class="more" @click="getMore" v-if="articles.length < totals">
        查看更多文章
      </button>
      <div class="nomore" v-else>没有更多了...</div>
    </v-container>
    <ToolsBar></ToolsBar>
    <MyFoot />
  </div>
</template>

<script>
import CompHead from "@/components/common/CompHead.vue";
import ArticleCard from "./ArticleCard.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import ToolsBar from "@/components/common/ToolsBar.vue";
import * as articleHttp from "@/service/ArticleService.js";
export default {
  components: {
    CompHead,
    MyFoot,
    ArticleCard,
    ToolsBar
  },
  data: () => ({
    start: 1,
    articles: [],
    totals: 0
  }),
  computed: {
    kind() {
      return this.$route.query.CategoryName;
    }
  },
  methods: {
    async getArticles() {
      const resp = await articleHttp.getArtByKindSection(
        this.$route.params.CategoryId,
        this.start,
        4
      );
      this.articles = resp.artList;
      this.totals = resp.count;
      this.start++;
    },
    getMore() {
      console.log("hello, more");
      this.getArticles();
    }
  },
  created() {
    this.getArticles();
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
  position: relative;
  @include borderShadow;
}

.more {
  @include more(150px);
}

.nomore {
  @include nomore;
}
</style>
