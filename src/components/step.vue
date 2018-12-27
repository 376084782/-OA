<template>
  <div class="common-step">
    <div class="section">
      <el-row type="flex" v-for="(conf,index) in data" :key="index" class="area">
        <el-col style="width:50px;margin-right:20px;">
          <div class="circle" :class="circleClass(index)">{{conf.title}}</div>
          <div
            v-if="index<data.length-1"
            class="line-dash"
            :class="index<active?'success':'disabled'"
          ></div>
        </el-col>
        <el-col>
          <el-row type="flex" class="detail">
            <el-col style="width:80px;">
              <span class="name">{{conf.name}}</span>
              <el-tag class="role">{{conf.roleName}}</el-tag>
            </el-col>
            <el-col>
              <div v-if="index<active">
                <p class="tip-detail">
                  <span :class="`action ${conf.actionStatus}`">{{conf.actionName}}</span>&nbsp;&nbsp;
                  <span class="tip-date">{{conf.date}}</span>
                </p>
                <p class="tip-detail">{{conf.remark}}</p>
              </div>
              <div class="bubble-wrap" v-else-if="index==active">
                <div class="bubble">
                  <slot></slot>
                </div>
              </div>
              <div v-else></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import "assets/css/step.scss";
export default {
  data() {
    return {
      active: 2,
      /**
       * @param actionStatus danger||success||default
       */
      data: [
        {
          name: "用户名",
          roleName: "科长",
          title: "步骤",
          date: "2018.11.23",
          actionName: "发起",
          actionStatus: "success",
          remark: "备注备注备注备注备注备注备注备注备注备注"
        },
        {
          name: "用户名",
          roleName: "科长",
          date: "2018.11.23",
          title: "步骤",
          actionStatus: "danger",
          actionName: "发起",
          remark: "备注备注备注备注备注备注备注备注备注备注"
        },
        {
          name: "用户名",
          roleName: "科长",
          date: "2018.11.23",
          title: "步骤"
        },
        {
          name: "用户名",
          roleName: "科长",
          date: "2018.11.23",
          title: "步骤"
        }
      ]
    };
  },
  methods: {
    circleClass(index) {
      if (index < this.active) {
        return "success";
      } else if (index == this.active) {
        return "active";
      } else {
        return "disabled";
      }
    }
  }
};
</script>

