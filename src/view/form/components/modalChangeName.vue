<template>
  <el-dialog title="修改文件名称" :visible="visible" @update:visible="toggle" width="670px">
    <el-form label-width="100px" style="width:400px;margin:0 auto;">
      <el-form-item label="修改名称：">
        <el-input v-model="name"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="small" @click="toggle(false)">取消</el-button>
      <el-button size="small" type="primary" @click="change">确认</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: ["visible", "value"],
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    }
  },
  watch: {
    visible(flag) {
      if (flag) {
        let fileName = this.value;
        this.name = fileName.substr(0, fileName.indexOf("."));
      }
    }
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    toggle(flag) {
      this.$emit("update:visible", flag);
    },
    change() {
      this.$emit("change", this.name);
      this.toggle(false);
    }
  }
};
</script>

