<template>
  <div class="search-area">
    <el-form label-width="80px">
      <el-row class="row" :gutter="20">
        <el-col :span="8">
          <el-form-item label="标题:">
            <el-input v-model="searchForm.keyWord" placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
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
        <el-col :span="7" :offset="1">
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button size="small" @click="onReset()">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="status=='10'">
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-select style="width:100%;" v-model="searchForm.pageSearchStatus" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
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
import { mapGetters } from "vuex";
export default {
  props: ["status"],
  computed: {
    ...mapGetters(["statusList"])
  },
  data() {
    return {
      dateRange: [],
      expand: false,
      searchForm: {}
    };
  },
  watch: {
    dateRange(val) {
      this.searchForm.startTime = val[0];
      this.searchForm.deadTime = val[1];
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

