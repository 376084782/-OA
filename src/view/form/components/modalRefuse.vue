<template>
  <el-dialog title="拒绝原因" :visible="show" width="560px" @update:visible="toggle">
    <el-form style="width:350px;margin:0 auto;" label-width="70px">
      <el-form-item label="备注">
        <el-input type="textarea" v-model="data.content"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="small" @click="toggle(false)">取消</el-button>
      <el-button size="small" type="primary" @click="sureHandler">确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      data: {
        content: ""
      }
    };
  },
  watch: {
    show(flag) {
      if (flag) {
        this.data.content = "";
      }
    }
  },
  methods: {
    sureHandler() {
      let data = [
        {
          type: "textarea",
          fixed: true,
          code: "message",
          value: this.data.content
        }
      ];
      this.$emit("sure",data);
    },
    toggle(flag) {
      this.$emit("update:show", flag);
    }
  }
};
</script>

