import Vue from 'vue'
import store from 'store'
import {
  getOrganizationTree
} from 'api/index'
const state = {
  data: {},
  currentUserInfo: {},
  currentOrgInfo: {}
};
const actions = {
  getCurrentUserInfo({
    state
  }) {
    let {
      userInfo,
    } = store.state.login;
    Vue.set(state.data, 'getCurrentUserInfo', [{
      value: userInfo.userId + '',
      name: userInfo.userName
    }])
    state.currentUserInfo = {
      value: userInfo.userId + '',
      name: userInfo.userName
    }
  },
  getCurrentUserGroupList({
    state
  }) {
    let {
      groupList
    } = store.state.login;
    let list = [];
    groupList.forEach(item => {
      list.push({
        value: item.organizationGroupId + '',
        name: item.name
      })
    })
    Vue.set(state.data, 'getCurrentUserGroupList', list);
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
  getGroupList({
    state
  }) {
    getOrganizationTree({
      organizationGroupId: -1
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
