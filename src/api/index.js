/* 获取基本信息 */
export function getUserInfo (params) {
  return window.ajax({
    url: '/api/info/base',
    data: params
  });
};

/* 获取俱乐部列表 */
export function getClubList (params) {
  return window.ajax({
    url: '/api/club/list',
    data: params
  });
};

/* 获取俱乐部详情 */
export function getClubInfo (params) {
  return window.ajax({
    url: '/api/club/detail',
    data: params
  });
};

/* 获取俱乐部成员列表 */
export function getClubMembers (params) {
  return window.ajax({
    url: '/api/club/members',
    data: params
  });
};

/* 获取图片上传ticket */
export function upload (params) {
  return window.ajax({
    url: '/api/upload/oss/ticket',
    data: params
  });
};

/* 俱乐部操作 */
export function clubOperate (params, type) {
  let operateMap = {
    remove: '/api/club/remove',
    ban: '/api/club/ban',
    transfer: '/api/club/transfer',
    modify: '/api/club/modify',
    recovery: '/api/club/recovery'
  };
  return window.ajax({
    url: operateMap[type],
    data: params,
    method: 'post'
  });
};
