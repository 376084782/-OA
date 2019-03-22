<template>
  <section>
    <el-card class="mgTop24">
      <list-search @search="onSearch"></list-search>
      <section class="mgTop24">
        <fullcalendar ref="calendar" width="1096px" height="686px" class="full" :list="scedualList"></fullcalendar>
      </section>
    </el-card>
  </section>
</template>
<script>
import listSearch from "./components/search";
import { scedualSearch } from "api/index";
import fullcalendar from "components/fullcalendar.vue";
import { dateFormater } from "utils/assist.js";
export default {
  components: { listSearch, fullcalendar },
  data() {
    return {
      searchParams: {},
      scedualList: []
    };
  },
  methods: {
    // 请求数据函数
    loadData() {
      this.bLoading = true;
      scedualSearch(this.searchParams)
        .then(({ workPlanDateInfoList }) => {
          let list = [];
          workPlanDateInfoList = workPlanDateInfoList || [];
          workPlanDateInfoList.forEach(item => {
            let className = "";
            if (item.date == dateFormater(new Date(), "YYYY-MM-DD")) {
              className += "day";
            }
            // 如果在时间段内，className加time
            item.workPlanDateDetailInfoList.forEach(detail => {
              list.push({
                start: item.date,
                title: detail.name + " " + detail.typeDictionary,
                className: className
              });
            });
          });
          this.scedualList = list;
          this.$refs.calendar.reset();
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    // 搜索
    onSearch(params) {
      this.searchParams={}
      Object.assign(this.searchParams, params);
      this.loadData();
    }
  },
  created() {
    this.onSearch();
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "值班管理",
        url: this.$route.path
      },
      {
        name: "值班查询",
        url: this.$route.path
      }
    ]);
  }
};
</script>

