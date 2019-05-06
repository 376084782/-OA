<template>
  <el-card class="mgTop24">
    <el-form size="small" inline>
      <el-form-item label="标题：">
        <el-input v-model="searchForm.flowTitle"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态：">
        <el-input></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table class="mgTop24" :data="list">
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column prop="flowTitle" label="标题"></el-table-column>
      <el-table-column prop="modelTypeDictionary" label="状态"></el-table-column>
      <el-table-column label="来文单位">
        <template slot-scope="scope">{{scope.row.valueContent['mainGroupList']}}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{scope.row.valueContent['type']}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="showFormDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="oPagination.total"
      :currentPage="oPagination.pageNo"
      :size="oPagination.pageSize"
      @onPageChange="onPageChange"
    ></pagination>
  </el-card>
</template>
<script>
import { formatValueContentToList } from "utils/assist";
import { getListAll } from "api/document";
export default {
  data() {
    return {
      searchForm: {},
      list: [{}],
      oPagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "公文管理",
        url: this.$route.path
      },
      {
        name: "查阅公文",
        url: this.$route.path
      }
    ]);
    this.getData();
  },
  methods: {
    onPageChange() {
      this.oPagination.pageNo++;
      this.getData();
    },
    showFormDetail(data) {
      let routeData = {
        name: "查看",
        url: "/document/seeAssign/do",
        query: {
          processUserId: data.processUserId,
          processUserDetailId: data.detailId,
          title: "查看公文"
        }
      };
      this.$store.dispatch("addBreadCurmbList", routeData);
      this.$router.push({
        path: routeData.url,
        query: routeData.query
      });
    },
    onSearch() {
      this.oPagination.pageNo = 1;
      this.getData();
    },
    getData() {
      let data = {
        modelTypeList: [100],
        pageSize: this.oPagination.pageSize,
        pageNo: this.oPagination.pageNo
      };
      Object.assign(data, this.searchForm);
      getListAll(data).then(({ tableResponse }) => {
        let { list } = tableResponse;
        this.list = list;
        this.list.forEach(item => {
          item.valueContent = formatValueContentToList(item.valueContent);
        });
      });
    }
  }
};
</script>

