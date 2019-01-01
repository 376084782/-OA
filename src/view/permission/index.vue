<template>
  <section class="permission-containner" v-loading="bLoading">
    <nav-card v-model="type" :info.sync="currentInfo" :data="treeData"></nav-card>
    <content-card v-model="type" :info.sync="currentInfo"></content-card>
  </section>
</template>
<script>
import navCard from './components/nav_card.vue';
import contentCard from './components/content_card.vue';
import { getDepartmentTree } from 'api/permission';
export default {
  components: { navCard, contentCard },
  props: ['type'],
  data () {
    return {
      bLoading: false,
      treeData: [],
      currentInfo: ''
    };
  },
  watch: {
    '$route': {
      immediate: true,
      handler (to, from) {
        if (to && to.path == '/permission/organization') {
          this.loadDepartment();
        }
      }
    }
  },
  methods: {
    loadDepartment () {
      this.bLoading = true;
      getDepartmentTree({}).then(data => {
        this.treeData = data.organizationGroupList;
      }).finally(() => {this.bLoading = false;});
    }
  }
};
</script>
<style lang="scss">
.permission-containner {
  display: flex;
  margin-top: 20px;
}
</style>
