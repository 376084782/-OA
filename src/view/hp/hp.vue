<template>
<section class="hp-container">
    <p class="text-welcome">Welcome,欢迎您{{name}}！</p>
    <hp-header></hp-header>
  <el-row>
    <el-col :span="16">
      <!-- 分配任务完成情况 -->
      <task-dispatch></task-dispatch>
      <!-- 时件 -->
      <task-mail></task-mail>
      <!-- 通知广告 -->
      <task-notice></task-notice>
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
import hpHeader from './components/hpHeader'
import taskMail from './components/taskMail'
import taskNotice from './components/notice'
import taskSchedule from './components/schedule'
import taskCurrent from './components/taskCurrent'
import taskDispatch from './components/taskDispatch'

export default {
  data() {
    return {
      name: '王存'
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
}
</script>
