<template>
  <div class="categories">
    <button class="new_kind" @click="addModal = true">
      添加一个分类
      <i class="iconfont">&#xe603;</i>
    </button>
    <button class="del_kind" @click="delModal = true">
      删除一个分类
      <i class="iconfont">&#xe651;</i>
    </button>

    <Modal
      :showAddModal="addModal"
      @show-addmodal="addModal = false"
      :showDelModal="delModal"
      @show-delmodal="delModal = false"
      :queryConfig="queryConfig"
      @remove-id="queryConfig.id = null"
      :updateConfig="updateConfig"
    />

    <router-link
      tag="li"
      :class="kind.id === 1 ? 'unselected' : null"
      :to="{
        name: 'articles',
        params: { id: kind.id },
        query: { kindName: kind.name }
      }"
      v-for="kind in kinds"
      :key="kind.id"
    >
      <div
        class="del_icon iconfont"
        @click.stop="delKind(kind.id, kind.name)"
        v-if="kind.id !== 1"
      >
        &#xe534;
      </div>
      <div
        class="update_icon iconfont"
        @click.stop="updateKind(kind.id, kind.name)"
        v-if="kind.id !== 1"
      >
        &#xe759;
      </div>
      {{ kind.name }}</router-link
    >

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import * as categoryHttp from "../../service/CategoryService.js";
import { mapState } from "vuex";
export default {
  components: {
    Modal
  },
  async created() {
    // 数据构建完成的时候，立马获取分类名字
    this.kinds = await categoryHttp.getAllCategory();
    if (this.kinds.length === 0) {
      // 一开始，没有任何分类的时候，加一个：未选择分类 作为第一个分类
      await categoryHttp.addKind({ name: "未选择分类" });
    }
  },
  data() {
    return {
      kinds: [],
      addModal: false,
      delModal: false,
      updateConfig: {
        id: null,
        isShow: false,
        oldName: null
      },
      queryConfig: {
        isShow: false,
        id: null
      }
    };
  },
  computed: {
    ...mapState("adminStore", {
      user: "data"
    })
  },
  methods: {
    delKind(id, name) {
      console.log("hello, del", id);
      this.queryConfig.isShow = !this.queryConfig.isShow; // 用作watch监听的
      this.queryConfig.id = id;
      this.queryConfig.name = name;
    },
    updateKind(id, name) {
      console.log("hello, update", id, name);
      this.updateConfig.isShow = !this.updateConfig.isShow; // 用作watch监听的
      this.updateConfig.id = id;
      this.updateConfig.oldName = name;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/common/center.scss";
@import "../../assets/common/myBtn.scss";
.v-enter-to,
.v-leave-to {
  @include modal__center;
}
.categories {
  // background: red;
  margin: 50px 30px 10px;
  display: flex;
  flex-wrap: wrap;

  .new_kind {
    width: 140px;
    height: 50px;
    background: linear-gradient(to bottom, $my_pink, #bfe9ff);
    position: absolute;
    left: 3%;
    top: 5px;
    border-radius: 4px;
    font-size: 18px;
    transition: all 2s ease-in-out;
    font-weight: bold;

    &:hover {
      background: $my_pink;
    }
  }

  .del_kind {
    @extend .new_kind;
    left: 80%;
  }

  > li {
    width: 230px;
    height: 80px;
    background-color: $my_blue;
    font-size: 30px;
    line-height: 80px;
    color: #fff;
    border-radius: 7px;
    cursor: pointer;
    margin: 10px;
    text-align: center;
    position: relative;

    &.unselected {
      background-color: $my_pink;
    }

    @mixin con($color) {
      width: 20px;
      height: 20px;
      background-color: $color;
      position: absolute;
      top: 0;
      line-height: 20px;
    }

    .del_icon {
      @include con($my_pink);
      left: 0;
    }

    .update_icon {
      @include con(#008c8c);
      right: 0;
    }
  }
}
</style>
