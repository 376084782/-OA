<template>
  <div style="margin:0 auto;margin-top:20px;" class="create-page2">
    <div class="create-step2-area">
      <div class="title">事项名称</div>
      <div class="bottom" @click="showType=true">添加控件</div>
      <div class="content" ref="formList">
        <div
          @click="showEditBubble(item)"
          v-for="(item,idx) in formList"
          :key="idx"
          class="option"
          :class="{select:selObj.id==item.id}"
        >{{item.title||'未命名'}}</div>
      </div>
    </div>
    <div class="bubble">
      <el-row type="flex" v-if="selObj.id" justify="space-between" class="title-area">
        <div class="title">{{selObj.name}}</div>
        <el-button type="text" @click="delHandler(selObj)">删除</el-button>
      </el-row>
      <div v-if="selObj.type" :is="`form-${selObj.type}`" :data.sync="selObj"></div>
    </div>
    <modal-type :show.sync="showType" @change="showAddBubble"></modal-type>
  </div>
</template>
<script>
import Sortable from "sortablejs";
import modalType from "../dialog/modal-components-type.vue";
import formInput from "../form/form-input.vue";
import formTextarea from "../form/form-textarea.vue";
import formDate from "../form/form-date.vue";
import formDateTime from "../form/form-date-time.vue";
import formMultiFile from "../form/form-multi-file.vue";
import formMultiSelect from "../form/form-multi-select.vue";
import formOneSelect from "../form/form-one-select.vue";
import formRadio from "../form/form-radio.vue";
export default {
  components: {
    modalType,
    formInput,
    formTextarea,
    formDate,
    formDateTime,
    formMultiFile,
    formMultiSelect,
    formOneSelect,
    formRadio
  },
  data() {
    return {
      showType: false,
      selObj: {},
      selType: {},
      formList: [],
      count: 0
    };
  },
  mounted() {
    let self = this;
    new Sortable(self.$refs.formList, {
      onEnd({ newIndex, oldIndex }) {
        let list = self._.cloneDeep(self.formList);
        const currRow = list.splice(oldIndex, 1)[0];
        list.splice(newIndex, 0, currRow);
        this.list = [];
        this.list = list;
      }
    });
  },
  methods: {
    delHandler(data) {
      this.formList = this.formList.filter(item => item.id != data.id);
      this.showAddBubble();
    },
    showEditBubble(data) {
      this.selObj = data;
    },
    showAddBubble(data) {
      this.count++;
      this.selObj = {
        id: this.count
      };
      Object.assign(this.selObj, data);
      this.selType = data;
      this.formList.push(this.selObj);
    }
  }
};
</script>

<style lang="scss" scoped>
.create-step2-area {
  background-color: #f8f8f8;
  min-height: 445px;
  width: 280px;
  padding-bottom: 80px;
  position: relative;
  box-shadow: 0px 3px 6px 0px rgba(5, 21, 41, 0.12);
  .content {
    width: 100%;
    .option {
      background-color: white;
      height: 40px;
      line-height: 40px;
      padding-left: 8px;
      border-bottom: 1px solid #e8e8e8;
      border-top: 1px solid transparent;
      position: relative;
      &::after {
        content: "修改 >";
        position: absolute;
        right: 8px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.25);
      }
      &.select {
        border-top: 1px solid #5d9ff8;
        border-bottom: 1px solid #5d9ff8;
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    background-color: #5d9ff8;
    color: white;
    width: 100%;
    text-align: center;
  }
  .title {
    height: 40px;
    background-color: #edf7fe;
    line-height: 40px;
    text-align: center;
    width: 100%;
  }
}
.create-page2 {
  display: flex;
  justify-content: center;
  .bubble {
    width: 460px;
    min-height: 500px;
    box-shadow: 0px 3px 6px 0px rgba(5, 21, 41, 0.12);
    margin-left: 20px;
    padding: 0 30px;
    .title-area {
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
