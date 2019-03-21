<template>
  <el-dialog
    :append-to-body="true"
    title="个人中心"
    width="600px"
    :visible="show"
    @update:visible="toggle"
  >
    <el-form :model="data" :rules="rules" style="width:400px;margin:0 auto;" size="small" label-width="90px">
      <el-form-item label="原密码：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="新密码：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="重复密码：">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="small" type="primary">确定修改</el-button>
      <el-button size="small">取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      data:{},
      rules:{}
    };
  },
  methods:{
    toggle(flag){
      this.$emit('update:show',flag)
    }
  }
};
</script>

