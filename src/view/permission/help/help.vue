<template>
  <el-card class="mgTop24">
    <h3 style="margin:0 24px 16px;">发起审批协助</h3>
    <p class="line" style="margin-left:-24px;width:120%;"></p>
    <el-form size="small" class="mgTop24" label-width="120px">
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input disabled :value="$store.getters.name"></el-input>
      </el-form-item>
      <el-form-item label="所在部门">
        <el-input disabled :value="$store.getters.currentOrgInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="协助者">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="mgTop24" type="flex" justify="center">
      <el-button size="small" type="primary">提交</el-button>
      <el-button size="small">取消</el-button>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "组织角色",
        url: this.$route.path
      },
      {
        name: "审批协助",
        url: this.$route.path
      }
    ]);
  }
};
</script>

