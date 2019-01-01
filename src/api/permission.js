import md5 from "js-md5";
import {Ajax} from "utils/axios";

/* 获取部门树 */
export const getDepartmentTree = ({
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
export const departmentOperate = (params, type) => {
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
export const getDepartmentMembers = ({
  organizationGroupId
}) => {
  const data = {
    organizationGroupId
  };
  return Ajax.request({
    url: "/oa/ums/organizationGroup/currentUser/list",
    data,
    method: "post"
  });
};