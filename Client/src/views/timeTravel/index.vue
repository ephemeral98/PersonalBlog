<template>
  <div class="articles">
    <CompHead>文章总览(时间轴)</CompHead>
    <MyContainer>
      <div class="article_list">
        <ul class="mons_chunk" v-for="list in articleList" :key="list.id">
          <li class="mon">{{ list.month }}, {{ list.year }}</li>
          <li class="art_wrap" v-for="art in list.article" :key="art.id">
            <!-- 每篇文章 -->
            <v-row class="art_chunk">
              <v-col class="occupyImg">
<<<<<<< HEAD
                <img :src="`${globalConst.qiBaseURL}/portrait.png`" alt="" />
=======
                <img
                  src="http://qm23h04eq.hn-bkt.clouddn.com/portrait.png"
                  alt=""
                />
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416
              </v-col>
              <v-col class="content">
                <div class="title">{{ art.title }}</div>
                <div class="date">{{ list.month }}-{{ art.date }}</div>
              </v-col>
            </v-row>
            <!-- <v-row class="art_chunk">
              <v-col class="occupyImg">
                <img src="../../assets/img/portrait.png" alt="" />
              </v-col>
              <v-col class="content">
                <div class="title">{{ art.title }}</div>
                <div class="date">{{ art.month }}-{{ art.date }}</div>
              </v-col>
            </v-row> -->
          </li>
        </ul>
      </div>
    </MyContainer>
    <MyFoot />
  </div>
</template>

<script>
import CompHead from "@/components/common/CompHead.vue";
import MyContainer from "@/components/common/MyContainer.vue";
import MyFoot from "@/components/common/MyFoot.vue";
export default {
  components: {
    CompHead,
    MyContainer,
    MyFoot
  },
  data: () => ({
    articleList: [
      {
        id: 1,
        year: "2020",
        month: "11",
        article: [
          {
            id: 1,
            title: "标题1",
            date: "15"
          },
          {
            id: 2,
            title: "标题2",
            date: "3"
          }
        ]
      },
      {
        id: 2,
        year: "2020",
        month: "10",
        article: [
          {
            id: 3,
            title: "标题3",
            date: "15"
          },
          {
            id: 4,
            title: "标题4",
            date: "3"
          },
          {
            id: 5,
            title: "标题5",
            date: "1"
          }
        ]
      }
    ]
  })
};
</script>
<style lang="scss" scoped>
.article_list {
  width: 100%;
  // height: 300px;
  background-color: plum;

  .mons_chunk {
    border: solid 2px red;
    padding: 0;
    margin: 50px 0;

    .mon {
      margin-left: -6px;
      &::before {
        content: "";
        width: 12px;
        height: 12px;
        display: inline-block;
        background-color: #dce8ec;
        border: 3px solid #afcfff;
        margin-right: 10px;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }

    .art_wrap {
      border: solid 2px #008c8c;
    }

    .art_chunk {
      width: 100%;
      height: 80px;
      background-color: pink;
      margin: 20px 0;
      align-items: center;

      .occupyImg {
        border: solid 2px gold;
        flex: 0 0 80px;
        box-sizing: border-box;
        height: 100%;
      }

      .content {
        background-color: yellow;
        margin-left: 20px;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
