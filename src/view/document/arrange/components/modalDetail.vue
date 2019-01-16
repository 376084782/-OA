<template>
  <el-dialog title="归档公文" :visible.sync="visible" width="680px" :before-close="handleClose">
    <el-form label-width="85px" style="padding:0 100px;" :data="data" :rules="rules">
      <el-form-item prop="a" label="保密性">
        <el-radio-group v-model="data.a">
          <el-radio :label="1">保密</el-radio>
          <el-radio :label="0">不保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" placeholder="请输入备注" :rows="4"></el-input>
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
      rules:{
        a:[{
          required:true
        }]
      },
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

