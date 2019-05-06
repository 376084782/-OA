<template>
  <div style="width:500px;margin:0 auto;margin-top:20px;">
    <el-form size="mini">
      <el-form-item label="事项名称">
        <el-input v-model="data.name" placeholder="最多输入20字"></el-input>
      </el-form-item>
      <el-form-item label="选择分组">
        <el-select style="width:100%" v-model="data.name"></el-select>
      </el-form-item>
      <el-form-item label="可见范围">
        <el-select style="width:100%" v-model="data.name"></el-select>
      </el-form-item>
      <el-form-item label="流程图标">
        <el-row type="flex" style="width:100%;">
          <div class="icon"></div>
          <el-button>选择图标</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="data.name" placeholder="最多输入100字"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="mgTop20">
      <el-button size="mini" type="primary" @click="$emit('next')">下一步</el-button>
      <el-button size="mini">取消</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.icon{
  width: 36px;
  height: 36px;
  background-color: #5D9FF8;
  border-radius: 4px;
  margin-right: 8px;
}
</style>
