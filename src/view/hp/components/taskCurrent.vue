// 当月任务完成情况
<template>
  <el-card class="panel-content mgLeft20">
    <div slot="header" class="clearfix">
      <span>当月任务完成情况</span>
    </div>
    <!-- <p class="gray text-name">name</p> -->
    <!-- <div id="chart-current"></div> -->
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
        // chart: {
        //   date: ["10-14", "10-15", "10-16", "10-17", "10-18", "10-19"],
        //   totalCount: [10, 11, 15, 20, 12, 9],
        //   unfinishCount: [4, 8, 7, 18, 10, 9]
        // }
      };
    },
    methods: {
      drawConsumeChart() {
        const ele = document.getElementById("chart-current");
        if (!ele) return;
        Highcharts.chart(ele, {
          type: "pie",
          title: {
            text: null
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                connectorWidth: 0,
                enabled: true,
                formatter: function() {
                  return '';
                }
              },
              showInLegend: true // 显示在图例中
            }
          },
          colors: ["#5C88F6", "#FACC14", "#0eaa62", "#f7a35c"],
          series: [{
            type: "pie",
            name: "浏览器访问量占比",
            size: "60%",
            innerSize: "80%",
            data: [
              ["任务总数", 45.0],
              ["未完成", 55]
            ]
          }],
  
          legend: {
            align: "center",
            verticalAlign: "bottom",
            borderWidth: 0
          },
          credits: {
            enabled: false
          }
        });
      }
    },
    mounted() {
      // this.drawConsumeChart();
    }
  };
</script>
