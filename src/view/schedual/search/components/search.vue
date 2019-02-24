<template>
  <div class="search-area">
    <el-form label-width="80px">
      <el-row class="row" :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名:">
            <el-input v-model="searchForm.name" placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门:">
            <el-input v-model="searchForm.groupName" placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" style="
    padding-right: 10px;
    margin-left: 42px;">
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button size="small" @click="onReset()">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
          <el-form-item label="排班时间:">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
              :unlink-panels="true"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="16">
          <div class="pull-right"></div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateRange: [],
      expand: false,
      searchForm: {
        groupName: "",
        startDate: "",
        endDate: "",
        name: ""
      }
    };
  },
  watch: {
    dateRange(val) {
      this.searchForm.startDate = val[0];
      this.searchForm.endDate = val[1];
    }
  },
  methods: {
    onReset() {
      this.searchForm = {};
      this.dateRange = ["", ""];
      this.$emit("search", this.searchForm);
    },
    onSearch() {
      this.$emit("search", this.searchForm);
    }
  }
};
</script>

