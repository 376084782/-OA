<template>
  <div class="search-area">
    <el-form label-width="70px" size="small">
      <el-row class="row" :gutter="20">
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="searchForm.searchKey" placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-select style="width:100%;" v-model="searchForm.stepStatus" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" style="
    padding-right: 10px;
    margin-left: 42px;">
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button size="small" @click="onSearch(1)">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
          <el-form-item label="限办日期">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              size="small"
              style="width: 100%"
              :unlink-panels="true"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编号">
            <el-input placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div class="pull-right"></div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getStatusList } from "api";

export default {
  data() {
    return {
      searchForm: {},
      dateRange: [],
      statusList: []
    };
  },

  computed: {},
  watch: {
    dateRange(val) {
      this.searchForm.startTime = val[0];
      this.searchForm.deadTime = val[1];
    }
  },
  mounted() {
    this.getStatusList();
  },
  methods: {
    getStatusList() {
      getStatusList({
        modelTypeList: [100, 101]
      }).then(e => {
        this.statusList = [];
        e.stepStatusList.forEach(item => {
          this.statusList.push({
            value: item.name,
            key: item.value
          });
        });
      });
    },
    onSearch(flag = 0) {
      if (flag === 1) {
        this.searchForm = {};
      } else {
      }
      this.$emit("search", this.searchForm);
    }
  }
};
</script>

