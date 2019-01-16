<template>
  <section class="permission-containner" v-loading="bLoading">
    <nav-card
      :info.sync="currentInfo" :data="treeData"
      @load="loadOrganization"></nav-card>
    <content-card :info.sync="currentInfo" :data="treeData"></content-card>
  </section>
</template>
<script>
import navCard from './components/nav_card.vue';
import contentCard from './components/content_card.vue';
import { getOrganizationRoleTree } from 'api/permission';
export default {
  components: { navCard, contentCard },
  data () {
    return {
      bLoading: false,
      treeData: [],
      target: {},
      currentInfo: ''
    };
  },
  methods: {
    loadOrganization () {
      this.bLoading = true;
      getOrganizationRoleTree().then(data => {
        this.treeData = data.organizationRoleGroupList;
        this.currentInfo = '';
      }).finally(() => {this.bLoading = false;});
    }
  },
  created () {
    this.loadOrganization();
  }
};
</script>
<style lang="scss">
.permission-containner {
  display: flex;
  margin-top: 20px;
}
</style>
