<template>
  <el-dialog title="选择关联公文" :visible.sync="visible" width="1160px" :before-close="handleClose">
    <modal-combine-search @search="onSearch"></modal-combine-search>
    <el-table :row-style="rowStyle" :data="dataSource">
      <el-table-column prop="flowCode" label="文号"></el-table-column>
      <el-table-column prop="flowTitle" label="标题"></el-table-column>
      <el-table-column label="紧急程度">
        <template slot-scope="scope">{{getJJCD(scope.row)}}</template>
      </el-table-column>
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="来文单位"></el-table-column>
      <el-table-column label="发文日期"></el-table-column>
      <el-table-column label="类型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="isHave(scope.row)" type="text" @click="toggleSel(scope.row,false)">取消选择</el-button>
          <el-button v-else type="text" @click="toggleSel(scope.row,true)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button size="small" @click="$emit('visible',false)">取消</el-button>
      <el-button size="small" type="primary" @click="changeSel">确认</el-button>
    </template>
  </el-dialog>
</template>
<script>
import modalCombineSearch from "./modalCombineSearch";
import { getListAll } from "api/document";
export default {
  components: { modalCombineSearch },
  props: ["visible"],
  computed: {},
  methods: {
    changeSel() {
      this.visible = false;
      this.$emit("changeSel", this.selectedList);
    },
    isHave(data) {
      return this.selectedList.some(item => {
        return item.value == data.processUserId;
      });
    },
    getJJCD(data) {
      let valueContent = JSON.parse(data.valueContent);
      let dataUrgency = valueContent.filter(item => {
        return item.code == "urgency";
      })[0];
      if (dataUrgency.value.indexOf("{") == -1) {
        return 0;
      }
      let valueConf = JSON.parse(dataUrgency.value);
      let value = valueConf.name;
      return value;
    },
    loadData() {
      this.bLoading = true;
      this.searchParams.dateFormat = "%Y-%m-%d";
      this.searchParams.pageSize = 20;
      this.searchParams.modelTypeList = [100];
      getListAll(this.searchParams)
        .then(({ tableResponse }) => {
          this.dataSource = tableResponse.list;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    onSearch(params) {
      Object.assign(this.searchParams, params, { pageNo: 1 });
      this.loadData();
    },
    rowStyle(scope, index) {
      if (this.selectedList.indexOf(scope.row.id) > -1) {
        return {
          "background-color": "rgba(75, 159, 253, .24)"
        };
      }
      return {};
    },
    toggleSel(data, flag) {
      let conf = {
        name: data.flowTitle,
        value: data.processUserId
      };
      let index = -1;
      this.selectedList.forEach((item, i) => {
        if (item.value == conf.value) {
          index = i;
        }
      });
      if (flag) {
        if (index == -1) {
          // 如果没有选中过，添加到已选中
          this.selectedList.push(conf);
        }
      } else {
        if (index > -1) {
          // 如果已经选中，从选中列表中删除
          this.selectedList.splice(index, 1);
        }
      }
    },
    searchHandler() {},
    handleClose() {
      this.$emit("update:visible", false);
    }
  },
  mounted() {
    this.onSearch();
  },
  data() {
    return {
      selectedList: [],
      list: [{ id: 1 }],
      searchParams: {},
      dataSource: []
    };
  }
};
</script>

