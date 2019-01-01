// 时件
<template>
  <el-card class="panel-content">
    <div slot="header" class="clearfix">
      <span>临超/已超时件</span>
    </div>
    <div>
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
      mail: [
        {
          content: "主任会议议题催缴",
          day: -5
        },
        {
          content: "请假审批（王存）",
          day: -3
        },
        {
          content: "园区物业费，水电费，活动经费等支付",
          day: 0
        },
        {
          content: "员工体检经费",
          day: 3
        },
        {
          content: "员工生日经费包括蛋糕吃饭等经费报销",
          day: 5
        }
      ]
    };
  },
  methods: {
    calc(day) {
      return (day > 0 ? "text text-green" : (day == 0 ? "text text-yellow" : "text text-red"));
    }
  }
};
</script>
