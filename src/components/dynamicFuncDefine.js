import store from 'store'

let getCurrentUserInfo = () => {
  let {
    userInfo,
  } = store.state.login;
  return [{
    key: userInfo.userId,
    value: userInfo.userName
  }]
}

function getCurrentUserGroupList() {
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
  return list;
}

export const funcMap = {
  getCurrentUserInfo,
  getCurrentUserGroupList
}
