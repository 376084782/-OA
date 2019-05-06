<template>
  <el-card class="mgTop24 diy">
    <div style="padding:0 20px;">
      <el-row type="flex" justify="space-between">
        <el-row type="flex" align="middle">
          <h3 class="mgRight20">审批事项</h3>
          <el-button type="primary" plain size="small" @click="addGroup">新建分组</el-button>
        </el-row>
        <el-button type="primary" size="small" @click="goCreate">新建审批事项</el-button>
      </el-row>
      <div v-for="(item,idx) in list" :key="idx">
        <el-row type="flex" class="diy-title mgTop10" justify="space-between">
          {{item.name}}
          <el-dropdown @command="handleCommand" trigger="click">
            <el-button style="width:100px" type="text">编辑</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="rename">
                <p @click="rename(item)">重命名</p>
              </el-dropdown-item>
              <el-dropdown-item command="delete">
                <p @click="delGroup(item)">删除该组</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
        <el-row
          class="bar"
          type="flex"
          v-for="(sub,idx) in item.processOrganizationList"
          :key="idx"
        >
          <div class="left">
            <div class="icon"></div>
            <div class="cnt">
              <p>{{sub.modelTypeDictionary}}</p>
              <p class="sub">{{sub.updateTime}} 更新</p>
            </div>
          </div>
          <div class="center">
            <p>可见范围</p>
            <p class="sub">本单位全部可见</p>
          </div>
          <el-row>
            <el-button type="text">编辑</el-button>
            <el-button type="text">停用</el-button>
            <el-button type="text" @click="doMove()">移动至</el-button>
          </el-row>
        </el-row>
      </div>
    </div>
    <el-dialog width="480px" title="新建分组" :visible.sync="showNew">
      <el-form inline style="margin:0 auto;width:300px;">
        <el-form-item label="分组名字">
          <el-input v-model="nameNew"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button size="small">取消</el-button>
        <el-button @click="createNewGroup" size="small" type="primary">确定</el-button>
      </template>
    </el-dialog>
    <dialog-move :show.sync="showMove"></dialog-move>
  </el-card>
</template>
<script>
import dialogMove from "./dialog/modal-move";
import { getFlowList, createFlowGroup, updateFlowGroup ,delFlowGroup} from "api/diy";
export default {
  components: { dialogMove },
  data() {
    return {
      nameNew: "",
      showNew: false,
      showMove: false,
      list: [],
      selGroup: {}
    };
  },
  mounted() {
    this.$store.dispatch("updateBreadCurmbList", [
      {
        name: "权限管理",
        url: this.$route.path
      },
      {
        name: "审批事项",
        url: this.$route.path
      }
    ]);
    this.getList();
  },
  methods: {
    goCreate(){
      this.$router.push('/document/diy/create')
    },
    addGroup() {
      this.showNew = true;
      this.selGroup = {};
    },
    rename(data) {
      this.selGroup = data;
      this.showNew = true;
    },
    delGroup(data){
      delFlowGroup({
        processGroupId:data.processGroupId
      }).then(e=>{
        this.getList()
      })
    },
    createNewGroup() {
      if (this.selGroup.processGroupId) {
        updateFlowGroup({
          processGroupId: this.selGroup.processGroupId,
          name: this.nameNew
        }).then(e => {
          this.showNew = false;
          this.nameNew = "";
          this.getList();
        });
      } else {
        createFlowGroup({
          name: this.nameNew
        }).then(e => {
          this.showNew = false;
          this.nameNew = "";
          this.getList();
        });
      }
    },
    getList() {
      getFlowList({}).then(({ processGroupList }) => {
        this.list = processGroupList;
      });
    },
    doMove() {
      this.showMove = true;
    },
    handleCommand(command) {
      switch (command) {
        case "rename": {
          break;
        }
        case "delete": {
          break;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.diy {
  .sub {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
  }
  .diy-title {
    height: 40px;
    background: rgba(248, 248, 248, 1);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 40px;
    padding: 0 8px;
  }
  .bar {
    height: 88px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 56px;
      height: 56px;
      background-color: #5d9ff8;
      border-radius: 4px;
    }
    .left {
      border-right: 1px solid #e8e8e8;
      width: 320px;
      display: flex;
      .cnt {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 8px;
      }
    }
  }
}
</style>

