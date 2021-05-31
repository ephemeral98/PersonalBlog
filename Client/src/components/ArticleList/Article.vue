<template>
  <router-link
    :to="{ name: 'article', params: { articleId: art.id } }"
    class="row article"
    :class="queue % 2 === 0 ? 'que' : 'reQue'"
  >
    <v-flex class="place_img" sm5>
      <img :src="art.face" alt="" />
    </v-flex>
    <v-flex
      class="art_info d-flex justify-center flex-column pl-2 pl-sm-10 pr-2 pr-sm-10"
      sm7
    >
      <div class="art_title">{{ art.title }}</div>
      <div>
        <span class="iconfont icon-rili"
          >{{ art.date }}.{{ art.month }}.{{ art.year }}</span
        >
        |
        <span class="iconfont icon-ziyuan">{{
          art.Category && art.Category.name
        }}</span>
      </div>
      <p class="art_intoduce">{{ art.introduce }}</p>
    </v-flex>
  </router-link>
</template>

<script>
export default {
  name: "articleComp",
  props: ["art", "queue"]
};
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  @include borderShadow;
  color: $my_blue;

  &:hover {
    transform: translateY(7px);
  }

  p {
    margin: 1vh 0.5vh;
    @include mulOverHidden(4);
  }

  .art_title {
    font-size: 3vw;
    width: 100%;
    @include singleOverHidden;
  }

  .art_info {
    width: 100%;

    .art_introduce {
      text-align: center;
    }
  }
}

.place_img {
  width: 100%;
  height: 23vw;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// 手机屏
@media screen and (max-width: $phone_computer) {
  .article {
    flex-direction: column;

    > div {
      overflow: hidden;
    }

    .place_img {
      flex: 0 0 50%;
    }

    .art_title {
      font-size: 6vw;
    }

    .art_info {
      flex: 0 0 50%;
    }
  }
}

// 电脑屏
@media screen and (min-width: $phone_computer) {
  @mixin queue($imgPlace, $artInfo) {
    .place_img {
      order: $imgPlace;
    }
    .art_info {
      order: $artInfo;
    }
  }
  // 正序
  .que {
    @include queue(1, 2);
  }
  // 逆序
  .reQue {
    @include queue(2, 1);
  }

  /* .place_img {
    flex: 0 0 40%;
  }

  .art_info {
    flex: 0 0 60%;
    div {
      // background-color: gold !important;
    }
  } */
}

// 手机屏
@media screen and (min-width: $phone_computer) {
}
</style>
