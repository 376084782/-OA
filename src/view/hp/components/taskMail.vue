// 时件
<template>
  <el-card class="panel-content">
    <div slot="header" class="clearfix">
      <span>临超/已超时件</span>
    </div>
    <div style="min-height:170px;">
      <el-row>
        <el-col :span="20">
          <div class="gray title pull-left">催办单位</div>
        </el-col>
        <el-col :span="4">
          <div class="gray title pull-right">临超期时间</div>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in mail" :key="index">
        <el-col :span="16">
          <p>{{item.content}}</p>
        </el-col>
        <el-col :span="4">
          <div :class="calc(item.day)"></div>
        </el-col>
        <el-col :span="4">
          <p class="text-right gray">{{item.day}}</p>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      mail:[]
    };
  },
  methods: {
    calc(day) {
      return (day > 0 ? "text text-green" : (day == 0 ? "text text-yellow" : "text text-red"));
    }
  }
};
</script>
