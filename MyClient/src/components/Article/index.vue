<template>
  <div class="article">
    <Modal
      v-if="isShowModal"
      :toFailModal="toFailModal"
      :toDelModal="toDelModal"
    />

    <header>
      <div class="title">{{ categoryName }}</div>
      <button class="del iconfont" @click="delArts">批量删除 &#xe651;</button>
    </header>
    <div class="main">
      <label :for="article.id" v-for="article in articles" :key="article.id">
        <input
          type="checkbox"
          :id="article.id"
          :value="article"
          v-model="pickedArt"
        />
        <span>{{ article.title }}</span>
        <router-link
          class="update__art iconfont"
          :to="{
            name: 'updateArticle',
            params: { id: article.id }
          }"
        >
          &#xe759;
        </router-link>
      </label>
    </div>
  </div>
</template>

<script>
import * as articlesHttp from "../../service/ArticleService.js";
import Modal from "./Modal.vue";
// import { mapState } from "vuex";
export default {
  components: {
    Modal
  },
  /* beforeCreate() {
    const { kindName } = this.$route.params;
    if (kindName) {
      localStorage.setItem("pickKind", kindName);
    }
  }, */
  async created() {
    const id = this.$route.params.id;
    // 发送请求 获取该分类的文章
    const res = await articlesHttp.findAllArticles({
      id
    });
    this.categoryName = this.$route.query.kindName;
    this.articles = res;
  },

  data() {
    return {
      isShowModal: false,
      categoryName: "暂无分类名字",
      articles: null,
      pickedArt: [],

      toFailModal: {},
      toDelModal: {}
    };
  },
  methods: {
    delArts() {
      this.isShowModal = true;
      if (this.pickedArt.length === 0) {
        this.toFailModal = {
          content: "请选择要删除的文章",
          isShow: true
        };
      } else {
        this.toDelModal = {
          data: this.pickedArt,
          isShow: true
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/common/center.scss";

.article {
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  //   background-color: red;

  header {
    width: 100%;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.651);
    position: fixed;
    display: flex;

    .title {
      width: 150px;
      height: 100%;
      //   background-color: gold;
      font-size: 25px;
      @include flexCenter;
      margin-right: 100px;
      border-radius: 8px;
      border-bottom: solid 3px gold;
    }

    .del {
      font-size: 18px;
      border: none;
      padding: 0 20px;
      border-radius: 8px;
      align-self: flex-end;

      &:hover {
        color: hotpink;
      }
    }
  }

  // 内容区
  .main {
    // background-color: plum;
    margin-top: 60px;

    label {
      display: block;
      font-size: 20px;
      margin: 5px 0;
      background-color: rgba(197, 197, 197, 0.247);
      text-align: left;
      height: 50px;
      line-height: 50px;
      border-radius: 8px;
      cursor: pointer;
      padding-left: 8px;
      position: relative;

      > span {
        margin-left: 1%;
      }

      &:nth-child(2n) {
        background-color: #fff;
      }

      .update__art {
        height: 100%;
        font-size: 20px;
        padding: 5px;
        background-color: $gray;
        position: absolute;
        right: 1%;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 7px;
      }
    }
  }
}
</style>
