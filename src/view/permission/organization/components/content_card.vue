<template>
  <el-card class="content-card">
    <div class="content-header">
      <span class="font-large">{{currentInfo && currentInfo.name}}</span>
      <el-button
        size="small"
        v-if="currentInfo.hasOrganizationOperation||currentInfo.hasAllOperation"
        class="mgLeft20"
        @click="onEdit"
      >编辑</el-button>
      <el-button v-else size="small" class="mgLeft20" @click="onSee">查看</el-button>
    </div>
    <div class="content-department">
      <div class="font-info mgBottom10">下级部门</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header">
          <el-button
            v-if="currentInfo.hasAllOperation"
            type="primary"
            size="small"
            @click="showDepartment = true;"
          >添加子部门</el-button>
          <el-button
            v-if="currentInfo.hasAllOperation&& showBtnUnit"
            type="primary"
            size="small"
            @click="showUnit = true"
          >添加子单位</el-button>
        </div>
        <div
          :key="item.organizationGroupId"
          class="department-item"
          v-for="item in currentInfo.chlidOrganizationGroupList"
        >{{item.name}}</div>
        <div
          class="empty-block"
          v-if="currentInfo.chlidOrganizationGroupList && currentInfo.chlidOrganizationGroupList.length == 0"
        >暂无记录</div>
      </el-card>
    </div>
    <div class="content-members">
      <div class="font-info mgTop20 mgBottom10">部门成员</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header" v-if="currentInfo.hasAllOperation">
          <el-button-group>
            <el-button size="small" @click="onAddMember">添加成员</el-button>
            <!-- <el-button size="small">批量导入导出</el-button> -->
          </el-button-group>
        </div>
        <member-table
          :data="membersList"
          v-loading="bloading"
          @edit="onEditMember"
          @load="loadMembers"
          :hasAccess="currentInfo.hasAllOperation"
        ></member-table>
      </el-card>
    </div>
    <modal-member
      v-model="showMember"
      :id="currentInfo && currentInfo.organizationGroupId"
      :userId.sync="currentMember"
      :type.sync="memberType"
      :org-type="currentInfo.type"
      @success="loadMembers"
      :leader-id="currentInfo.manageUserId"
    ></modal-member>
    <modal-department
      v-model="showDepartment"
      v-if="showDepartment"
      :id="currentInfo && currentInfo.organizationGroupId"
      :type.sync="modalType"
      @success="onSuccess"
      :leader-id="currentInfo.manageUserId"
    ></modal-department>
    <modal-unit
      v-model="showUnit"
      v-if="showUnit"
      :id="currentInfo && currentInfo.organizationGroupId"
      :type.sync="modalType"
      @success="onSuccess"
      :leader-id="currentInfo.manageUserId"
    ></modal-unit>
  </el-card>
</template>
<script>
import { getOrganizationMembers } from "api/permission";
import modalMember from "../modals/member.vue";
import modalDepartment from "../modals/department.vue";
import modalUnit from "../modals/unit.vue";
import memberTable from "./member_table.vue";
export default {
  components: { memberTable, modalMember, modalDepartment, modalUnit },
  props: ["info"],
  watch: {
    info(val) {
      this.currentInfo = JSON.parse(val);
      console.log(this.currentInfo, "curren");
      this.loadMembers();
    }
  },
  data() {
    return {
      selLeaderId: null,
      showUnit: false,
      bloading: false,
      showMember: false,
      currentMember: "",
      showDepartment: false,
      modalType: "add",
      memberType: "",
      currentInfo: {},
      membersList: []
    };
  },
  computed: {
    showBtnUnit() {
      if (this.currentInfo) {
        return this.currentInfo.type == 1;
      }
      return false;
    }
  },
  methods: {
    onAddMember() {
      this.showMember = true;
    },
    onSuccess() {
      this.$emit("success", this.currentInfo.organizationGroupId);
    },
    loadMembers() {
      /* do request */
      this.bloading = true;
      let params = [this.currentInfo.organizationGroupId];
      getOrganizationMembers({ organizationGroupIdList: params })
        .then(data => {
          this.membersList = data.userList;
        })
        .finally(() => {
          this.bloading = false;
        });
    },
    onEdit() {
      this.modalType = "edit";

      if (this.currentInfo.type == 2) {
        this.showDepartment = true;
      } else if (this.currentInfo.type == 1) {
        this.showUnit = true;
      }
    },
    onSee() {
      console.log(this.currentInfo, "currentinfo");
      this.modalType = "see";
      if (this.currentInfo.type == 2) {
        this.showDepartment = true;
      } else if (this.currentInfo.type == 1) {
        this.showUnit = true;
      }
    },
    onEditMember(item, type) {
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
