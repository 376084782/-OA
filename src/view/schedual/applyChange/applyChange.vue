<template>
  <section>
    <el-tabs class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="我发起的" name="1"></el-tab-pane>
      <el-tab-pane label="待办任务" name="2"></el-tab-pane>
      <el-tab-pane label="已办任务" name="3"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <el-row class="bottom-row mgTop24">
        <el-button type="primary" size="small" @click="showFormDo()">申请调班</el-button>
      </el-row>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" style="min-height: 400px">
          <el-table-column prop label="序号"></el-table-column>
          <el-table-column prop="region" label="标题"></el-table-column>
          <el-table-column prop="numid" label="排班时间"></el-table-column>
          <el-table-column prop="usercnt" label="发起申请人"></el-table-column>
          <el-table-column prop="consume" label="发起部门"></el-table-column>
          <el-table-column prop="recharge" label="排班当前状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
              <i class="grey">|</i>
              <el-button @click="showFormDetail(scope.row)" type="text">办理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </section>
</template>
<script>
import listSearch from "./components/search";
import { scedualSearch } from "api/index";
import { dateFormater } from "utils/assist.js";
export default {
  components: { listSearch },
  data() {
    return {
      activeName: "1",
      dataSource: [],
      dataMap: {
        1: [{}],
        2: [{}, {}],
        3: [{}, {}, {}]
      },
      searchParams: {},
      bLoading: false
    };
  },
  watch: {
    activeName(val) {
      this.dataSource = this.dataMap[val];
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeNav || 1;
  },
  methods: {
    // 请求数据函数
    loadData() {
      this.bLoading = true;
      scedualSearch(this.searchParams)
        .then(({ workPlanDateInfoList }) => {})
        .finally(() => {
          this.bLoading = false;
        });
    },
    showFormDetail(data) {
      this.$router.push({
        path: "/document/seeSchedualChange/do",
        query: {
          id: data.id
        }
      });
    },
    showFormDo() {
      this.$router.push({
        path: "/document/schedualChange/do"
      });
    },
    // 搜索
    onSearch(params) {
      Object.assign(this.searchParams, params);
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

