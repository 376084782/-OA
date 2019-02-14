// 分配任务完成时间
<template>
  <el-card class="panel-content">
    <div slot="header" class="clearfix">
      <span>分配任务完成情况（截止当前时间）</span>
    </div>
    <div id="chart-dispatch"></div>
  </el-card>
  <!-- <section >
    <div id='chart-dispatch'></div>
  </section>-->
</template>

<script>
var Highcharts = require("highcharts");
// require("highcharts/modules/exporting")(Highcharts);
export default {
  data() {
    return {
      chart: {
        date: ["10-14", "10-15", "10-16", "10-17", "10-18", "10-19"],
        totalCount: [0,0,0,0,0,0],
        unfinishCount: [0, 0, 0, 0, 0, 0]
      }
    };
  },
  methods: {
    drawConsumeChart() {
      const ele = document.getElementById("chart-dispatch");
      if (!ele) return;
      Highcharts.chart(ele, {
        title: {
          text: null
        },
        xAxis: [
          {
            categories: this.chart.date,
            crosshair: true
          }
        ],
        yAxis: {
          max:20,
          title: {
            text: "天"
          },
          allowDecimals: false,
          // plotLines: [
          //   {
          //     value: 1,
          //     width: 1,
          //     color: "#808080"
          //   }
          // ]
        },
        colors: ["#5C88F6", "#FACC14", "#0eaa62", "#f7a35c"],
        series: [
          {
            type: "line",
            name: "任务总数",
            data: this.chart.totalCount
          },
          {
            type: "line",
            name: "未完成任务总数",
            data: this.chart.unfinishCount
          }
        ],
        legend: {
          align: "right",
          verticalAlign: "top",
          borderWidth: 0
        },
        credits: {
          enabled: false
        }
      });
    }
  },
  mounted() {
    this.drawConsumeChart();
  }
};
</script>
