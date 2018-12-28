<template>
  <el-dialog title="转办公文" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-form style="margin:40px 80px;" label-width="90px">
      <el-form-item label="任务名称：">
        <el-input placeholder="请输入任务名称"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-input placeholder="请输入开始时间"></el-input>
      </el-form-item>
      <el-form-item label="原办理人：">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="转办人：">
        <el-select style="width:390px;" placeholder="请选择"></el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

