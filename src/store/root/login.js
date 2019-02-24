import {
  login,
  logout,
  loginLP,
  getInfo,
  getCode
} from 'api/index';
import {
  setTokenSystem,
  setTokenPlatform
} from 'utils/assist.js'
import router from 'router'
const state = {
  // 用户登录信息
  userInfo: {},
  flagGetInfo: false,
  groupList: [],
  deviceCode:''
};
import store from 'store'
const getters = {
  // 角色
  name: state => {
    return state.userInfo.name
  },
  mobile: state => state.userInfo.mobile,
  currentOrgInfo: state => {
    return {
      name: state.groupList[0].name,
      value: state.groupList[0].organizationId + ''
    }
  },
  currentUserInfo: state => {
    return {
      name: state.userInfo.name,
      value: state.userInfo.userId + ''
    }
  }
};

const mutations = {};

const actions = {
  updateCode({state}){
    getCode().then(e => {
      // console.log(e)
    });
    // deviceCode
  },
  loginErr({state}){
    state.flagGetInfo = false;
    state.userInfo = {};
    setTokenPlatform('')
    setTokenSystem('');
    router.push('/login')
  },
  userGetInfo({
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(e => {
        state.userInfo = e.user;
        state.groupList = e.organizationGroupList;
        state.flagGetInfo = true;
        store.dispatch('updateMenuList').then(e => {
          resolve();
        })
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
        // state.flagGetInfo = true;
        setTokenPlatform(e.platformToken)
        setTokenSystem(e.systemToken);
        loginLP().then(() => {
          store.dispatch('updateMenuList').then(e => {
            resolve();
          })
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
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
