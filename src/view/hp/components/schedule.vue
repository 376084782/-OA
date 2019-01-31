// 工作日程
<template>
  <el-card class="panel-content mgLeft20">
    <div slot="header" class="clearfix">
      <span>工作日程</span>
    </div>
    <div class="card-content">
          <fullcalendar class="mgBottom10" ></fullcalendar>
      <!-- <el-date-picker @change='onChange' class="mgLeft10 picker" id='date' v-model="value1" type="date" placeholder="选择日期"></el-date-picker> -->
      <el-row v-for="(item, index) in list" :key="index">
        <el-col :span="15">
          <li class="text-li"><span class="text-black">{{item.content}}</span></li>
        </el-col>
        <el-col :span="9">
          <div class="text-right gray">{{item.date}}</div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import fullcalendar from "components/fullcalendar2.vue";
  export default {
  components: { fullcalendar },
    data() {
      return {
        list: [
          // {content: '王海峰的请假审批', date:'2018-12-12'},
          // {content: '王海峰的请假审批', date:'2018-12-12'},
          // {content: '王海峰的请假审批', date:'2018-12-12'},
        ]
      };
    },
    methods: {
      // handleBtnClick() {
      //   console.log("click")
      //   document.getElementById("date").focus();
      // },
      // onChange(e){
      //   e.cancelBubble=true;
      //   console.log('change')
      // }
    },
    mounted() {
      // this.handleBtnClick();
    },
  };
</script>
