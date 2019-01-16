<template>
  <div>
    <el-card class="mgTop24">
      <el-button type="primary" @click="addHandler" size="small">新增文号</el-button>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="序号"></el-table-column>
          <el-table-column prop="region" label="收发类型"></el-table-column>
          <el-table-column prop="numid" label="公文类型"></el-table-column>
          <el-table-column prop="recharge" label="编号定义"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showModalEdit(scope.row)" type="text">编辑</el-button>
              <i class="grey">|</i>
              <el-button @click="delHanler(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
    <modal-detail :visible.sync="showDetail"></modal-detail>
  </div>
</template>
<script>
import modalDetail from "./components/modalDetail";
export default {
  components: { modalDetail },
  data() {
    return {
      showDetail: false,
      bLoading: false,
      dataSource: [{}],
      listDone: [{}, {}, {}],
      listNotDone: []
    };
  },
  watch: {},
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "公文管理",
        url: this.$route.path
      },
      {
        name: "文号管理",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    onSearch(params) {},
    delHanler(data) {
      this.showDetail = true;
    },
    showModalEdit(data) {
      this.showDetail = true;
    },
    addHandler() {
      this.showDetail = true;
    }
  }
};
</script>

