<template>
  <section>
    <el-table :data="dataSource" style="min-height: 400px">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="position" label="职务">
        <template slot-scope="scope">{{scope.row.position | noData}}</template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号">
        <template slot-scope="scope">{{scope.row.mobile | noData}}</template>
      </el-table-column>
      <el-table-column prop="telphone" label="座机">
        <template slot-scope="scope">{{scope.row.telphone | noData}}</template>
      </el-table-column>
      <el-table-column prop="email" label="电子邮箱">
        <template slot-scope="scope">{{scope.row.email | noData}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" @click="onEdit(scope.row, 'watch')">查看</el-button>
          <el-button type="text" @click="onEdit(scope.row, '')">编辑</el-button>
          <el-button type="text" @click="onBan(scope.row)">
            {{scope.row.statusDictionary == '有效' ? '停用' : '启用'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
import { userOperate } from 'api/permission';
export default {
  props: {
    data: Array
  },
  data () {
    return {
      dataSource: this.data
    };
  },
  watch: {
    data (val) {
      this.dataSource = val;
    }
  },
  methods: {
    onEdit (item, type) {
      this.$emit('edit', item, type);
    },
    onBan (scope) {
      let curType = scope.statusDictionary == '有效' ? 'stop' : 'start';
      this.$confirm(`<div style="font-weight: 600;">确定要${scope.statusDictionary == '有效' ? '停用' : '启用'}该账户吗?</div>
                      <div>
                       ${scope.statusDictionary == '有效' ? '确定停用该账户？停用后账户不可使用。' : '启用该账户后可登录系统，确定启用该账户吗？'}
                      </div>`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        userOperate({userId: scope.userId}, curType).then(data => {
          this.$emit('load');
        });
      });
    }
  }
};
</script>

