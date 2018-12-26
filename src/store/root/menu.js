// import {
//   updateMenu
// } from '@/api/user'

function formatData(data) {
  let res = [];
  data.forEach(item => {
    let data = {
      title: item.funName
    }
    if (item.functionList) {
      data.subMenu = formatData(item.functionList);
    } else if (item.url) {
      data.path = item.url;
    }
    res.push(data)
  })
  return res;
}
const menuList = {
  state: {
    list: [{
      title: '系统首页',
      icon: 'home',
      subMenu: []
    }, {
      title: '公文管理',
      icon: 'folder',
      subMenu: [{
        title: '公文发起',
        path: '/document/sponse'
      }, {
        title: '收文分派',
        path: '/document/sponse'
      }, {
        title: '待办已办',
        path: '/document/sponse'
      }, {
        title: '待收已收',
        path: '/document/sponse'
      }, {
        title: '归档公文',
        path: '/document/sponse'
      }]
    }, {
      title: '任务管理',
      icon: 'book',
      subMenu: []
    }, ]
  },
  mutations: {
    setMenu(state, data) {
      state.mainList = data;
    },
  },
  actions: {
    // updateMenuList({
    //   state,
    //   commit,
    //   rootGetters
    // }) {
    //   updateMenu(rootGetters.roleId).then(({
    //     functionList,
    //     quickFunctionList
    //   }) => {
    //     return;
    //     commit('setMenu', formatData(functionList));
    //   })
    // }
  },
  getters: {
    menuList: state => state.list
  }
}
export default menuList;
