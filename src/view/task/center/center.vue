<template>
  <section>
    <el-tabs class="top-sec-tab" v-model="activeName">
      <el-tab-pane label="待办任务" name="-1"></el-tab-pane>
      <el-tab-pane label="已办任务" name="1"></el-tab-pane>
    </el-tabs>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <el-button class="mgTop10" type="primary" size="small">发起任务</el-button>
      <section class="mgTop24">
        <el-table
          :cell-class-name="cellClass"
          :row-key="getRowKeys"
          ref="table"
          class="table-task no-expand"
          v-loading="bLoading"
          :data="dataSource"
          style="min-height: 400px"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table
                :cell-class-name="cellClass"
                :data="scope.row.subList"
                row-class-name="subCol1"
                ref="subTab1"
                class="no-expand"
              >
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-table
                      :cell-class-name="cellClass"
                      :data="scope.row.subList"
                      row-class-name="subCol2"
                      class="no-expand"
                    >
                      <el-table-column type="expand"></el-table-column>
                      <el-table-column prop label="序号"></el-table-column>
                      <el-table-column prop="name" label="任务名称" width="400px"></el-table-column>
                      <el-table-column prop="usercnt" label="级别"></el-table-column>
                      <el-table-column prop="consume" label="执行人"></el-table-column>
                      <el-table-column prop="consume" label="发起人"></el-table-column>
                      <el-table-column prop="recharge" label="状态">
                        <template slot-scope="scope">
                          <span class="circle-before danger">{{scope.row.status}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="recharge" label="进度"></el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column prop label="序号"></el-table-column>
                <el-table-column prop="name" label="任务名称" width="400px">
                  <template slot-scope="scope">
                    <div class="icon-expand" @click="expandTable(scope,'subTab1')" type="text">
                      <i :class="expandIcon(scope)"></i>
                    </div>
                    {{scope.row.name}}
                  </template>
                </el-table-column>
                <el-table-column prop="usercnt" label="级别"></el-table-column>
                <el-table-column prop="consume" label="执行人"></el-table-column>
                <el-table-column prop="consume" label="发起人"></el-table-column>
                <el-table-column prop="recharge" label="状态">
                  <template slot-scope="scope">
                    <span class="circle-before danger">{{scope.row.status}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="recharge" label="进度"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop label="序号"></el-table-column>
          <el-table-column label="任务名称" width="400px">
            <template slot-scope="scope">
              <div class="icon-expand" @click="expandTable(scope,'table')" type="text">
                <i :class="expandIcon(scope)"></i>
              </div>
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column prop="usercnt" label="级别"></el-table-column>
          <el-table-column prop="consume" label="执行人"></el-table-column>
          <el-table-column prop="consume" label="发起人"></el-table-column>
          <el-table-column prop="recharge" label="状态">
            <template slot-scope="scope">
              <span class="circle-before danger">{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="recharge" label="进度"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showFormDetail(scope.row)" type="text">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </section>
</template>
<script>
import listSearch from "./components/search";

import { getClubList } from "api/index";
export default {
  components: { listSearch },
  data() {
    return {
      expandList: [],
      activeName: "1",
      bLoading: false,
      searchParams: {},
      dataSource: [
        {
          id: 0,
          name: "222",
          subList: [
            {
              name: "33",
              id: 1,
              subList: [
                {
                  id: 3,
                  name: "444"
                }
              ]
            }
          ]
        }
      ],
      listDone: [{}, {}, {}],
      listNotDone: [{}],
      oPagination: {}
    };
  },
  watch: {
    activeName(val) {
      // this.dataSource = val == "1" ? this.listDone : this.listNotDone;
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
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 5) {
        return "table-cell-grey1";
      } else if(columnIndex==7){
        return 'table-cell-grey2'
      } else if(columnIndex==6){
        // 状态，判断颜色
        return 'font-danger'
      }
    },
    expandIcon(scope) {
      if (this.expandList.indexOf(scope.row.id) == -1) {
        return "el-icon-plus";
      } else {
        return "el-icon-minus";
      }
    },
    getRowKeys(row) {
      return row.id;
    },
    expandTable(scope, tableRef) {
      let index = this.expandList.indexOf(scope.row.id);
      let flag = index == -1;
      if (flag) {
        this.expandList.push(scope.row.id);
      } else {
        this.expandList.splice(index, 1);
      }
      this.$refs[tableRef].toggleRowExpansion(scope.row, flag);
    },
    showFormDetail(data) {
      this.$router.push({
        path: `/document/seeTaskDone${this.activeName == "1" ? "1" : ""}/do`,
        query: {
          data
        }
      });
    },
    // 请求数据函数
    loadData() {
      this.bLoading = true;
      console.log("in");
      getClubList({})
        .then(data => {
          // this.dataSource = data.list;
          // this.oPagination = data.page;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    // 搜索
    onSearch(params) {
      Object.assign(this.searchParams, params, { page: 1 });
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  }
};
</script>

