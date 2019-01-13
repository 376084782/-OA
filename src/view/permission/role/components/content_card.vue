<template>
  <el-card class="content-card">
    <div class="empty-block" v-if="!info">请先选择角色</div>
    <template v-else>
      <div class="content-header">
        <span class="font-large">{{currentInfo && currentInfo.name}}</span>
        <el-button size="small" class="mgLeft20" @click="showRole = true;">编辑</el-button>
      </div>
      <el-row>
        <el-col :span="3">
          <div class="font-info" style="line-height: 2">角色：</div>
        </el-col>
        <el-col :span="20">{{currentInfo && currentInfo.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <div class="font-info" style="line-height: 2">角色描述：</div>
        </el-col>
        <el-col :span="20">{{currentInfo && currentInfo.description || '暂无'}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <div class="font-info" style="line-height: 2">权限：</div>
        </el-col>
        <el-col :span="20">
          <el-tree v-loading="bloading"
          :data="treeData"
          :props="defaultProps"
          node-key="resourceId"
          default-expand-all>
          </el-tree>
        </el-col>
      </el-row>
    </template>
    <modal-role v-model="showRole" :info="info"
      :data="data"
      @edit="$emit('load')"></modal-role>
  </el-card>
</template>
<script>
import { getPermissionInfo } from 'api/permission';
import modalRole from '../modals/role.vue';
export default {
  components: { modalRole },
  props: ['info', 'data'],
  watch: {
    info (val) {
      this.currentInfo = JSON.parse(val);
      if (val) {
        this.bloading = true;
        getPermissionInfo({roleId: this.currentInfo.organizationRoleId}).then(data => {
          this.treeData = data.chlidren;
        }).finally(() => {this.bloading = false;});
      }
    }
  },
  data () {
    return {
      bloading: false,
      showRole: false,
      currentInfo: {},
      treeData: [],
      defaultProps: {
        children: 'chlidren',
        label: 'name'
      },
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.content-card {
  flex-grow: 1;
  margin-left: 20px;
  .content-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.department-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.empty-block {
  text-align: center;
  height: 50px;
  color: #999;
  line-height: 50px;
}
</style>
