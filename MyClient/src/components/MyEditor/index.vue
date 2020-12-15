<template>
  <div class="write">
    <!-- 发布按钮 -->
    <button class="declare" @click="submit">更新发布</button>

    <!--使用了v-if 其实会导致一个小bug，第一次渲染该组件的时候，没有过度动画，但是优点大于缺点 -->
    <Modal
      v-if="showModal"
      :showDeclareModal="showDeclareModal"
      :updateConfig="updateConfig"
      @show-declaremodal="showDeclareModal = false"
      :illegalConfig="failMsg"
      @accept-illeagal="failMsg = $event"
    />

    <!-- 分类选项 -->
    <select id="categories" v-model="pickKind">
      <option :value="kind.id" v-for="kind in category" :key="kind.id">
        {{ kind.name }}
      </option>
    </select>

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
export default {
  props: ["artcleInfos"],
  components: {
    Modal
  },

  data() {
    return {
      showModal: false,
      title: null,
      editor: null,
      introduce: "无",
      showDeclareModal: false,
      pickKind: 1,
      category: [],
      updateConfig: {},
      failMsg: ""
    };
  },
  computed: {
    typeNum() {
      return 123;
    }
  },
  watch: {
    artcleInfos(val) {
      const { id, title, content, CategoryId, introduce } = val;
      this.id = id;
      this.title = title;
      this.editor.txt.html(content);
      this.introduce = introduce; // 文章的介绍，要给弹窗处理
      this.pickKind = CategoryId; // 修改文章页面 初始化时
    },
    introduce: {
      handler() {
        this.updateConfig.introduceContent = this.introduce;
      }
    }
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
      console.log(this.pickKind);
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
          id: this.id,
          title: this.title,
          content: this.editor.txt.html(),
          introduceContent: this.introduce,
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

  async created() {
    this.updateConfig.id = this.$route.params.id; // 获取文章的id

    // 获取所有文章分类名字
    /* const categories = await categoryService.getAllCategory();
    console.log(categories);
    categories.forEach(kind => {
      this.category.push(kind.name);
    }); */
    // this.category.unshift("请选择分类");

    // 如果没值，默认选中第一个分类的
    this.category = await categoryService.getAllCategory();
    this.pickKind = this.pickKind || this.category[0].id;
  },

  mounted() {
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

  // 字数
  .typeNum {
    position: absolute;
    right: 23%;
    width: 70px;
    height: 42px;
    background-color: #efefef;
    border-radius: 8px;
    text-align: center;
    line-height: 45px;
    font-size: 15px;
    border: none;
  }

  // 分类选项
  #categories {
    width: 156px;
    height: 42px;
    background-color: #efefef;
    position: absolute;
    top: 0;
    left: 80%;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    z-index: 2;

    > option:nth-child(1) {
      // 隐藏默认选项
      display: none;
    }
  }

  // 发布按钮
  .declare {
    width: 100px;
    height: 42px;
    position: absolute;
    right: 1%;
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
