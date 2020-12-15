<template>
  <transition-group
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__rollOut"
  >
    <!-- 添加分类弹窗 -->
    <MyModal
      v-if="showAddModal"
      :basicConfig="showAddConfig"
      @close-modal="$emit('show-addmodal', false)"
      key="showAddModal"
    >
      <template #title>
        <div class="title">请输入分类名字</div>
      </template>
      <template #content>
        <textarea name="" class="kindName" v-model="newKindContent"></textarea>
      </template>
      <template #controlBtn>
        <button class="confirm_btn" @click="confirmSubmit(newKindContent)">
          确认添加
        </button>
        <button class="cancel_btn" @click="$emit('show-addmodal', false)">
          取消
        </button>
      </template>
    </MyModal>

    <!-- 修改分类弹窗 -->
    <MyModal
      v-if="showUpdateModal"
      :basicConfig="updateConfig"
      @close-modal="showUpdateModal = false"
      key="showUpdateModal"
    >
      <template #title>
        <div class="title">请输入分类名字</div>
      </template>
      <template #content class="content">
        <p>
          <input
            class="inp_name"
            type="text"
            placeholder="old name"
            v-model="oldKindName"
          />
        </p>
        <p>
          <input
            class="inp_name"
            type="text"
            placeholder="new name"
            v-model="newKindName"
          />
        </p>
      </template>
      <template #controlBtn>
        <button
          class="confirm_btn"
          @click="confirmUpdate(oldKindName, newKindName)"
        >
          确认修改
        </button>
        <button class="cancel_btn" @click="showUpdateModal = false">
          取消
        </button>
      </template>
    </MyModal>

    <!-- 删除分类弹窗 -->
    <MyModal
      v-if="showDelModal"
      :basicConfig="showDelConfig"
      @close-modal="$emit('show-delmodal', false)"
      key="showDelModal"
    >
      <template #title>
        <div class="title">请输入分类名字</div>
      </template>
      <template #content>
        <textarea
          name=""
          class="kindName"
          v-model="delKindByNameContent"
        ></textarea>
      </template>
      <template #controlBtn>
        <button
          class="confirm_btn"
          @click="delKindByName(delKindByNameContent)"
        >
          确认删除
        </button>
        <button class="cancel_btn" @click="$emit('show-delmodal', false)">
          取消
        </button>
      </template>
    </MyModal>

    <!-- 询问弹窗 -->
    <MyModal
      v-if="showQueryModal"
      :basicConfig="showDelConfig"
      @close-modal="closeQuery"
      key="showQueryModal"
    >
      <template #content>
        <div class="content">确定要删除分类：{{ delContent }}吗？</div>
      </template>
      <template #controlBtn>
        <button
          class="confirm_btn"
          @click="confirmDel(delContent, queryConfig && queryConfig.id)"
        >
          确认删除
        </button>
        <button class="cancel_btn" @click="closeQuery">取消</button>
      </template>
    </MyModal>

    <!-- 成功弹窗 -->
    <MyModal
      v-if="succModal"
      :basicConfig="succConfig"
      @close-modal="confirmSucc"
      key="succModal"
      @click="succModal = false"
    >
      <template v-slot:content>
        <div class="content">{{ statusMsg || "成功" }}</div>
      </template>
      <template v-slot:controlBtn>
        <button class="confirm_btn" @click="confirmSucc">Ok</button>
      </template>
    </MyModal>
    <!-- 失败弹窗 -->
    <MyModal
      v-if="failModal"
      :basicConfig="failConfig"
      @close-modal="failModal = false"
      key="failModal"
    >
      <template v-slot:title>
        <div class="title">添加失败</div>
      </template>
      <template v-slot:content>
        <div class="content">{{ statusMsg || "失败" }}</div>
      </template>
      <template v-slot:controlBtn>
        <button class="cancel_btn" @click="failModal = false">Cancel</button>
      </template>
    </MyModal>
  </transition-group>
</template>

<script>
import MyModal from "../tools/MyModal";
import * as categoryHttp from "../../service/CategoryService.js";
export default {
  props: ["showAddModal", "showDelModal", "queryConfig", "updateConfig"],
  components: {
    MyModal
  },
  data() {
    return {
      showUpdateModal: false,
      oldKindName: "",
      newKindName: "",
      showQueryModal: false,
      succModal: false,
      failModal: false,
      newKindContent: "无",
      delKindByNameContent: "无",
      delContent: null,
      statusMsg: "",
      showAddConfig: {
        msg: false
      },
      showDelConfig: {
        msg: false
      },
      succConfig: {
        msg: true,
        modalStyle: {
          boxShadow: "0 0 20px #c8e6c6"
        }
      },
      failConfig: {
        msg: true,
        modalStyle: {
          boxShadow: "0 0 20px red"
        }
      }
    };
  },
  methods: {
    // 添加
    async confirmSubmit(tex) {
      console.log("添加成功！");
      // this.$emit("kind-name", e);
      // 发送一个请求：新增分类
      const res = await categoryHttp.addKind({
        name: tex
      });
      // 关闭info弹窗先
      this.newKindContent = "无";
      this.$emit("show-addmodal", false);

      // 返回的消息
      this.statusMsg = res.msg;
      if (res.status === "success") {
        // 成功弹窗
        this.succModal = true;
        // 刷新一下页面
      } else {
        // 失败弹窗
        this.failModal = true;
      }
    },
    // 根据分类名字删除
    delKindByName(name) {
      console.log(name);
      this.delContent = name;
      this.showQueryModal = true;
      // 关闭info弹窗
      this.delKindByNameContent = "无";
      this.$emit("show-delmodal", false);
    },
    // 修改分类名字
    async confirmUpdate(oldName, newName) {
      console.log(oldName, newName);
      const res = await categoryHttp.updateKindName(oldName, newName);
      this.statusMsg = res.msg;
      if (res.status === "success") {
        // 成功弹窗
        this.succModal = true;
        // 刷新一下页面
      } else {
        // 失败弹窗
        this.failModal = true;
      }

      this.showUpdateModal = false;
    },

    // 关闭询问弹窗
    closeQuery() {
      this.$emit("remove-id");
      this.showQueryModal = false;
      console.log("hello close query", this.showQueryModal);
      this.delContent = "无";
    },

    // 确认删除
    async confirmDel(tex, id) {
      console.log("确认删除", tex, id);
      let res;
      if (id) {
        res = await categoryHttp.delKindById(id);
      } else {
        res = await categoryHttp.delKindByName({
          name: tex
        });
      }
      // 关闭info弹窗先
      this.delKindByNameContent = "无";
      this.showQueryModal = false;
      // 返回的消息
      this.statusMsg = res.msg;
      if (res.status === "success") {
        // 成功弹窗
        this.succModal = true;
        // 刷新一下页面
      } else {
        // 失败弹窗
        this.failModal = true;
      }
      this.$emit("remove-id");
    },

    /**
     * 确认成功
     */
    confirmSucc() {
      this.succModal = false;
      /**
       * 刷新一下页面
       */
      this.$router.go(0);
    }
  },
  watch: {
    "queryConfig.isShow": {
      handler(val) {
        console.log("hello, query", val);
        this.showQueryModal = true;
        this.delContent = this.queryConfig.name;
      },
      deep: true
    },
    "updateConfig.isShow": {
      handler(val) {
        console.log("hello, update", val);
        this.showUpdateModal = true;
        this.oldKindName = this.updateConfig.oldName;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/common/myBtn.scss";
@import "../../assets/common/center.scss";
.v-enter-to,
.v-leave-to {
  @include modal__center;
}
.kindName {
  font-size: 18px;
  margin: 20px;
  border: none;
}

.content {
  p {
    width: 100%;
  }
  .inp_name {
    width: 100%;
    border-radius: 10px;
    padding: 0 10px;
    border: solid 1.2px $gray;
    margin: 5px 0;

    &::placeholder {
      font-style: italic;
      color: $gray;
    }
  }
}
</style>
