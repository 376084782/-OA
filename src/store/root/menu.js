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
      subMenu: [{
        title: '系统首页',
        path: '/hp'
      }]
    }, {
      title: '公文管理',
      icon: 'folder',
      subMenu: [{
        title: '公文收发',
        path: '/document/sponse'
      }, {
        title: '公文办理',
        path: '/document/assign'
      }, {
        title: '归档公文',
        path: '/document/arrange'
      },{
        title:'文号管理',
        path:'/document/whgl'
      }]
    }, {
      title: '任务管理',
      icon: 'book',
      subMenu: [{
        title: '任务中心',
        path: '/task/center'
      }]
    }, {
      title: '排班管理',
      icon: 'calendar',
      subMenu: [{
        title: '排班查询',
        path: '/schedual/search'
      }, {
        title: '排班申请',
        path: '/schedual/apply'
      }, {
        title: '调班申请',
        path: '/schedual/applyChange'
      }]
    }, {
      title: '权限管理',
      icon: 'lock',
      subMenu: [{
        title: '组织架构',
        path: '/permission/organization'
      }, {
        title: '角色权限',
        path: '/permission/role'
      }]
    }]
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
