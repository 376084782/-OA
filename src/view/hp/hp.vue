<template>
  <section class="hp-container">
    <p class="text-welcome">Welcome,欢迎您{{name}}！</p>
    <hp-header :data="topData"></hp-header>
    <el-row>
      <el-col :span="16">
        <!-- 分配任务完成情况 -->
        <task-dispatch></task-dispatch>
        <!-- 时件 -->
        <task-mail></task-mail>
        <!-- 通知广告 -->
        <task-notice :list="listMsg"></task-notice>
      </el-col>
      <el-col :span="8">
        <!-- 工作公告 -->
        <task-schedule></task-schedule>
        <!-- 当月任务完成情况 -->
        <task-current></task-current>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import hpHeader from "./components/hpHeader";
import taskMail from "./components/taskMail";
import taskNotice from "./components/notice";
import taskSchedule from "./components/schedule";
import taskCurrent from "./components/taskCurrent";
import taskDispatch from "./components/taskDispatch";
import { getIndexPageData } from "api/index";
export default {
  data() {
    return {
      name: this.$store.getters.name,
      topData: [
        {
          icon: "anticon icon-user",
          title: "待办理",
          num: 0,
          color: "#7F66ED"
        },
        {
          icon: "anticon icon-check-square",
          title: "我审批的",
          num: 0,
          color: "#5C88F6"
        },
        {
          icon: "anticon icon-pushpin",
          title: "我发起的",
          num: 0,
          color: "#77CEA8"
        },
        {
          icon: "anticon icon-heart",
          title: "我关注的",
          num: 0,
          color: "#EBCF51"
        }
      ],
      listMsg: []
    };
  },
  mounted() {
    this.getIndexPageData();
  },
  methods: {
    getIndexPageData() {
      getIndexPageData({
        remindPageSize: 5,
        messagePageSize: 5,
        yearMonth: "2018-03"
      }).then(e => {
        this.topData = [
          {
            icon: "anticon icon-user",
            title: "待办理",
            num: e.waitCount,
            color: "#7F66ED"
          },
          {
            icon: "anticon icon-check-square",
            title: "我审批的",
            num: e.doneCount,
            color: "#5C88F6"
          },
          {
            icon: "anticon icon-pushpin",
            title: "我发起的",
            num: e.sendCount,
            color: "#77CEA8"
          },
          {
            icon: "anticon icon-heart",
            title: "我关注的",
            num: 0,
            color: "#EBCF51"
          }
        ];
        this.listMsg = e.userMessageList;
      });
    }
  },
  components: {
    hpHeader,
    taskMail,
    taskNotice,
    // mail,
    // notice,
    taskSchedule,
    taskCurrent,
    taskDispatch
  }
};
</script>
