<template>
  <el-dialog title="拒收原因" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-form style="margin:40px 80px;" label-width="80px">
      <el-form-item label="拒收原因">
        <el-input placeholder="请输入拒收原因" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="提醒方式">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="站内消息"></el-checkbox>
          <el-checkbox label="手机短信提醒" disabled></el-checkbox>
          <el-checkbox label="邮件" disabled></el-checkbox>
          <el-checkbox label="微信" disabled></el-checkbox>
        </el-checkbox-group>
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
      checkList: []
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

