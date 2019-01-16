<template>
  <el-dialog title="新增文号" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-form label-width="100px" style="width:500px;margin:0 auto;" :data="data" :rules="rules">
      <el-form-item label="收发类型">
        <el-radio-group>
          <el-radio :label="1">发文字号</el-radio>
          <el-radio :label="2">收文编号</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公文类型：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="编号定义：">
        <el-input></el-input>
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
    return {
      rules:{

      },
      bLoading: false,
      data: []
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

