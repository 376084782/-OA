<template>
  <el-dialog title="完成进度" :visible="show" width="560px" @update:visible="toggle">
    <el-form style="width:350px;margin:0 auto;" label-width="70px">
      <el-form-item label="完成进度">
        <el-input-number v-model="data.percent" :max="100" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="data.content"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="small" @click="toggle(false)">取消</el-button>
      <el-button size="small" type="primary" @click="$emit('finish',data)">确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: ["show", "percent"],
  data() {
    return {
      data: {
        percent: 0,
        content: ""
      }
    };
  },
  watch: {
    percent(val) {
      this.data.percent = this.percent;
    }
  },
  methods: {
    toggle(flag) {
      this.$emit("update:show", flag);
    }
  }
};
</script>

