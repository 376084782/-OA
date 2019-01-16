import store from 'store'
import {
  getOrganizationTree
} from 'api/permission'
export function getCurrentUserInfo() {
  return new Promise(rsv => {
    let {
      userInfo,
    } = store.state.login;
    rsv([{
      value: userInfo.userId,
      name: userInfo.userName
    }])
  })
}

export function getCurrentUserGroupList() {
  let {
    groupList
  } = store.state.login;
  return new Promise(rsv => {

    let list = [];
    groupList.forEach(item => {
      list.push({
        value: item.organizationGroupId,
        name: item.name
      })
    })
    rsv(list);
  })
}

export function getGroupList() {
  return new Promise(rsv => {
    getOrganizationTree({
      organizationGroupId: -1
    }).then(({
      organizationGroupList
    }) => {
      let list = []
      organizationGroupList.forEach(item => {
        list.push({
          name: item.name,
          value: item.organizationCode
        })
      })
      console.log(list,'list')
      rsv(list);
    })
  })
}

export function getProcessUserList(modalType) {
  let {
    groupList
  } = store.state.login;
  return new Promise(rsv => {

    let list = [];
    groupList.forEach(item => {
      list.push({
        key: item.organizationGroupId,
        value: item.name
      })
    })
    rsv(list);
  })
}


export const funcMap = {
  getCurrentUserInfo,
  getCurrentUserGroupList,
  getGroupList,
  getProcessUserList
}
