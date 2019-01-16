<template>
  <div>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="文号"></el-table-column>
          <el-table-column prop="region" label="标题"></el-table-column>
          <el-table-column prop="numid" label="紧急程度"></el-table-column>
          <el-table-column prop="recharge" label="状态"></el-table-column>
          <el-table-column prop="usercnt" label="发文单位"></el-table-column>
          <el-table-column prop="recharge" label="限办日期"></el-table-column>
          <el-table-column prop="recharge" label="类型"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="scope.$index%3==0">
                <el-button @click="$router.push('/document/assign/do')" type="text">分派</el-button>
              </template>
              <template v-else-if="scope.$index%3==1">
                <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
              </template>
              <template v-else-if="scope.$index%3==2">
                <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
                <i class="grey">|</i>
                <el-button @click="showReceiveDetail(scope.row)" type="text">接收情况</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
    <modal-detail :visible.sync="showDetail"></modal-detail>
  </div>
</template>
<script>
import listSearch from "./components/search";
import modalDetail from "./components/modalDetail";
export default {
  components: { listSearch, modalDetail },
  data() {
    return {
      showDetail: false,
      bLoading: false,
      dataSource: [{}],
      listDone: [{}, {}, {}],
      listNotDone: []
    };
  },
  watch: {
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "公文管理",
        url: this.$route.path
      },
      {
        name: "公文办理",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    onSearch(params) {},
    showReceiveDetail(data) {
      this.showDetail = true;
    },
    showFormDetail(data) {
      this.$router.push({
        path: "/document/seeAssign/do",
        query: {
          id: data.id
        }
      });
    }
  }
};
</script>

