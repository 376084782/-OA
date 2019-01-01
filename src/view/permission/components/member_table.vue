<template>
  <section>
    <el-table :data="dataSource" style="min-height: 400px">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="" label="职位"></el-table-column>
      <el-table-column prop="" label="工号"></el-table-column>
      <el-table-column prop="" label="手机号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
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
    onEdit (item) {
      this.$emit('edit', item);
    }
  }
};
</script>

