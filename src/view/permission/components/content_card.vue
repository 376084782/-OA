<template>
  <el-card class="content-card">
    <div class="content-header">
      <span class="font-large">{{currentInfo && currentInfo.name}}</span>
      <el-button size="small" class="mgLeft20">编辑</el-button>
    </div>
    <div class="content-department">
      <div class="font-info mgBottom10">下级部门</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header">
          <el-button-group>
            <el-button size="small" @click="showDepartment = true;">添加子部门</el-button>
            <el-button size="small">调整排序</el-button>
          </el-button-group>
        </div>
        <el-collapse v-model="activeDepartment">
          <el-collapse-item :title="item.name" :name="item.name"
            v-for="item in currentInfo.chlidOrganizationGroupList" :key="item.organizationId">
            <div>部门简介：{{item.description | noDesc}}</div>
            <el-button-group class="mgTop10">
              <el-button size="mini" type="primary"
                @click="showDepartment = true; currentDepartment = item.organizationId">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </el-button-group>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <div class="content-members">
      <div class="font-info mgTop20 mgBottom10">部门成员</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header">
          <el-button-group>
            <el-button size="small" @click="showMember = true;">添加成员</el-button>
            <el-button size="small">批量导入导出</el-button>
          </el-button-group>
        </div>
        <member-table :data="membersList"
          v-loading="bloading" @edit="onEditMember"></member-table>
      </el-card>
    </div>
    <modal-member v-model="showMember" :id.sync="currentMember"></modal-member>
    <modal-department v-model="showDepartment" :id.sync="currentDepartment"></modal-department>
  </el-card>
</template>
<script>
import { getDepartmentMembers } from "api/permission";
import modalMember from "../modals/member.vue";
import modalDepartment from "../modals/department.vue";
import memberTable from "./member_table.vue";
export default {
  components: {memberTable, modalMember, modalDepartment},
  props: ['value', 'info'],
  watch: {
    info (val) {
      this.currentInfo = JSON.parse(val);
      /* do request */
      this.bloading = true;
      getDepartmentMembers({}).then(data => {
        this.membersList = data.organizationGroupList;
      }).finally(() => {
        this.bloading = false;
      });
    }
  },
  data () {
    return {
      bloading: false,
      showMember: false,
      currentMember: '',
      showDepartment: false,
      currentDepartment: '',
      currentInfo: {},
      activeDepartment: [],
      membersList: []
    };
  },
  methods: {
    onEditMember (item) {
      this.currentMember = item.organizationId;
      this.showMember = true;
    }
  }
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
</style>
