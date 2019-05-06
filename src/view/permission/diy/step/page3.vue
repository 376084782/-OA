<template>
  <div style="width:500px;margin:0 auto;margin-top:20px;">
    <el-form size="mini">
      <el-form-item label="默认审批流程">
        <br>
        <div style="width:100%">
          <el-row type="flex">
            <span class="font-grey mgRight20">默认审批人</span>
            <dym-select-next-user-list :conf="{}"></dym-select-next-user-list>
          </el-row>
          <el-row type="flex" class="mgTop10">
            <span class="font-grey mgRight20">默认抄送人</span>
            <dym-select-next-user-list :conf="{}"></dym-select-next-user-list>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="审批人去重">
        <el-select style="width:100%" v-model="data.name"></el-select>
      </el-form-item>
      <el-form-item label="通知抄送人">
        <el-select style="width:100%" v-model="data.name"></el-select>
      </el-form-item>
      <el-form-item label="审批意见填写提示">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="审批意见">
        <br>
        <el-checkbox-group>
          <el-checkbox>必填</el-checkbox>
          <el-checkbox>对发起人不可见</el-checkbox>
          <el-checkbox>允许代他人提交</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-row class="mgTop20">
      <el-button type="primary" size="mini">发布</el-button>
      <el-button size="mini" @click="$emit('pre')">上一步</el-button>
      <el-button size="mini">取消</el-button>
    </el-row>
  </div>
</template>
<script>
import dymSelectNextUserList from "components/dym-components/dym-select-next-user-list";
export default {
  components: { dymSelectNextUserList },
  props: ["data"],
  data() {
    return {};
  }
};
</script>

