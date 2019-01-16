<template>
  <el-radio-group v-model="val">
    <el-radio
      :disabled="disabled||conf.readOnly"
      v-for="(item , index) in radioDataList"
      :key="index"
      :label="item.value"
    >{{item.name}}</el-radio>
  </el-radio-group>
</template>
<script>
import { mapGetters } from "vuex";
import { getPeopleListByOrg, getPeopleListByRole } from "api/index";
export default {
  props: ["conf", "disabled", "value", "autoSelect"],
  data() {
    return {
      val: this.value,
      radioDataList: []
    };
  },
  watch: {
    val(val) {
      this.$emit("input", val);
    },
    radioDataList(val) {
      if (this.autoSelect && this.radioDataList.length > 0) {
        this.val = this.radioDataList[0].value;
      }
    }
  },
  mounted() {
    this.radioDataList = [];
    let userList = this.conf.data.list;

    let organizationRoleIdList = [];
    let organizationGroupIdList = [];
    userList.forEach(item => {
      if (item.persionType == 3) {
        organizationRoleIdList.push(item.businessId);
      } else if (item.persionType == 2) {
        organizationGroupIdList.push(item.businessId);
      } else {
        this.radioDataList.push({
          value: item.businessId,
          name: item.businessName
        });
      }
    });

    if (organizationGroupIdList.length > 0) {
      getPeopleListByOrg({ organizationGroupIdList }).then(({ userList }) => {
        this.radioDataList = this.radioDataList.concat(
          this.formatUserList(userList)
        );
      });
    }
    if (organizationRoleIdList.length > 0) {
      getPeopleListByRole({ organizationRoleIdList }).then(({ userList }) => {
        this.radioDataList = this.radioDataList.concat(
          this.formatUserList(userList)
        );
      });
    }
  },
  methods: {
    formatUserList(list) {
      let res = [];
      list.forEach(item => {
        res.push({
          value: item.userId,
          name: item.userName
        });
      });
      return res;
    }
  },
  computed: {
    ...mapGetters(["getDataByFuncName"])
  }
};
</script>

