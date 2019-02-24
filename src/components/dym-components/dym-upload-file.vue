<template>
  <el-row>
    <p v-for="(item,index) in fileList" :key="index">
      <span>{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <a download :href="item.value" target="_blank" class="el-button el-button--text">下载</a>
      <el-button style="margin-left:6px;" type="text" @click="rename(item)" v-if="!disabled">改名</el-button>
      <el-button style="margin-left:6px;" type="text" @click="del(item)" v-if="!disabled">删除</el-button>
    </p>
    <el-button :disabled="disabled" size="small" @click="uploadHandler">
      <i class="anticon icon-upload"></i> 上传文件
    </el-button>
    <modal-change-name :visible.sync="showChangeName" @change="changeHandler" :value="changingName"></modal-change-name>
  </el-row>
</template>
<script>
import modalChangeName from "view/form/components/modalChangeName.vue";
import { upload, download } from "utils/upload.js";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: { modalChangeName },
  data() {
    return {
      fileList: this.value,
      showChangeName: false,
      changingName: "",
      changingData: {}
    };
  },
  watch: {
    fileList(list) {
      this.$emit("input", list);
    }
  },
  methods: {
    changeHandler(name) {
      let fileName = this.changingName;
      this.changingData.name = name + fileName.substr(fileName.indexOf("."));
    },
    rename(data) {
      this.changingData = data;
      this.changingName = data.name;
      this.$nextTick(() => {
        this.showChangeName = true;
      });
    },
    del(data) {
      this.fileList = this._.dropWhile(this.fileList, item => {
        return item.value == data.value;
      });
    },
    download(data) {
      download(data.value);
    },
    uploadHandler() {
      upload().then(({ oldName, url }) => {
        this.fileList.push({
          name: oldName,
          value: url
        });
      });
    }
  }
};
</script>

