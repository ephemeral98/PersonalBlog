<template>
  <div class="comment">
    <header class="welcome_head">
      <CentralWord welcomeWord="留言板" />
      <EnterMain></EnterMain>
    </header>

    <!-- 评论区内容 -->
    <v-flex xs11 sm7 class="comment_content">
      <CommentList :floors="floors" />
    </v-flex>

    <ToolsBar></ToolsBar>
    <MyFoot />
  </div>
</template>

<script>
import CentralWord from "@/components/common/CentralWord";
import EnterMain from "@/components/common/CentralWord/EnterMain";
import CommentList from "@/components/comment/CommentList.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import ToolsBar from "@/components/common/ToolsBar";
export default {
  name: "guestbook",
  components: {
    CommentList,
    CentralWord,
    EnterMain,
    MyFoot,
    ToolsBar
  },
  data: () => ({
    isShowAlert: false,
    floors: []
  }),

  async created() {
    // this.floors = await commentHttp.getGuestArea(2, 6);
    this.$store.dispatch("commentStore/getMoreComments", [1, 5]);
  }
};
</script>

<style lang="scss" scoped>
.comment {
  .container {
    height: 100%;
    background-color: skyblue;
  }

  .comment_content {
    // background-color: hotpink;
    margin: 0 auto;
  }
}

// 手机屏
@media screen and (max-width: $phone_computer) {
  .container {
    width: 95%;
  }
}
// 电脑屏
@media screen and (min-width: $phone_computer) {
  .container {
    width: 60%;
  }
}
</style>
