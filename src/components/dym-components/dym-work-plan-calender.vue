<template>
  <fullcalendar :list="eventList"></fullcalendar>
</template>
<script>
import fullcalendar from "components/fullcalendar.vue";
export default {
  components: { fullcalendar },
  props: {
    value: {
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      eventList: []
    };
  },
  watch: {
    value(list) {
      this.changeData(list)
    }
  },
  mounted(){
    this.changeData(this.value)
  },
  methods: {
    changeData(list){
      this.eventList = this.formatEventList(list || []);
      let listToServer = this.parseToServer(list);
      this.$emit("input", listToServer);
    },
    parseToServer(valOld) {
      let dateMap = {};
      let res = [];
      if (valOld[0] && !valOld[0].workPlanDateDetailInfoList) {
        valOld.forEach(subItem => {
          let workPlanDateDetailInfoList = [];
          if (!dateMap[subItem.date]) {
            res.push({
              date: subItem.date,
              workPlanDateDetailInfoList
            });
            dateMap[subItem.date] = res.length - 1;
          } else {
            workPlanDateDetailInfoList =
              res[dateMap[subItem.date]].workPlanDateDetailInfoList;
          }
          workPlanDateDetailInfoList.push({
            type: subItem.type,
            userId: subItem.userId,
            name: subItem.name
          });
        });
      } else {
        res = valOld;
      }
      return res;
    },
    getTypeDictionary(data) {
      if (data.typeDictionary) {
        return data.typeDictionary;
      } else {
        let map = {
          1: "夜班",
          2: "假日",
          3: "领导"
        };
        return map[data.type];
      }
    },
    formatEventList(list1) {
      let list = [];
      list1.forEach(item => {
        if (item && item.workPlanDateDetailInfoList) {
          item.workPlanDateDetailInfoList.forEach(subItem => {
            list.push({
              start: item.date,
              title: `${subItem.name} ${this.getTypeDictionary(subItem)}`
            });
          });
        } else if (item) {
          list.push({
            start: item.date,
            title: `${item.name} ${this.getTypeDictionary(item)}`
          });
        }
      });
      return list;
    }
  }
};
</script>

