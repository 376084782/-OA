<template>
  <div ref="root" class="common-step" :style="{'min-height':minHeight}">
    <div class="section">
      <slot></slot>
      <el-row type="flex" v-for="(conf,index) in config" :key="index" class="area">
        <el-col style="width:50px;margin-right:12px;" class="line-wrap">
          <div class="circle" :class="circleClass(index)">
            <span>{{conf.stepName}}</span>
          </div>
          <div
            v-if="index<config.length-1"
            class="line-dash"
            :class="index<active?'success':'disabled'"
          ></div>
        </el-col>
        <el-col>
          <el-row type="flex" class="detail">
            <el-col class="left">
              <el-row
                class="user-list-wrap"
                v-for="(item,index) in conf.userList"
                :key="index"
                type="flex"
              >
                <!-- {{item}} -->
                <div class="left">
                  <!-- <span class="name">{{item.name}}</span> -->
                  <!-- <el-tag class="role" v-if="item.name">{{item.roleName}}</el-tag> -->
                </div>
                <div
                  class="right"
                  v-if="item.statusDictionary!='待处理'&&item.statusDictionary!='未开始'"
                >
                  <p>
                    <span :style="statusStyle(item)">{{item.statusDictionary}}</span>&nbsp;&nbsp;
                    <span class="sub">{{item.finishTime}}</span>
                  </p>
                  <step-detail :content="item.content" :value="item.valueContent" :step="index+1"></step-detail>
                </div>
              </el-row>
            </el-col>
            <el-col>
              <div>
                <div v-if="conf.showEdit&&conf.content&&conf.content.length>0">
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
import stepDetail from "./step-detail.vue";
export default {
  components: { stepDetail },
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
      default: 2
    }
  },
  mounted(){
    console.log(this.config)
  },  
  data() {
    return {
      minHeight: "auto"
    };
  },
  computed: {},
  methods: {
    statusStyle(data) {
      let obj = {};
      if (data.statusDictionary.indexOf("不同意") > -1) {
        obj["color"] = "#ff5f57";
      } else if (data.statusDictionary.indexOf("同意") > -1) {
        obj["color"] = "#2acc42";
      }
      return obj;
    },
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

