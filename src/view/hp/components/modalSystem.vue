<template>
  <el-dialog title="其他应用" :visible.sync="visible" width="736px" :before-close="handleClose">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title='item.title' class="item-system" v-for="(item, index) in system" :name='index' :key="index">
        <!-- <p class="title">
          {{item.title}}
          <span>({{item.num}})</span>
        </p> -->
        <div class="btn-wrapper">
          <div v-for="(i, idx) in item.list" :key="idx" class="btn">
            <div :class="calcBg(idx)">
              <i :class="calcIcon(i.icon)"></i>
            </div>
            <span>{{i.name}}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      return {
        activeNames: [0, 1, 2, 3],
        system: [{
            title: "电子政务",
            num: 10,
            list: [{
                icon: "icon-piechart",
                name: "数字办公",
                url:'http://47.110.51.157:7300/index.html#/login'
              },
              {
                icon: "icon-piechart",
                name: "中介管理",
                url:'http://47.99.43.217:7310/vue-admin/#/login'
              },
              {
                name: "重点项目",
                icon: "icon-piechart",
                url:'http://47.110.51.157:8098/'
              },
              {
                icon: "icon-piechart",
                name: "招商管理"
              },{
                icon:'icon-piechart',
                name:'固投管理',
              }
            ]
          },
        ]
      };
    },
    methods: {
      calcIcon(icon) {
        return `anticon ${icon}`;
      },
      clickCancel() {
        this.$emit("update:visible", false);
      },
      clickSure() {
        this.$emit("update:visible", false);
      },
      handleClose() {
        this.$emit("update:visible", false);
      },
      calcBg(index) {
        let i = index % 3;
        let map = {
          0: 'bg-blue',
          1: 'bg-green',
          2: 'bg-red',
        }
        return `wrap-icon ${map[i]}`
      }
    }
  };
</script>

<style lang="scss">
  .title {
    line-height: 40px;
    font-size: 18px;
    color: #303133;
    font-size: 16px;
    height: 40px;
    span {
      color: gray;
    }
  }
  
  .btn-wrapper {
    margin-left: -10px;
    display: flex;
    flex: 4;
    flex-wrap: wrap;
    margin-bottom: -20px;
    // justify-content: space-between;
    .btn {
      width: 160px;
      height: 60px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
      border-radius: 4px;
      margin-left: 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .wrap-icon {
        line-height: 36px;
        color: #fff;
        text-align: center;
        width: 36px;
        height: 36px;
        border-radius: 2px;
        margin-left: 10px;
        margin-right: 10px;
      }
      .bg-blue {
        background-color: #5C88F6;
      }
      .bg-red {
        background-color: #F65C7D;
      }
      .bg-green {
        background-color: #77CEA8;
      }
    }
  }
</style>