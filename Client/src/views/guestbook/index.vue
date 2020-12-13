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
  components: {
    CommentList,
    CentralWord,
    EnterMain,
    MyFoot,
    ToolsBar
  },
  data: () => ({
    isShowAlert: false,
    floors: [
      {
        id: "1",
        name: "owner1",
        content:
          "这是一个评论内容1 这是一个评论内容1 这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1这是一个评论内容1",
        createdAt: "12312314121",
        reply: [
          {
            id: "1",
            name: "reply1",
            content:
              "回复信息1 回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1回复信息1",
            createdAt: "2131231",
            floorId: "1"
          },
          {
            id: "2",
            name: "reply2",
            content: "回复信息2",
            createdAt: "2131232",
            floorId: "1"
          },
          {
            id: "3",
            name: "reply3",
            content: "回复信息3",
            createdAt: "2131233",
            floorId: "1"
          }
        ]
      },
      {
        id: "2",
        name: "owner2",
        content: "这是一个评论内容2",
        createdAt: "12312314122"
      },
      {
        id: "3",
        name: "owner3",
        content: "这是一个评论内容3",
        createdAt: "12312314123"
      }
    ]
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
