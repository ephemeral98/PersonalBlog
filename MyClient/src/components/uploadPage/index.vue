<template>
  <div class="upload_page">
    <b-alert
      class="status_msg"
      :show="alertConfig.dismissCountDown"
      dismissible
      :variant="alertConfig.color"
      @dismissed="alertConfig.dismissCountDown = 0"
    >
      {{ alertConfig.word }}
    </b-alert>
    <div class="up_file">
      <h3 class="mb-2">上传音乐/图片：</h3>
      <div class="d-flex flex-column flex-lg-row">
        <b-col class="pick" xs="12" lg="2">
          选择文件
          <input
            type="file"
            class="pick_file"
            @change="getFileInfo"
            ref="pickFile"
            multiple
          />
        </b-col>
        <div class="ml-3 file_info" v-if="fileInfos.length !== 0">
          {{ fileInfos.join("，") }}
        </div>
      </div>
      <button class="up_btn mt-2" @click="uploadFile">上传</button>
    </div>
  </div>
</template>

<script>
// import uploadHttp from "@/service/UploadService.js";
import * as handleAlert from "@/utils/handleAlertStatus.js";
import * as uploadHttp from "@/service/UploadService.js";
export default {
  data: () => ({
    fileInfos: [],
    alertConfig: {
      dismissCountDown: 0,
      word: "无",
      color: "info"
    }
  }),
  methods: {
    getFileInfo(e) {
      this.fileInfos = [];
      e.target.files.forEach(file => {
        this.fileInfos.push(file.name);
      });
    },
    async uploadFile() {
      console.log(this.fileInfos);
      if (this.fileInfos.length == 0) {
        handleAlert.handleEmpty(this, "请选择上传的文件");
      } else if (this.fileInfos.length >= 12) {
        handleAlert.handleEmpty(this, "上传的文件数不能超过12个");
      } else {
        const fData = new FormData();
        console.log(this.$refs.pickFile.files.forEach);

        this.$refs.pickFile.files.forEach(file => {
          fData.append("mulFiles", file, file.name);
        });
        const resp = await uploadHttp.upMultiple(fData);
        handleAlert.handleRes(resp.data, this);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload_page {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .up_file {
    width: 80%;
    // height: 60px;
    border: dashed 2px $gray;
    margin: 10px auto 0;
    padding: 5px 10px;

    .pick {
      @include upload_btn(pick_file, 120px);
    }

    .file_info {
      @include singleOverHidden;
    }

    .up_btn {
      @include normal_btn(120px, 40px);
    }
  }
}

.status_msg {
  width: 350px;
}
</style>
