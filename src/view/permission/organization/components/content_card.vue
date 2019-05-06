<template>
  <el-card class="content-card">
    <div class="content-header">
      <span class="font-large">{{currentInfo && currentInfo.name}}</span>
      <el-button
        size="mini"
        v-if="currentInfo.hasOrganizationOperation||currentInfo.hasAllOperation"
        class="mgLeft20"
        @click="onEdit"
        type="primary"
      >编辑</el-button>
      <el-button v-else size="mini" class="mgLeft20" @click="onSee" type="primary">查看</el-button>
    </div>
    <div class="content-department">
      <div class="font-info mgBottom10">下级科室</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header">
          <el-button
            v-if="currentInfo.hasAllOperation"
            type="primary"
            size="mini"
            @click="showDepartment = true;"
          >添加子科室</el-button>
          <el-button
            v-if="currentInfo.hasAllOperation&& showBtnUnit"
            type="primary"
            size="mini"
            @click="showUnit = true"
          >添加子单位</el-button>
          <el-button size="mini" @click="saveGroupSort">保存排序</el-button>
        </div>
        <div ref="departmentList">
          <div
            :key="item.organizationGroupId"
            class="department-item"
            v-for="item in currentInfo.chlidOrganizationGroupList"
          >{{item.name}}</div>
        </div>
        <div
          class="empty-block"
          v-if="currentInfo.chlidOrganizationGroupList && currentInfo.chlidOrganizationGroupList.length == 0"
        >暂无记录</div>
      </el-card>
    </div>
    <div class="content-members">
      <div class="font-info mgTop20 mgBottom10">科室成员</div>
      <el-card :body-style="{'padding': '0 20px'}">
        <div slot="header" v-if="currentInfo.hasAllOperation">
          <el-form inline size="mini">
            <el-form-item label="姓名:">
              <el-input v-model="searchData.keyWord"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="loadMembers">查询</el-button>
            </el-form-item>
          </el-form>
          <el-button-group>
            <el-button size="mini" type="primary" @click="onAddMember">添加成员</el-button>
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
import { getOrganizationMembers, sortDepList } from "api/permission";
import modalMember from "../modals/member.vue";
import modalDepartment from "../modals/department.vue";
import modalUnit from "../modals/unit.vue";
import memberTable from "./member_table.vue";
import Sortable from "sortablejs";
export default {
  components: { memberTable, modalMember, modalDepartment, modalUnit },
  props: ["info"],
  watch: {
    info(val) {
      this.currentInfo = JSON.parse(val);
      this.currentInfo.chlidOrganizationGroupList.sort((a, b) => {
        return a.sort - b.sort;
      });
      console.log(this.currentInfo, "curren");

      this.loadMembers();
    }
  },
  mounted() {
    let self = this;
    new Sortable(this.$refs.departmentList, {
      onEnd({ newIndex, oldIndex }) {
        let list = self.currentInfo.chlidOrganizationGroupList;
        const currRow = list.splice(oldIndex, 1)[0];
        list.splice(newIndex, 0, currRow);
      }
    });
  },
  data() {
    return {
      searchData: {},
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
    saveGroupSort() {
      let list = this.currentInfo.chlidOrganizationGroupList;
      list.forEach((item, idx) => {
        item.sort = idx;
      });
      sortDepList({
        organizationGroupList: list
      }).then(e=>{
        this.$emit('update')
      })
    },
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
      getOrganizationMembers({
        organizationGroupIdList: params,
        keyWord: this.searchData.keyWord
      })
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
