// 通知公告
<template>
  <el-card class="panel-content mgBottom20">
    <div slot="header" class="clearfix">
      <span>通知公告</span>
    </div>
    <div>
      <el-row v-for="(item, index) in notice" :key="index">
        <el-col :span="20">
          <p>{{item.content}}</p>
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
  data() {
    return {
      notice: [
        {
          content: "2018年12月20日，蒙牛集团与国际足联在北京国家会议国际足联在北京国家举行召开…",
          date: '2018-12-20'
        },
        {
          content: "作为中国领先的乳制品供应商，蒙牛专注于研发生产适。",
          date: '2018-12-20'
        },
        {
          content: "2018年12月20日，蒙牛集团与国际足联在北京国家会议国际足联在北京国家举行召开…",
          date: '2018-12-20'
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
