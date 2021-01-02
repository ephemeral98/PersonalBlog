<template>
  <div class="writing">
    <router-link class="home iconfont" :to="{ name: 'Home' }"
      >首页 &#xe503;</router-link
    >
    <MyEditor
      @confirm-submit="submit"
      :successSub="successSub"
      :failSub="failSub"
      @close-alarm="failSub = false"
      @close-ok="successSub = false"
    />
  </div>
</template>

<script>
import MyEditor from "../components/MyEditor";
import { declare } from "../service/ArticleService";
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      successSub: false,
      failSub: false
    };
  },
  methods: {
    async submit(infos) {
      const { title, content, introduce, wordNum, name } = infos;
      const res = await declare({
        title,
        content,
        introduce,
        wordNum,
        name
      });
      res && res.data.status === "success"
        ? (this.successSub = true)
        : (this.failSub = true);
    }
  }
};
</script>
<style lang="scss" scoped>
.writing {
  height: 100vh;

  .home {
    background-color: rgba($gray, 5%);
    display: block;
    padding: 5px;
    position: fixed;
    top: 0;
    z-index: 9;
    margin-top: 50px;

    &:hover {
      color: #fff;
      background-color: $my_pink;
    }
  }
}
</style>
