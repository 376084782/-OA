<template>
  <div>
    <el-tabs class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="待办任务" name="-1"></el-tab-pane>
      <el-tab-pane label="已办任务" name="1"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="编号"></el-table-column>
          <el-table-column prop="region" label="标题"></el-table-column>
          <el-table-column prop="numid" label="紧急程度"></el-table-column>
          <el-table-column prop="usercnt" label="来文单位"></el-table-column>
          <el-table-column prop="recharge" label="类型"></el-table-column>
          <el-table-column prop="recharge" label="状态"></el-table-column>
          <el-table-column prop="recharge" label="限办日期"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="scope.$index%3==0">
                <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
              </template>
              <template v-else-if="scope.$index%3==1">
                <el-button @click="doFormDetail(scope.row)" type="text">办理</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </div>
</template>
<script>
import listSearch from "./components/search";
export default {
  components: { listSearch },
  data() {
    return {
      activeName: "1",
      bLoading: false,
      dataSource: [{}],
      listDone: [{}, {}, {}],
      listNotDone: []
    };
  },
  watch: {
    activeName(val) {
      this.dataSource = val == "1" ? this.listDone : this.listNotDone;
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeNav || "-1";
  },
  methods: {
    onSearch(params) {},
    showFormDetail(data) {
      this.$router.push({
        path: "/document/seeDone/do",
        query: {
          id: data.id
        }
      });
    },
    doFormDetail(data) {
      this.$router.push({
        path: "/document/done/do",
        query: {
          id: data.id
        }
      });
    }
  }
};
</script>

