<template>
  <el-row type="flex" style="flex-wrap:wrap;" align="middle">
    <div :key="idx" v-for="(tag,idx) in dynamicTags">
      <el-tag
        size="small"
        class="mgRight4"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        <span @click="changeThis(tag,idx)">{{tag.label}}</span>
      </el-tag>
      <i class="el-icon-d-arrow-right mgRight4" v-if="idx<dynamicTags.length-1"></i>
    </div>
    <el-button class="button-new-tag" size="mini" @click="addHandler">+</el-button>
    <el-dialog width="500px" append-to-body :visible.sync="showModal" title="选择审批人">
      <el-form label-width="100px" style="width:300px;margin:0 auto;">
        <el-form-item label="选择执行人">
          <el-select
            :disabled="disabled||conf.readOnly"
            v-model="selectData"
            filterable
            :remote-method="remoteMethod"
            remote
            :loading="loading"
            value-key="value"
          >
            <el-option
              v-for="item in selectDataList"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="showModal=false">取消</el-button>
        <el-button type="primary" @click="changeTag">确认</el-button>
      </template>
    </el-dialog>
  </el-row>
</template>
<script>
import { mapGetters } from "vuex";
import { getPeopleListByOrg, getPeopleListByRole } from "api/index";
import { getManageList, getPeopleList } from "api/permission";
import storeForm from "view/form/store";
export default {
  props: ["conf", "disabled", "value", "autoSelect"],
  data() {
    return {
      showModal: false,
      dynamicTags: [],
      selectData: {},
      selectDataList: [],
      loading: false,
      editIdx: -1
    };
  },
  watch: {
    dynamicTags() {
      let val = [];
      this.dynamicTags.forEach(item => {
        val.push(item.value);
      });

      let nextDetailUserInfoList = [];
      nextDetailUserInfoList.push({
        processUserDetailId: this.conf.data.list[0].processUserDetailId,
        name: "",
        userIdListString: val.join(",")
      });
      this.$emit("input", nextDetailUserInfoList);
    }
  },
  mounted() {
    this.remoteMethod();
  },
  methods: {
    addHandler() {
      this.editIdx = -1;
      this.showModal = true;
      this.selectData = {};
    },
    changeThis(tag, idx) {
      this.editIdx = idx;
      this.showModal = true;
      this.selectData = tag;
    },
    changeTag() {
      if (this.editIdx == -1) {
        this.dynamicTags.push(this.selectData);
      } else {
        this.dynamicTags[this.editIdx] = this.selectData;
      }
      this.showModal = false;
    },
    handleClose(tag) {
      let index = this.dynamicTags.filter(item => item.value == tag.value);
      this.dynamicTags.splice(index, 1);
    },
    remoteMethod(query = "") {
      this.loading = true;
      getPeopleList({
        keyWord: query,
        pageNo: 1,
        pageSize: 20
      })
        .then(({ tableResponse }) => {
          this.selectDataList = [];
          tableResponse.list.forEach(item => {
            this.selectDataList.push({ label: item.name, value: item.userId });
          });
        })
        .finally(e => {
          this.loading = false;
        });
    },
    changeHandler() {},
    update() {
      let config = storeForm.state.config;
      let editData = storeForm.state.data;
    }
  },
  computed: {
    ...mapGetters(["getDataByFuncName"])
  }
};
</script>

