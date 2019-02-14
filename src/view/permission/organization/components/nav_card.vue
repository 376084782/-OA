<template>
  <el-card class="nav-card">
    <el-button-group class="permission-btn-group">
      <router-link :to="{path: '/permission/organization'}">
        <el-button type="primary">组织架构</el-button>
      </router-link>
      <router-link :to="{path: '/permission/role'}">
        <el-button>角色权限</el-button>
      </router-link>
    </el-button-group>
    <el-tree :data="treeData" :props="defaultProps" v-loading="bLoading"
      node-key="organizationGroupId" :default-expanded-keys="defaultExpand"
      @current-change="handleNodeClick"></el-tree>
  </el-card>
</template>
<script>
export default {
  props: ['info', 'data', 'defaultExpand'],
  data () {
    return {
      searchValue: '',
      defaultProps: {
        children: 'chlidOrganizationGroupList',
        label: 'name'
      },
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
    handleNodeClick (data) {
      this.$emit('update:info', JSON.stringify(data));
    }
  }
};
</script>
<style lang="scss">
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
