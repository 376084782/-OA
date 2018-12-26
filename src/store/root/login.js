import { getUserInfo } from 'api/index';
const state = {
  // 用户登录信息
  userInfo: {
    current_scope: '',
    menu: [],
    scopes: '',
    roles: [],
    user_info: {
      account: '',
      avatar: '',
      nickname: ''
    }
  },
  // 当前选择的游戏作用域
  gameKey: '',
  applists: []
};

const getters = {
  // 角色
  manager: state => {
    return state.userInfo.roles.some(role => role === 'manager');
    // return state.userInfo.roles.some(role => role !== 'manager');
  },
  user_info: state => state.userInfo.user_info,
  current_scope: state => state.userInfo.current_scope
};

const mutations = {
  updateUserInfo (state, object) {
    let games = object.games[0];
    let gameKey = '';
    if (!games) {
      window.gameKey = '';
      localStorage.removeItem('gameKey');
      localStorage.removeItem('singleUser');
    } else {
      gameKey = games.key;
      let localGameKey = localStorage.getItem('gameKey');
      if (localGameKey) {
        gameKey = localGameKey;
      }
      state.gameKey = window.gameKey = gameKey;
      window.scopeId = object.current_scope ? object.current_scope.id : '';
      localStorage.setItem('gameKey', gameKey);
    }
    state.userInfo = object;
  }
};

const actions = {
  login (context) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(data => {
        context.commit('updateUserInfo', data);
        resolve(data.menu);
      }).catch(data => {
        if (data.code === 401) {
          document.location.href = data.data.refererUrl;
        } else {
          reject(data);
        }
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
