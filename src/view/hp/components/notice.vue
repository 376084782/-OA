// 通知公告
<template>
  <el-card class="panel-content mgBottom20">
    <div slot="header" class="clearfix">
      <span>通知公告</span>
    </div>
    <div style="min-height:100px;">
      <el-row v-for="(item, index) in list" :key="index">
        <el-col :span="20">
          <p>{{item.title}}</p>
        </el-col>
        <el-col :span="4">
          <div class="text-right gray">{{item.date}}</div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  props:{
    list:Array
  },
  data() {
    return {
    };
  },
  methods: {
    calc(day) {
      return (day > 0 ? "text text-green" : (day == 0 ? "text text-yellow" : "text text-red"));
    }
  }
};
</script>
