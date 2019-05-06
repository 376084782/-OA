<template>
  <el-dialog width="480px" title="添加控件" :visible="show" @update:visible="toggle">
    <div class="move-area">
      <div
        @click="selHandler(item)"
        v-for="(item,idx) in config"
        :key="idx"
        class="option"
      >{{item.name}}</div>
    </div>
    <template slot="footer">
      <el-button size="mini">取消</el-button>
      <el-button size="mini" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      config: [
        {
          name: "单行输入框",
          type: "input"
        },
        {
          name: "单选下拉框",
          type: "one-select"
        },
        {
          name: "多选下拉框",
          type: "multi-select"
        },
        {
          name: "多行输入框",
          type: "textarea"
        },
        {
          name: "日期",
          type: "date"
        },
        {
          name: "日期时间",
          type: "date-time"
        },
        {
          name: "单选框",
          type: "radio"
        },
        {
          name: "附件",
          type: "multi-file"
        }
      ]
    };
  },
  methods: {
    selHandler(item) {
      this.$emit("change", item);
      this.toggle(false);
    },
    toggle(flag) {
      this.$emit("update:show", flag);
    },
    addHandler() {}
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
      &::after {
        content: "当前所在组";
        position: absolute;
        height: 28px;
        border-radius: 4px;
        background-color: #f8f8f8;
        line-height: 28px;
        padding: 0 8px;
        right: 8px;
        top: 6px;
      }
    }
    &.select {
      background-color: #edf7fe;
    }
  }
}
</style>

