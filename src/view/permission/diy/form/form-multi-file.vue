<template>
  <div class="mgTop20">
    <el-form size="mini">
      <el-form-item label="标题">
        <el-input v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="提示文字">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证"><br>
        <el-checkbox>必填</el-checkbox>
      </el-form-item>
      <el-form-item label="打印"><br>
        <el-checkbox>参与打印</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:['data'],
  data() {
    return {

    };
  }
};
</script>

