<template>
  <div class="search-area">
    <el-form label-width="70px" size="small">
      <el-row class="row" :gutter="20">
        <el-col :span="8">
          <el-form-item label="任务名称">
            <el-input v-model="searchForm.flowTitle" placeholder="请输入" size="small"></el-input>
          </el-form-item>
        </el-col>
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
        <el-col :span="7" :offset="1" style="
    padding-right: 10px;
    margin-left: 42px;">
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button size="small" @click="onSearch(1)">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
          <el-form-item label="级别">
            <el-select style="width:290px" v-model="searchForm.keyWord">
              <el-option value="平级"></el-option>
              <el-option value="紧急"></el-option>
              <el-option value="特急"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发起人">
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

export default {
  data() {
    return {
      searchForm: {}
    };
  },

  computed: {
    ...mapGetters(["statusList"])
  },
  methods: {
    onSearch(flag = 0) {
      if (flag === 1) {
        this.searchForm = {};
      }
      this.$emit("search", this.searchForm);
    }
  }
};
</script>

