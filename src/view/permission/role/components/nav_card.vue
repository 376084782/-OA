<template>
  <el-card class="nav-card">
    <el-input placeholder="请输入内容" v-model="searchValue">
      <i class="anticon icon-search"></i>
    </el-input>
    <el-button-group class="permission-btn-group">
      <router-link :to="{path: '/permission/organization'}">
        <el-button>组织架构</el-button>
      </router-link>
      <router-link :to="{path: '/permission/role'}">
        <el-button type="primary">角色权限</el-button>
      </router-link>
    </el-button-group>
    <el-button-group class="mgBottom10">
      <el-button @click="showGroup = true;">新增角色组</el-button>
      <el-button @click="showRole = true;">新增角色</el-button>
    </el-button-group>
    <el-tree
      :data="treeData"
      :load="loadNode" v-loading="bLoading"
      lazy :props="defaultProps"
      node-key="organizationRoleGroupId"
      @current-change="handleNodeClick"
      :expand-on-click-node="false">
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="!node.data.leaf">
          <el-button
            size="mini"
            @click="onEdit(node, data)">
            编辑
          </el-button>
        </span>
      </div>
    </el-tree>
    <modal-group v-model="showGroup" :info.sync="currentGroup"
      @edit="$emit('load')"></modal-group>
    <modal-role v-model="showRole" info=""
      :data="treeData"
      @edit="$emit('load')"></modal-role>
  </el-card>
</template>
<script>
import { getOrganizationRoleSubtree } from 'api/permission';
import modalGroup from '../modals/group.vue';
import modalRole from '../modals/role.vue';
export default {
  components: { modalGroup, modalRole },
  props: ['info', 'data'],
  data () {
    return {
      searchValue: '',
      showGroup: false,
      showRole: false,
      currentGroup: '',
      defaultProps: {
        children: 'organizationRoleGroupList',
        label: 'name',
        isLeaf: 'leaf'
      },
      defaultExpand: [],
      bLoading: false,
      treeData: this.data
    };
  },
  watch: {
    'data': {
      // immediate: true,
      handler (val) {
        this.treeData = val;
      }
    }
  },
  methods: {
    loadNode (node, resolve) {
      getOrganizationRoleSubtree({organizationRoleGroupId: node.data.organizationRoleGroupId}).then(data => {
        resolve(data.organizationRoleList.map(role => {
          role.leaf = true;
          return role;
        }));
      });
    },
    onEdit (node, data) {
      this.currentGroup = JSON.stringify(data);
      this.showGroup = true;
    },
    handleNodeClick (data) {
      if (data.leaf) {
        this.$emit('update:info', JSON.stringify(data));
      }
    }
  }
};
</script>
<style lang="scss">
.custom-tree-node {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.permission-btn-group {
  display: flex;
  margin: 20px 0;
  a {
    flex-grow: 1;
    .el-button {
      width: 100%;
    }
  }
  a:first-child {
    .el-button {
      border-radius: 4px 0 0 4px;
      border-right: 0;
    }
  }
  a:last-child {
    .el-button {
      border-radius: 0 4px 4px 0;
      border-left: 0;
    }
  }
}
.nav-card {
  width: 350px;
  min-height: 600px;
  flex: none;
}
</style>
