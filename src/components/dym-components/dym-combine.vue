<template>
  <div>
    <!-- 显示已经选中的列表 -->
    <el-button @click="showModal=true">关联公文</el-button>
    <modal-combine :visible.sync="showModal" width="680px" @changeSel="changeSel"></modal-combine>
  </div>
</template>
<script>
import modalCombine from "view/form/components/modalCombine.vue";
export default {
  props: ["conf"],
  components: { modalCombine },
  methods:{
    changeSel(list){
      this.$emit('input',list);
    }
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

