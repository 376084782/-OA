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
import { getManageList } from "api/permission";
import storeForm from "view/form/store";
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
          name: "",
          userId: item,
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
    this.$bus.$on("updateRadioNext", () => {
      this.update();
    });
    this.update();
  },
  methods: {
    update() {
      let config = storeForm.state.config;
      let editData = storeForm.state.data;
      this.radioDataList = [];
      let userList = this.conf.data.list;
      userList.forEach((item, index) => {
        this.$set(this.radioDataList, index, []);
        if (item.persionType == 3) {
          getPeopleListByRole({
            organizationRoleIdList: [item.businessId]
          }).then(({ userList }) => {
            this.radioDataList[index] = this.formatUserList(userList);
            this.$set(this.valList, index, this.radioDataList[index][0].value);
          });
        } else if (item.persionType == 2) {
          getPeopleListByOrg({
            organizationGroupIdList: [item.businessId]
          }).then(({ userList }) => {
            this.radioDataList[index] = this.formatUserList(userList);
            this.$set(this.valList, index, this.radioDataList[index][0].value);
          });
        } else if (item.persionType == 1) {
          if (item.businessId == 0) {
            // 发起人
            this.radioDataList[index].push({
              value: this.$store.state.getters.currentUserInfo.value,
              name: this.$store.state.getters.currentUserInfo.name
            });
          } else if (item.businessId == -1) {
            // 执行人
            if (editData.changeUser) {
              this.radioDataList[index].push(editData.changeUser);
            }
          } else {
            this.radioDataList[index].push({
              value: item.businessId,
              name: item.businessName
            });
          }
          if (this.radioDataList[index][0]) {
            this.$set(this.valList, index, this.radioDataList[index][0].value);
          }
        } else if (item.persionType == 5) {
          let organizationGroupId = item.businessId;
          if (item.businessId == -2) {
            // 发起科室
            organizationGroupId =
              config.processUser.organizationGroupId ||
              this.$store.getters.organizationGroupId;
          } else if (item.businessId == -3) {
            // 执行科室
          }
          getManageList({
            organizationGroupId: organizationGroupId,
            position: 1
          }).then(({ userList }) => {
            this.radioDataList[index] = this.formatUserList(userList);
            this.$set(this.valList, index, this.radioDataList[index][0].value);
          });
        } else if (item.persionType == 7) {
          let organizationGroupId = 1;
          let lastConfig = this.conf.data.lastList[0];
          let position = undefined;
          if (lastConfig.position == 1) {
            organizationGroupId = lastConfig.fatherOrganizationGroupId;
          } else if (lastConfig.position == 2) {
            organizationGroupId = lastConfig.organizationGroupId;
            position = 1;
          }
          getManageList({
            organizationGroupId: organizationGroupId,
            position
          }).then(({ userList }) => {
            this.radioDataList[index] = this.formatUserList(userList);
            this.$set(this.valList, index, this.radioDataList[index][0].value);
          });
        } else if (item.persionType == 8) {
          let organizationGroupId = this.$store.getters.organizationGroupId;
          getManageList({ organizationGroupId: organizationGroupId }).then(
            ({ userList }) => {
              this.radioDataList[index] = this.formatUserList(userList);
              this.$set(
                this.valList,
                index,
                this.radioDataList[index][0].value
              );
            }
          );
        }
      });
    },
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

