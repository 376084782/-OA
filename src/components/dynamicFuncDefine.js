import store from 'store'

export function getCurrentUserInfo() {
  let {
    userInfo,
  } = store.state.login;
  return [{
    key: userInfo.userId,
    value: userInfo.userName
  }]
}

export function getCurrentUserGroupList() {
  let {
    groupList
  } = store.state.login;
  let list = [];
  groupList.forEach(item => {
    list.push({
      key: item.organizationGroupId,
      value: item.name
    })
  })
  console.log(store.state.login,'22223232')
  return list;
}

export const funcMap = {
  getCurrentUserInfo,
  getCurrentUserGroupList,
}
