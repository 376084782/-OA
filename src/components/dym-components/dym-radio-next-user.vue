<template>
  <div>
    <el-row v-for="(item,index) in radioDataList" :key="index">
      <el-radio-group v-model="valList[index]">
        <el-radio
          :disabled="disabled||conf.readOnly"
          v-for="(item , index) in item"
          :key="index"
          :label="item.value"
        >{{item.name}}</el-radio>
      </el-radio-group>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getPeopleListByOrg, getPeopleListByRole } from "api/index";
export default {
  props: ["conf", "disabled", "value", "autoSelect"],
  data() {
    return {
      valList: [],
      val: this.value,
      radioDataList: []
    };
  },
  watch: {
    valList(val) {
      let nextDetailUserInfoList = [];
      val.forEach((item, index) => {
        nextDetailUserInfoList.push({
          processUserDetailId: this.conf.data.list[index].processUserDetailId,
          userId: item,
          name: ""
        });
      });
      this.$emit("input", nextDetailUserInfoList);
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
    userList.forEach((item, index) => {
      this.$set(this.radioDataList, index, []);
      if (item.persionType == 3) {
        getPeopleListByRole({ organizationRoleIdList:[item.businessId] }).then(({ userList }) => {
          this.radioDataList[index] = this.formatUserList(userList);
          this.$set(this.valList, index, this.radioDataList[index][0].value);
        });
      } else if (item.persionType == 2) {
        getPeopleListByOrg({ organizationGroupIdList:[item.businessId] }).then(({ userList }) => {
          this.radioDataList[index] = this.formatUserList(userList);
          this.$set(this.valList, index, this.radioDataList[index][0].value);
        });
      } else {
        this.radioDataList[index].push({
          value: item.businessId,
          name: item.businessName
        });
        this.$set(this.valList, index, this.radioDataList[index][0].value);
      }
    });
  },
  methods: {
    formatUserList(list) {
      let res = [];
      list.forEach(item => {
        res.push({
          value: item.userId,
          name: item.name
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

