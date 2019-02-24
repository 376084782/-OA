<template>
  <div>
    <el-card class="mgTop24">
      <el-button type="primary" @click="addHandler" size="small">新增文号</el-button>
      <section class="mgTop24">
        <el-table v-loading="bLoading" :data="dataSource" >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="groupName" label="收发类型"></el-table-column>
          <el-table-column prop="code" label="公文类型"></el-table-column>
          <el-table-column prop="codeValue" label="编号定义"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showModalEdit(scope.row)" type="text">编辑</el-button>
              <i class="grey">|</i>
              <el-button @click="delHanler(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <pagination
          :total="oPagination.total"
          :currentPage="oPagination.pageNo"
          :size="oPagination.pageSize"
          @onPageChange="onPageChange"
        ></pagination> -->
      </section>
    </el-card>
    <modal-detail @success="loadData" :id="selId" :visible.sync="showDetail"></modal-detail>
  </div>
</template>
<script>
import modalDetail from "./components/modalDetail";
import { getProcessCodeList,delProcessCode } from "api/document";
export default {
  components: { modalDetail },
  data() {
    return {
      selId: undefined,
      oPagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      showDetail: false,
      bLoading: false,
      dataSource: [{}],
      listDone: [{}, {}, {}],
      listNotDone: [],
      searchParams: {}
    };
  },
  watch: {},
  mounted() {
    this.onSearch();
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
    // 翻页
    onPageChange(page) {
      Object.assign(this.searchParams, { pageNo: page });
      this.loadData();
    },
    loadData() {
      this.bLoading = true;
      Object.assign(this.searchParams, {
        processGroupCodeList: ["document-send-code", "ducument-receive-code"]
      });
      getProcessCodeList(this.searchParams)
        .then(({ processCodeList }) => {
          this.dataSource = processCodeList;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    onSearch(params) {
      Object.assign(this.searchParams, params, { pageNo: 1 });
      this.loadData();
    },
    delHanler(data) {
      delProcessCode({
        processCodeId: data.processCodeId

      }).then(e=>{
        this.$alert('删除成功');
        this.loadData()
      })
    },
    showModalEdit(data) {
      this.selId = data.processCodeId;
      this.showDetail = true;
    },
    addHandler() {
      this.selId = undefined;
      this.showDetail = true;
    }
  }
};
</script>

