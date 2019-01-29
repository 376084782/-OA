<template>
  <div>
    <!-- 显示已经选中的列表 -->
    <p v-for="(item,index) in list||[]" :key="index">
      <span>{{item.name}}</span>
      <el-button type="text" @click="del(item)" v-if="!disabled">删除</el-button>
    </p>
    <el-button @click="showModal=true" :disabled="disabled">关联公文</el-button>
    <modal-combine
      :default-list="list"
      :visible.sync="showModal"
      width="680px"
      @changeSel="changeSel"
    ></modal-combine>
  </div>
</template>
<script>
import modalCombine from "view/form/components/modalCombine.vue";
export default {
  props: ["conf", "value", "disabled"],
  components: { modalCombine },
  methods: {
    changeSel(list) {
      this.list = list;
      this.$emit("input", this.list);
    },
    del(data) {
      this.list = this._.dropWhile(this.list, item => {
        return item.value == data.value;
      });
      this.$emit("input", this.list);
    }
  },
  mounted() {
    this.list = this.value;
  },
  data() {
    return {
      list: [],
      showModal: false
    };
  }
};
</script>

