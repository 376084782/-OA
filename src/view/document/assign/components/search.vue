<template>
  <div class="search-area">
    <el-form label-width="70px">
      <el-row class="row" :gutter="20">
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="searchForm.searchKey" placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" style="width:100%;" type="small" placeholder="请选择">
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button size="small" @click="onSearch(1)">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="限办日期">
            <el-date-picker
              v-model="searchForm.dateRange"
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
export default {
  data() {
    return {
      expand: false,
      searchForm: {
        level: "", // 俱乐部等级
        state: "", // 状态
        guildid: "", // 俱乐部ID
        guildname: "", // 俱乐部名称
        numid: "", // 会长ID
        // nickname: '', // 会长名称
        phone: "", // 手机号
        dateRange: [] // 创建日期
      },
      selectGuild: "guildid",
      selectClub: "numid",
      statusList: [
        { id: 0, label: "关闭" },
        { id: 1, label: "开启" },
        { id: 2, label: "解散" },
        { id: 3, label: "禁封" }
      ]
    };
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

