<template>
  <el-dialog title="选择关联公文" :visible="visible" width="1160px" @update:visible="toggle">
    <modal-combine-search @search="onSearch"></modal-combine-search>
    <el-table class="mgTop24" :row-style="rowStyle" :data="dataSource">
      <el-table-column prop="flowCode" label="文号"></el-table-column>
      <el-table-column prop="flowTitle" label="标题"></el-table-column>
      <el-table-column label="紧急程度">
        <template slot-scope="scope">{{scope.row.valueContent['urgency']}}</template>
      </el-table-column>
      <el-table-column prop="modelTypeDictionary" label="状态"></el-table-column>
      <el-table-column label="来文单位">
        <template slot-scope="scope">{{scope.row.valueContent['mainGroupList']}}</template>
      </el-table-column>
      <el-table-column label="发文日期">
        <template slot-scope="scope">{{scope.row.valueContent['sendGroup']}}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{scope.row.valueContent['type']}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="isHave(scope.row)" type="text" @click="toggleSel(scope.row,false)">取消选择</el-button>
          <el-button v-else type="text" @click="toggleSel(scope.row,true)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button size="small" @click="toggle(false)">取消</el-button>
      <el-button size="small" type="primary" @click="changeSel">确认</el-button>
    </template>
  </el-dialog>
</template>
<script>
import modalCombineSearch from "./modalCombineSearch";
import { getListAll } from "api/document";

import { formatValueContentToList } from "utils/assist";
import { defaultCoreCipherList } from "constants";
export default {
  components: { modalCombineSearch },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    defaultList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  methods: {
    changeSel() {
      this.toggle(false);
      this.$emit("changeSel", this.selectedList);
    },
    isHave(data) {
      return this.selectedList.some(item => {
        return item.value == data.processUserId;
      });
    },
    loadData() {
      this.bLoading = true;
      this.searchParams.dateFormat = "%Y-%m-%d";
      this.searchParams.pageSize = 20;
      this.searchParams.modelTypeList = [100];
      getListAll(this.searchParams)
        .then(({ tableResponse }) => {
          this.dataSource = tableResponse.list;
          this.dataSource.forEach(item => {
            item.valueContent = formatValueContentToList(item.valueContent);
          });
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
    toggle(flag) {
      this.$emit("update:visible", flag);
    }
  },
  mounted() {
    this.onSearch();
  },
  watch: {
    visible(flag) {
      if (flag) {
        this.selectedList = this.defaultList.concat();
      }
    }
  },
  data() {
    return {
      list: [{ id: 1 }],
      searchParams: {},
      dataSource: [],
      selectedList: []
    };
  }
};
</script>

