<template>
  <el-dialog width="480px" :title="title" :visible="show" @update:visible="toggle">
    <div class="move-area">
      <div class="option">财务</div>
      <div class="option current">财务</div>
      <div class="option select">财务</div>
      <div class="option new" v-if="showAdd">
        <el-row type="flex">
          <el-input style="width:200px" class="mgRight20" placeholder="请输入分组名称" size="mini"></el-input>
          <el-button type="text" @click="showAdd=false">取消</el-button>
          <el-button type="text" @click="addHandler">确定</el-button>
        </el-row>
      </div>
    </div>
    <template slot="footer">
      <el-row type="flex" justify="space-between">
        <el-button size="small" plain type="primary" @click="showAdd=true">新建分组</el-button>
        <div>
          <el-button size="small">取消</el-button>
          <el-button size="small">确定</el-button>
        </div>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      title: "移动至",
      showAdd:false
    };
  },
  methods: {
    toggle(flag) {
      this.$emit("update:show", flag);
    },
    addHandler(){

    }
  }
};
</script>
<style lang="scss" scoped>
.move-area {
  height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  margin: -30px -20px;
  .option {
    border-bottom: 1px solid #e8e8e8;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: rgba(0, 0, 0, 0.85);
    &.current {
      color: rgba(0, 0, 0, 0.25);
      position: relative;
      &::after{
        content: '当前所在组';
        position: absolute;
        height: 28px;
        border-radius: 4px;
        background-color: #F8F8F8;
        line-height: 28px;
        padding: 0 8px;
        right: 8px;
        top: 6px;
      }
    }
    &.select{
      background-color: #EDF7FE;
    }
  }
}
</style>

