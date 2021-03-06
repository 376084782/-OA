import Vue from 'vue'
import store from 'store'
import {
  getOrganizationTree,
  scedualSearch,
  organizationGroupTypeList,
  fatherOrganizationGroupTypeList
} from 'api/index'
import {
  getPeopleList,
  getDanWeiList,
  getOrganizationMembers
} from 'api/permission'
import {
  getProcessCodeList
} from 'api/document'
const state = {
  data: {},
  currentUserInfo: {},
  currentOrgInfo: {}
};
const actions = {
  setData({
    state
  }, {
    code,
    data
  }) {
    Vue.set(state.data, code, data);
  },
  getDanWeiList({
    state
  }) {
    getDanWeiList().then(e => {

    })
  },
  getCurrentGroupUserList({
    state
  }) {
    getOrganizationMembers({
      organizationGroupIdList: [store.state.login.groupList[0].organizationGroupId]
    }).then(({
      userList
    }) => {
      let list = [];
      userList.forEach(item => {
        list.push({
          value: item.userId + '',
          name: item.name
        })
      })
      Vue.set(state.data, 'getCurrentGroupUserList', list);
    })
  },
  getCurrentUserInfo({
    state
  }) {
    let {
      userInfo,
    } = store.state.login;
    Vue.set(state.data, 'getCurrentUserInfo', [{
      value: userInfo.userId + '',
      name: userInfo.name
    }])
    state.currentUserInfo = {
      value: userInfo.userId + '',
      name: userInfo.name
    }
  },
  getCurrentUserGroupList({
    state
  }) {
    let {
      groupList
    } = store.state.login;
    let list = [];
    groupList && groupList.forEach(item => {
      list.push({
        value: item.organizationGroupId + '',
        name: item.name
      })
    })
    Vue.set(state.data, 'getCurrentUserGroupList', list);
  },
  getSendOrganizationGroupList({
    state
  }) {
    organizationGroupTypeList({
      type: 1
    }).then(({
      organizationGroupList
    }) => {
      let list = []
      organizationGroupList.forEach(item => {
        list.push({
          name: item.name,
          value: item.organizationGroupId + ''
        })
      })
      Vue.set(state.data, 'getSendOrganizationGroupList', list);
    })
  },
  getOrganizationUserGroupInfo({
    state
  }) {
    fatherOrganizationGroupTypeList({
      organizationGroupId: store.getters.organizationGroupId
    }).then(({
      organizationGroupList
    }) => {
      let list = []
      organizationGroupList.forEach(item => {
        list.push({
          name: item.name,
          value: item.organizationGroupId + ''
        })
      })
      Vue.set(state.data, 'getOrganizationUserGroupInfo', list);
    })
  },
  getCurrentUserGroupInfo({
    state
  }) {
    getOrganizationTree({
      organizationGroupId: -1
    }).then(({
      organizationGroupList
    }) => {
      let list = [];
      organizationGroupList.forEach(item => {
        list.push({
          name: item.name,
          value: item.organizationGroupId + ''
        })
      })
      Vue.set(state.data, 'getCurrentUserGroupInfo', list);
    })
  },
  getFixUserGroupList({

  }) {

  },
  getWorkPlanList({
    state
  }, data = {}) {
    // scedualSearch(data).then(({
    //   tableResponse
    // }) => {
    //   let list = []
    //   tableResponse.list.forEach(item => {
    //     list.push({
    //       name: item.name,
    //       value: item.userId + ''
    //     })
    //   })
    //   Vue.set(state.data, 'getUserList', list);
    // })
  },
  getUserList({
    state
  }) {
    getPeopleList({
      pageNo: 1,
      pageSize: 9999,
    }).then(({
      tableResponse
    }) => {
      let list = []
      tableResponse.list.forEach(item => {
        list.push({
          name: item.name,
          value: item.userId + ''
        })
      })
      Vue.set(state.data, 'getUserList', list);
    })
  },
  getGroupDocumentCode({
    state
  }) {
    getProcessCodeList({
      processGroupCodeList: ["document-send-code", "ducument-receive-code"]

    }).then(({
      processCodeList
    }) => {
      let list = []
      processCodeList.forEach(item => {
        list.push({
          name: item.code,
          value: item.processCodeGroupId + ''
        })
      })
      Vue.set(state.data, 'getGroupDocumentCode', list);
    })
  },
  getGroupList({
    state
  }, level = 2) {
    getDanWeiList({
      level,
      organizationGroupId: store.state.login.groupList[0] && store.state.login.groupList[0].organizationGroupId
    }).then(({
      organizationGroupList
    }) => {
      let list = []
      organizationGroupList.forEach(item => {
        list.push({
          name: item.name,
          value: item.organizationGroupId + ''
        })
      })
      Vue.set(state.data, 'getGroupList', list);
    })
  },
  getProcessUserList({
    state
  }) {

  }
}
const getters = {
  getDataByFuncName: state => (conf) => {
    let funcName = conf.data.function;
    if (!state.data[funcName]) {
      Vue.set(state.data, funcName, []);
    }
    return state.data[funcName];
  }
};

const mutations = {};

export default {
  state,
  getters,
  mutations,
  actions
};
