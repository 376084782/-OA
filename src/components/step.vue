<template>
  <div ref="root" class="common-step" :style="{'min-height':minHeight}">
    <div class="section">
      <slot></slot>
      <el-row type="flex" v-for="(conf,index) in config" :key="index" class="area">
        <el-col style="width:50px;margin-right:20px;" class="line-wrap">
          <div class="circle" :class="circleClass(index)">{{conf.stepName}}</div>
          <div
            v-if="index<config.length-1"
            class="line-dash"
            :class="index<active?'success':'disabled'"
          ></div>
        </el-col>
        <el-col>
          <el-row type="flex" class="detail">
            <el-col class="left">
              <el-row class="user-list-wrap" v-for="(item,index) in conf.userList" :key="index" type="flex">
                <span class="name">{{item.name}}</span>
                <el-tag class="role">{{item.roleName}}</el-tag>
              </el-row>
            </el-col>
            <el-col>
              <div>
                <div v-if="conf.showEdit">
                  <div class="bubble-wrap">
                    <div class="bubble">
                      <el-row>
                        <dynamic-form
                          input-width="280px"
                          label-width="160px"
                          :edit-data="data"
                          :config="conf.content||[]"
                        ></dynamic-form>
                      </el-row>
                    </div>
                  </div>
                </div>
                <div v-else-if="conf.action!=1">
                  <div v-for="(detail,index) in conf.detailList" :key="index">
                    <p class="tip-detail">
                      <span class="action" :class="detail.className">{{detail.title1}}</span>
                      <span class="detail-name">{{detail.title2}}</span>
                      <span class="tip-date">&nbsp;&nbsp;{{detail.title3}}</span>
                    </p>
                    <p class="tip-detail">{{detail.remark}}</p>
                  </div>
                </div>
              </div>
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
      type: Object,
      default() {
        return {};
      }
    },
    config: {
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
    // resetHeight() {
    //   return;
    //   let $root = $(this.$refs.root);
    //   let rootTop = $root.offset().top;
    //   let maxHeight = 0;
    //   $(this.$el)
    //     .find(".bubble")
    //     .each((index, item) => {
    //       let $item = $(item);
    //       let height = $item.offset().top - rootTop + $item.height() + 100;
    //       if (height > maxHeight) {
    //         maxHeight = height;
    //       }
    //     });
    //   this.minHeight = maxHeight + "px";
    // },
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

