<template>
  <div class="article_list">
    <header class="welcome_head">
      <CentralWord welcomeWord="看文章" />
      <EnterMain></EnterMain>
    </header>

    <MyContainer>
      <ArticleList :articles="articles" />
      <v-row justify="center" class="mt-5 mb-5">
        <v-pagination
          v-model="page"
          :length="pagesTotal"
          :total-visible="4"
        ></v-pagination>
      </v-row>
    </MyContainer>

    <MyFoot />
  </div>
</template>

<script>
// @ is an alias to /src
import EnterMain from "@/components/common/CentralWord/EnterMain.vue";
import CentralWord from "@/components/common/CentralWord";
import ArticleList from "@/components/ArticleList";
import MyFoot from "@/components/common/MyFoot.vue";
import MyContainer from "@/components/common/MyContainer.vue";
import * as artHttp from "@/service/ArticleService.js";

export default {
  // name: "ArticleList",
  components: {
    EnterMain,
    CentralWord,
    ArticleList,
    MyFoot,
    MyContainer
  },
  data: () => ({
    scrollOldY: 0,
    page: 1,
    pagesTotal: 0,
    articles: null,
    perPageSum: 7 // 每页的文章数
  }),

  async created() {
    const { count, artList } = await artHttp.getArtByPage(
      this.page,
      this.perPageSum
    );
    this.articles = artList;
    this.pagesTotal = Math.ceil(count / this.perPageSum); // 页数 = 总文章数 / 每页的文章数
  },
  watch: {
    page: {
      async handler() {
        const height = document.documentElement.clientHeight;
        window.scrollTo(0, height);
        const { artList } = await artHttp.getArtByPage(
          this.page,
          this.perPageSum
        );
        this.articles = artList;
      }
    }
  }
};
</script>
