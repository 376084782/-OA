<template>
  <div ref="root" class="common-step" :style="{'min-height':minHeight}">
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
              <slot :name="`step${index}`"></slot>
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
  props: {
    data: {
      type: Array,
      default() {
        return [
          {
            name: "用户名",
            roleName: "科长",
            title: "步骤"
          },
          {
            name: "用户名",
            roleName: "科长",
            title: "步骤"
          },
          {
            name: "用户名",
            roleName: "科长",
            title: "步骤"
          },
          {
            name: "用户名",
            roleName: "科长",
            title: "步骤"
          }
        ];
      }
    },
    active: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      minHeight: "auto"
    };
  },
  methods: {
    resetHeight() {
      let $root = $(this.$refs.root);
      let rootTop = $root.offset().top;
      let maxHeight = 0;
      $(this.$el)
        .find(".bubble")
        .each((index, item) => {
          let $item = $(item);
          let height = $item.offset().top - rootTop + $item.height() + 50;
          if (height > maxHeight) {
            maxHeight = height;
          }
        });
      this.minHeight = maxHeight + "px";
    },
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

