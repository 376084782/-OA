<template>
  <div class="fullcalendar-outer">
    <div ref="main" class="fullcalendar-wrap" :style="{width,height}"></div>
  </div>
</template>
<script>
import fullcalendar from "fullcalendar";
import "assets/css/common/fullcalendar.min.css";
import "assets/css/fullcalendar.scss";
export default {
  props: {
    height: {
      type: String,
      default: "620px"
    },
    list: {
      type: Array
    },
    width: {
      type: String,
      default: "660px"
    }
  },
  data() {
    return {
      root: null,
      eventList: []
    };
  },
  watch: {
    list(list) {
      this.eventList = list;
      // 触发视图更新
      this.reset();
    }
  },
  methods: {
    reset() {
      this.root.fullCalendar("destroy");
      this.initCalender();
    },
    initCalender() {
      var event = this.root.fullCalendar({
        height: "parent",
        monthNames: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ], //月份自定义命名
        monthNamesShort: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ], //月份缩略命名（英语比较实用：全称January可设置缩略为Jan）
        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], //同理monthNames
        dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"], //同理monthNamesShort
        weekNumberTitle: "周", //周的国际化,默认为"W"

        eventLimitText: "更多", //当一块区域内容太多以"+2 more"格式显示时，这个more的名称自定义（应该与eventLimit: true一并用）
        dayPopoverFormat: "YYYY年M月d日", //点开"+2 more"弹出的小窗口标题，与eventLimitClick可以结合用
        header: {
          left: "prev",
          center: "prevCustom,title,nextCustom",
          right: "next"
        },
        titleFormat: "YYYY年MM月",
        customButtons: {
          prevCustom: {
            text: "前一月",
            click: function(e) {
              $(".fc-prev-button").trigger("click");
            }
          },
          nextCustom: {
            text: "下一月",
            click: function() {
              $(".fc-next-button").trigger("click");
            }
          }
        },
        events: this.eventList
      });
    }
  },
  mounted() {
    this.eventList = this.list;
    this.root = $(this.$refs.main);
    this.initCalender();
  }
};
</script>

