import md5 from "js-md5";
import {Ajax} from "utils/axios";



export const getPeopleList = (data) => {
  return Ajax.request({
    url: "/oa/ums/user/systemOrganization/page",
    method: "post",
    data
  });
};
/* 获取部门树 */
export const getOrganizationTree = ({
  organizationGroupId
}) => {
  const data = {
    organizationGroupId
  };
  return Ajax.request({
    url: "/oa/ums/organizationGroup/tree",
    data,
    method: "post"
  });
};

/* 部门新增编辑删除 */
export const organizationOperate = (params, type) => {
  const data = params;
  let urlMap = {
    'add': '/oa/ums/organizationGroup/create',
    'edit': '/oa/ums/organizationGroup/update',
    'delete': '/oa/ums/organizationGroup/delete'
  };
  return Ajax.request({
    url: urlMap[type],
    data,
    method: "post"
  });
};

/* 获取部门成员列表 */
export const getOrganizationMembers = (params) => {
  return Ajax.request({
    url: "/oa/ums/organizationGroupMember/list",
    data: params,
    method: "post"
  });
};


/* 获取部门上级领导列表 */
export const getOrganizationLeaders = (params) => {
  return Ajax.request({
    url: "oa/ums/organizationGroupMember/fatherLeaderList",
    data: params,
    method: "post"
  });
};

/* 获取部门详情 */
export const getOrganizationInfo = ({
  organizationGroupId
}) => {
  const data = {
    organizationGroupId
  };
  return Ajax.request({
    url: "/oa/ums/organizationGroup/detail",
    data,
    method: "post"
  });
};

/* 获取成员详情 */
export const getMemberInfo = (params) => {
  return Ajax.request({
    url: "/oa/ums/user/detail",
    data: params,
    method: "post"
  });
};

/* 部门成员新增编辑删除 */
export const membersOperate = (params, type) => {
  const data = params;
  let urlMap = {
    'add': '/oa/ums/regeister/mobileGroupRole',
    'edit': '/oa/ums/user/update',
    'delete': '/oa/ums/organizationGroupMember/deleteList'
  };
  return Ajax.request({
    url: urlMap[type],
    data,
    method: "post"
  });
};

/* 部门成员停用和启用 */
export const userOperate = (params, type) => {
  const data = params;
  let urlMap = {
    'start': '/oa/ums/user/start',
    'stop': '/oa/ums/user/stop'
  };
  return Ajax.request({
    url: urlMap[type],
    data,
    method: "post"
  });
};


/* 获取角色分组信息 */
export const getOrganizationRoleTree = () => {
  const data = {};
  return Ajax.request({
    url: "/oa/ums/organizationRoleGroup/list",
    data,
    method: "post"
  });
};

/* 操作角色分组 */
export const roleGroupOperate = (params, type) => {
  let roleMap = {
    'add': '/oa/ums/organizationRoleGroup/create',
    'edit': '/oa/ums/organizationRoleGroup/update',
    'delete': '/oa/ums/organizationRoleGroup/delete'
  };
  return Ajax.request({
    url: roleMap[type],
    data: params,
    method: "post"
  });
};

/* 获取已分组角色信息 */
export const getOrganizationRoleSubtree = (params) => {
  return Ajax.request({
    url: "/oa/ums/organizationRole/list",
    data: params,
    method: "post"
  });
};

/* 操作角色 */
export const roleOperate = (params, type) => {
  let roleMap = {
    'add': '/oa/ums/organizationRole/create',
    'edit': '/oa/ums/organizationRole/update',
    'delete': '/oa/ums/organizationRole/delete'
  };
  return Ajax.request({
    url: roleMap[type],
    data: params,
    method: "post"
  });
};

/* 获取角色权限信息 */
export const getPermissionInfo = (params) => {
  return Ajax.request({
    url: params.roleId ? "/oa/ums/resource/tree/role" : "/oa/ums/resource/tree",
    data: params,
    method: "post"
  });
};

/* 编辑角色权限信息 */
export const editPermission = (params) => {
  return Ajax.request({
    url: params ? "/oa/ums/resource/tree/role" : "/oa/ums/resource/tree",
    data: params,
    method: "post"
  });
};
