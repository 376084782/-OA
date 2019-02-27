<template>
  <el-card class="content-card">
    <div class="content-header">
      <span class="font-large">{{currentInfo && currentInfo.name}}</span>
      <el-button size="small" class="mgLeft20" @click="onEdit">编辑</el-button>
    </div>
    <div class="content-department">
      <div class="font-info mgBottom10">下级部门</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header">
          <el-button size="small" @click="showDepartment = true;">添加子部门</el-button>
        </div>
        <div :key="item.organizationGroupId" class="department-item"
          v-for="item in currentInfo.chlidOrganizationGroupList">
          {{item.name}}
        </div>
        <div class="empty-block"
          v-if="currentInfo.chlidOrganizationGroupList && currentInfo.chlidOrganizationGroupList.length == 0">暂无记录</div>
      </el-card>
    </div>
    <div class="content-members">
      <div class="font-info mgTop20 mgBottom10">部门成员</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header">
          <el-button-group>
            <el-button size="small" @click="showMember = true;">添加成员</el-button>
            <!-- <el-button size="small">批量导入导出</el-button> -->
          </el-button-group>
        </div>
        <member-table :data="membersList"
          v-loading="bloading"
          @edit="onEditMember"
          @load="loadMembers"></member-table>
      </el-card>
    </div>
    <modal-member v-model="showMember"
      :id="currentInfo && currentInfo.organizationGroupId"
      :userId.sync="currentMember" :type.sync="memberType"
      @success="loadMembers"></modal-member>
    <modal-department v-model="showDepartment" v-if="showDepartment"
      :id="currentInfo && currentInfo.organizationGroupId"
      :type.sync="modalType"
      @success="onSuccess"></modal-department>
  </el-card>
</template>
<script>
import { getOrganizationMembers } from "api/permission";
import modalMember from "../modals/member.vue";
import modalDepartment from "../modals/department.vue";
import memberTable from "./member_table.vue";
export default {
  components: {memberTable, modalMember, modalDepartment},
  props: ['info'],
  watch: {
    info (val) {
      this.currentInfo = JSON.parse(val);
      this.loadMembers();
    }
  },
  data () {
    return {
      bloading: false,
      showMember: false,
      currentMember: '',
      showDepartment: false,
      modalType: 'add',
      memberType: '',
      currentInfo: {},
      membersList: []
    };
  },
  methods: {
    onSuccess () {
      this.$emit('success', this.currentInfo.organizationGroupId);
    },
    loadMembers () {
      /* do request */
      this.bloading = true;
      let params = [this.currentInfo.organizationGroupId];
      getOrganizationMembers({organizationGroupIdList: params}).then(data => {
        this.membersList = data.userList;
      }).finally(() => {
        this.bloading = false;
      });
    },
    onEdit () {
      this.modalType = 'edit';
      this.showDepartment = true;
    },
    onEditMember (item, type) {
      this.memberType = type;
      this.currentMember = item.userId;
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
