<template>
  <section>
    <el-tabs style="margin-top: -16px;" class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="待办任务" name="-1"></el-tab-pane>
      <el-tab-pane label="已办任务" name="1"></el-tab-pane>
      <el-tab-pane label="我发起的" name="2"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <el-button v-if="activeName=='2'" @click="createTask" class="mgTop20" type="primary" size="small">发起任务</el-button>
      <section class="mgTop24" style="overflow:scroll;">
        <tree-table ref="tree" :active-name="activeName" @addSubTask="addSubTask"></tree-table>
      </section>
    </el-card>
    <modal-add @success="onSearch" :id="selectedProcessUserDetailId" :show.sync="showAdd"></modal-add>
  </section>
</template>
<script>
import modalAdd from "./components/modalAdd.vue";
import listSearch from "./components/search";
import { getClubList } from "api/index";
import treeTable from "./components/tree-table.vue";
export default {
  components: { listSearch, treeTable, modalAdd },
  data() {
    return {
      selectedProcessUserDetailId: 0,
      showAdd: false,
      expandList: [],
      activeName: "1",
      bLoading: false,
      searchParams: {},
      dataSource: [],
      listDone: [{}, {}, {}],
      listNotDone: [{}],
      oPagination: {}
    };
  },
  watch: {
    activeName(val) {
      this.$refs.tree && this.$refs.tree.update();
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeNav || "-1";
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "任务管理",
        url: this.$route.path
      },
      {
        name: "任务中心",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    addSubTask(data) {
      this.selectedProcessUserDetailId = data.detailId;
      this.showAdd = true;
    },
    createTask() {
      let routeData = {
        name: "发起",
        url: "/document/sponse/do",
        query: {
          modelType: 201,
          permitButton: 1,
          title: "发起任务"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });
    },
    showFormDetail(data) {
      let routeData = {
        name: "发起公文",
        url: `/document/seeTaskDone${this.activeName == "1" ? "1" : ""}/do`,
        query: {
          data,
          title: "查看任务"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });

      this.$router.push({});
    },
    // 搜索
    onSearch(params) {
      Object.assign(this.searchParams, params, { pageIndex: 1 });
      this.$refs.tree && this.$refs.tree.update(this.searchParams);
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

