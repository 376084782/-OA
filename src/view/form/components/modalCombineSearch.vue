<template>
  <div class="search-area">
    <el-form label-width="70px">
      <el-row class="row" :gutter="20">
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="searchForm.flowTitle" placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型">
            <el-input placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button size="small" @click="onSearch(1)">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="收发日期">
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
            <el-input v-model="searchForm.flowCode" placeholder="请输入" size="small"></el-input>
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
export default {
  data() {
    return {
      expand: false,
      searchForm: {
      },
      dateRange: []
    };
  },
  watch: {
    dateRange(val) {
      this.searchForm.startTime = val[0];
      this.searchForm.deadTime = val[1];
    }
  },
  methods: {
    onSearch(flag = 0) {
      if (flag === 1) {
      } else {
        this.$emit("search", this.searchForm);
      }
    }
  }
};
</script>

