<template>
  <el-dialog title="修改文件名称" :visible.sync="visible" width="670px" :before-close="handleClose">
    <el-form label-width="100px" style="width:400px;margin:0 auto;">
      <el-form-item label="修改名称：">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary">确认</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props:['visible'],
  methods:{
    handleClose(){
      this.$emit('update:visible',false);
    }
  },
  data() {
    return {

    };
  }
};
</script>

