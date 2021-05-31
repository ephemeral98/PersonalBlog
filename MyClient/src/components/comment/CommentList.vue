<template>
  <div class="comment_list">
    <b-modal
      id="modal-sm"
      size="sm"
      title="来自管理员的友情提示："
      @ok="confirmDel"
      >确定要删除：{{ delWho }}？
    </b-modal>
    <b-alert
      class="status_msg"
      :show="dismissCountDown"
      dismissible
      :variant="alertConfig.color"
      @dismissed="dismissCountDown = 0"
    >
      {{ alertConfig.word }}
    </b-alert>
    <!-- 写评论 -->
    <CommentInp />
    <div class="comment_list_content">
      <CommentItem
        v-for="floor in floorsData"
        :key="floor.id"
        :floor="floor"
        @who="getWho"
      >
        <template #floor="{ floorUser }">
          <input
            type="checkbox"
            :value="{
              id: floorUser.id,
              name: floorUser.name,
              isFloor: true,
              reply: floorUser.reply
            }"
            v-model="pickedUsers"
          />
        </template>
        <template #reply="{ replyUser }">
          <input
            type="checkbox"
            :value="{ id: replyUser.id, name: replyUser.name, isFloor: false }"
            v-model="pickedUsers"
          />
        </template>
      </CommentItem>
    </div>
    <button
      class="more"
      @click="moreComment"
      v-if="floorsData && floorsData.length < floorsCount"
    >
      看更多评论
    </button>
    <div class="nomore" v-else>没有更多了...</div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import CommentInp from "./CommentInp.vue";
import { mapState } from "vuex";
import * as commentHttp from "@/service/CommentService.js";

export default {
  props: ["getPickName"],
  components: {
    CommentItem,
    CommentInp
  },
  data: () => ({
    loadTimes: 2, // 第2次加载开始
    pickedUsers: [],
    dismissCountDown: 0,
    alertConfig: {
      word: "无",
      color: "success"
    }
  }),
  computed: {
    ...mapState("commentStore", ["floorsData", "floorsCount"]),
    delWho() {
      return this.pickedUsers.map(item => item.name).join("、");
    },
    articleId() {
      return this.$route.params.articleId || -1;
    }
  },
  methods: {
    /**
     * 回复谁
     */
    getWho(...e) {
      console.log(e);
    },
    /**
     * 获取更多评论
     */
    async moreComment() {
      // 从第二次加载开始，每次追加载7条评论
      this.$store.dispatch("commentStore/getMoreComments", [
        this.loadTimes,
        7,
        +this.articleId
      ]);
      this.loadTimes++;
    },

    // 点击了确认删除
    async confirmDel() {
      const countDown = 3;

      if (this.pickedUsers.length === 0) {
        this.handleAlertConfig("请选择要删除的评论", "warning", countDown);
        return;
      }
      // const users = this.pickedUsers.map(item => item.id);
      // 发送ajax，根据id删除该评论
      const resp = await commentHttp.delManyComment(this.pickedUsers);
      console.log(resp);
      if (resp.data.status === "success") {
        this.handleAlertConfig("批量删除成功！", "success", countDown);
      } else {
        this.handleAlertConfig("批量删除失败！", "danger", countDown);
      }
      setTimeout(() => {
        this.$router.go(0); // 刷新本页
      }, countDown);
    },
    handleAlertConfig(word, status, countDown) {
      this.alertConfig.word = word;
      this.alertConfig.color = status;
      this.dismissCountDown = countDown;
    }
  },
  watch: {
    getPickName(val) {
      if (val) {
        this.$bvModal.show("modal-sm"); // 弹窗寻求确认删除？
        console.log(this.pickedUsers);
        this.$emit("noPick", false);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.comment_list {
  width: 80%;
  margin: 0 auto;
  padding: 1.7vw 1vw 100px;

  position: relative;

  // @include borderShadow;

  .comment_list_content {
    margin-top: 50px;
    // background-color: lightblue;
  }

  .more {
    width: 140px;
    padding: 5px 10px;
    border: solid 1px lighten(gray, 40%);
    font-size: 20px;
    color: gray;
    transition: all 0.8s;
    @include center(absolute);
    top: 98.5%;

    &:hover {
      box-shadow: 0 0 20px lighten(gray, 10%);
    }
  }

  .nomore {
    @extend .more;
    border: none;
    &:hover {
      box-shadow: none;
    }
  }
}
</style>
