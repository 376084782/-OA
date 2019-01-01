import {
  login,
  logout,
  loginLP,
  getInfo
} from 'api/index';
import {
  setTokenSystem,
  setTokenPlatform
} from 'utils/assist.js'
const state = {
  // 用户登录信息
  userInfo: {},
  flagGetInfo: false,
  groupList: []
};

const getters = {
  // 角色
};

const mutations = {};

const actions = {
  userGetInfo({
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(e => {
        state.userInfo = e.user;
        state.groupList = e.organizationGroupList;
        state.flagGetInfo = true;
        resolve();
      }).catch(e => {
        reject(e);
      });
    });
  },
  userLogin({
    state
  }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(e => {
        state.userInfo = e.user;
        state.groupList = e.organizationGroupList;
        state.flagGetInfo = true;
        setTokenPlatform(e.platformToken)
        setTokenSystem(e.systemToken);
        loginLP().then(() => {
          resolve(e);
        }).catch(e => {
          reject(e);
        })
      }).catch(e => {
        reject(e);
      });
    });
  },
  userLogout({
    state
  }) {
    return new Promise((resolve, reject) => {
      logout().then(e => {
        state.flagGetInfo = false;
        state.userInfo = {};
        setTokenPlatform('')
        setTokenSystem('');
        resolve(e);
      }).catch(e => {
        reject(e);
      });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
