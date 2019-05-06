<template>
  <section class="permission-containner" v-loading="bLoading">
    <nav-card :info.sync="currentInfo" :data="treeData" :defaultExpand.sync="defaultExpand"></nav-card>
    <content-card :info.sync="currentInfo" @success="onSuccess" @update="updateTree"></content-card>
  </section>
</template>
<script>
import navCard from "./components/nav_card.vue";
import contentCard from "./components/content_card.vue";
import { getOrganizationTree } from "api/permission";
export default {
  components: { navCard, contentCard },
  data() {
    return {
      bLoading: false,
      treeData: [],
      target: {},
      currentInfo: "",
      defaultExpand: []
    };
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "权限管理",
        url: this.$route.path
      },
      {
        name: "组织架构",
        url: this.$route.path
      }
    ]);
  },
  methods: {
    updateTree() {
      // this.sortTree(this.treeData);
      // this.treeData=this.treeData.concat();
    },
    sortTree(list) {
      if (!list) {
        return;
      }
      list.forEach(item => {
        if (
          item.chlidOrganizationGroupList &&
          item.chlidOrganizationGroupList.length > 0
        ) {
          this.sortTree(item.chlidOrganizationGroupList);
        } else {
          list = list.sort((a, b) => {
            return a.sort - b.sort;
          });
        }
      });
    },
    loadOrganization(id) {
      this.bLoading = true;
      getOrganizationTree({ organizationGroupId: -1 })
        .then(data => {
          this.treeData = data.organizationGroupList;
          this.sortTree(this.treeData);
          this.defaultExpand = id
            ? [id]
            : [this.treeData[0].organizationGroupId];
          if (id) {
            this.getTargetInfo(this.treeData, id);
            this.currentInfo = JSON.stringify(this.target);
          } else {
            this.currentInfo = JSON.stringify(this.treeData[0]);
          }
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    onSuccess(id) {
      this.loadOrganization(id);
    },
    getTargetInfo(item, id) {
      // let target = null;
      for (let i = 0; i < item.length; i++) {
        if (item[i].organizationGroupId == id) {
          this.target = item[i];
          return false;
        } else {
          this.getTargetInfo(item[i].chlidOrganizationGroupList, id);
        }
      }
    }
  },
  created() {
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
