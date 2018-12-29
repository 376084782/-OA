<template>
  <el-dialog title="归档" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-form label-width="85px" style="padding:0 100px;">
      <el-form-item label="归档类型：">
        <el-input type="textarea" placeholder="归档字段待提供；若未提供，点击归档时，提示“此功能暂 未开发”" :rows="4"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clickCancel">取 消</el-button>
      <el-button type="primary" @click="clickSure">确 定</el-button>
    </div>
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
      bLoading: false,
      data: []
    };
  },
  methods: {
    clickCancel() {
      this.$emit("update:visible", false);
    },
    clickSure() {
      this.$emit("update:visible", false);
    },
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

