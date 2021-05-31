<template>
  <!-- 每一层 -->
  <div class="guest_item">
    <!-- 层主 -->
    <li class="owner">
      <div class="avatar">
        <img
          :src="floor.tag === '0' ? blogOwnerAvatar : visitor + Math.random()"
          alt=""
        />
      </div>
      <div class="creed">
        <div class="name">
          {{ floor.name }}
          <span class="tag" :class="floor.tag === '0' ? 'blog_owner' : null">{{
            floor.tag === "0" ? "博主" : "访客"
          }}</span>
        </div>
        <div class="time">
          {{ floor.date }}.{{ floor.month }}.{{ floor.year }}
          {{ floor.hour }}:{{ floor.min }}:{{ floor.sec }}
        </div>
        <div class="content">
          {{ floor.content }}
        </div>
      </div>
      <button class="call" @click="toReply(floor)">回复</button>
    </li>

    <!-- 回复 -->
    <div class="reply">
      <div class="reply_item" v-for="re in floor.reply" :key="re.id">
        <li class="replyer">
          <div class="avatar">
            <img
              :src="
                floor.tag === '0' ? blogOwnerAvatar : visitor + Math.random()
              "
              alt=""
              class="avatar"
            />
          </div>
          <div class="creed">
            <div class="name">
              {{ re.name }}
              <span class="tag" :class="re.tag === '0' ? 'blog_owner' : null">{{
                re.tag === "0" ? "博主" : "访客"
              }}</span>
            </div>
            <div class="time">
              {{ re.date }}.{{ re.month }}.{{ re.year }} {{ floor.hour }}:{{
                floor.min
              }}:{{ floor.sec }}
            </div>
            <div class="content">@{{ re.toWho }}: {{ re.content }}</div>
          </div>
          <button class="call" @click="toReply(re)">回复</button>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floor"],
  data: () => ({
    visitor: "http://api.rosysun.cn/sjtx/?type=6"
  }),
  computed: {
    blogOwnerAvatar() {
      return `${this.globalConst.qiBaseURL}/portrait.png` || "";
    }
  },
  methods: {
    toReply(e) {
      // 拿到楼层，昵称，--> vuex
      // 如果是-1，证明是层主，则该楼是他的id，否则，它是该层的回复者
      window.scrollTo(0, 566);
      e.parent == -1 ? (this.floorId = e.id) : (this.floorId = e.parent);
      this.nickName = e.name;
      this.$store.commit("commentStore/setNickName", this.nickName);
      this.$store.commit("commentStore/setFloorId", this.floorId);
    }
  }
};
</script>

<style lang="scss" scoped>
// 每一层
.guest_item {
  margin-top: 20px;

  .owner {
    border-top: solid $gray 1px;
    padding-top: 15px;
    // border: solid 2px red;
  }

  li {
    display: flex;
    position: relative;

    .call {
      position: absolute;
      right: 0;
      color: darken($my_blue, 20%);
    }
  }

  .avatar {
    margin-right: 8px;
    width: 60px;
    height: 60px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .creed {
    // display: flex;
    width: 100%;

    .name {
      color: #c38c2d;
      font-size: 16px;
    }

    .tag {
      background-color: $gray;
      padding: 2px 5.5px;
      font-size: 12.5px;
      color: #fff;
      border-radius: 3px;
    }

    .time {
      color: lighten(gray, 20%);
      font-size: 12px;
    }

    // 评论内容
    .content {
      margin-top: 20px;
      // width: 300px;
    }
  }

  .reply {
    border-left: solid 5px $my_blue;
    width: 80%;
    position: relative;
    left: 60px;
    padding-left: 1vw;

    .reply_item {
      .replyer {
        display: flex;
        margin-top: 20px;
        padding: 10px 0;
        border-bottom: dashed $gray 2px;

        .content {
          margin: 40px 0;
        }
      }
    }
  }
}

.blog_owner {
  background-color: $my_blue !important;
}
</style>
