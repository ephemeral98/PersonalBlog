<template>
  <div class="write">
    <Modal
      v-show="showModal"
      :showDeclareModal="showDeclareModal"
      @show-declaremodal="showDeclareModal = false"
      :illegalConfig="failMsg"
      @accept-illeagal="failMsg = $event"
      :updateConfig="updateConfig"
      :uploadConfig="uploadConfig"
      @show-uploadmodal="uploadConfig.isShow = false"
    />

    <div class="panel">
      <button class="up_img" @click="uploadConfig.isShow = true">
        上传图片
      </button>
      <!-- 分类选项 -->
      <select id="categories" v-model="pickKind">
        <option :value="kind.id" v-for="kind in category" :key="kind.id">
          {{ kind.name }}
        </option>
      </select>

      <!-- 发布按钮 -->
      <button class="declare" @click="submit">更新发布</button>
    </div>

    <!-- <button class="home_btn" @click="goHome">回到首页</button> -->

    <div id="toolbar-container" class="toolbar"></div>
    <div class="editing">
      <input type="text" class="title" v-model="title" />
      <div id="text-container" class="text"></div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import * as categoryService from "../../service/CategoryService.js";
import Modal from "./Modal.vue";
import { mapState } from "vuex";

export default {
  components: {
    Modal
  },

  data() {
    return {
      temp: false,
      title: "",
      updateConfig: {},
      showModal: true,
      editor: null,
      showDeclareModal: false,
      pickKind: 1,
      category: [],
      failMsg: "",
      uploadConfig: {
        isShow: false
      }
    };
  },
  computed: {
    ...mapState("articleStore", ["articleDetail"])
  },
  methods: {
    // 计算字数
    calcWords() {
      const reg = /\S/g;
      const word = this.editor.txt.text();
      let count = 0;
      while (reg.test(word)) {
        count++;
      }
      return count;
    },
    submit() {
      const wordsNum = this.calcWords();
      this.showModal = true;
      // 标题不能为空，且不能超过20个字符
      if (!this.title) {
        this.failMsg = "标题不能为空";
      }
      // 必须选择分类
      else if (this.pickKind === 1) {
        this.failMsg = "请选择分类";
      } else {
        // 在这里将数据传给Modal, 再在Modal统一去发送请求：updateConfig
        this.updateConfig = {
          title: this.title,
          content: this.editor.txt.html(),
          CategoryId: this.pickKind,
          wordsNum
        };

        this.showDeclareModal = true;
      }
    },
    goHome() {
      this.$router.push("/");
    }
  },
  watch: {
    articleDetail() {
      this.editor.txt.html(
        this.articleDetail ? this.articleDetail.content : ""
      );
      this.title = this.articleDetail ? this.articleDetail.title : "";
    }
  },

  async created() {
    // 如果没值，默认选中第一个分类的
    this.category = await categoryService.getAllCategory();
    this.pickKind =
      (this.articleDetail && this.articleDetail.CategoryId) ||
      this.category[0].id;
  },

  mounted() {
    console.log(this.articleDetail);
    this.editor = new E("#toolbar-container", "#text-container"); // 传入两个元素
    this.editor.create();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/common/font.scss";

.write {
  height: 100%;
  background-color: #d9d9d9;
  position: relative;

  .panel {
    position: absolute;
    right: 2px;
    top: 0;
    width: 450px;
    height: 42px;
    display: flex;
    justify-content: space-around;

    .up_img {
      padding: 0 10px;
      @include upload_btn(up_art_img);
      background-color: lighten($gray, 10%);
    }
  }

  // 分类选项
  #categories {
    width: 156px;
    background-color: #efefef;
    // position: absolute;
    // top: 0;
    // left: 80%;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    z-index: 2;

    > option {
      &:nth-child(1) {
        // 隐藏默认选项
        display: none;
      }
    }
  }

  // 发布按钮
  .declare {
    width: 100px;
    line-height: 45px;
    color: rgb(77, 76, 76);
    font-size: 18px;
    @include myFontFamily;
    transition: all 0.5s ease-in-out;
    z-index: 2;
    background: linear-gradient(to bottom, #8e9eab, #eef2f3);
    border-radius: 7px;

    &:hover {
      background: #8e9eab;
      color: snow;
    }
  }

  // 回首页
  /* .home_btn {
    @extend .declare;
    right: 1%;
    width: 80px;
    background: #bfbed3;
  } */

  // 编辑区
  .editing {
    width: 800px;
    height: 620px;
    margin: 40px auto 10px;
    overflow: auto;
    background-color: #fff;

    // 文章标题
    .title {
      width: 100%;
      height: 65px;
      border: none;
      border-bottom: solid 1px rgb(233, 233, 233);
      padding: 15px 32px 10px;
      font-size: 30px;
      @include myFontFamily;
      color: #595959;
    }

    // 文章正文
    .text {
      font-size: 16px;
      text-align: left;
      margin: 0 20px;
      height: 550px;
    }
  }

  .enter-active {
    transition: 2s;
  }
}
.toolbar {
  border: 1px solid #ccc;
}
</style>
