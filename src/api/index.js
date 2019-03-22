import md5 from "js-md5";
import {
  Ajax
} from "utils/axios";


export const getCode = (data) => {
  return Ajax.request({
    url: "/oa/ums/userVerificationCode/picture/generate",
    method: "post",
    data
  });
};

export const getIndexPageData = (data) => {
  return Ajax.request({
    url: "/oa/flow/index/detail",
    method: "post",
    data
  });
};

export const finishTask = (data) => {
  return Ajax.request({
    url: "oa/flow/processUserLog/create",
    method: "post",
    data
  });
};
export const getFlowNum = (modelType) => {
  return Ajax.request({
    url: "/oa/flow/processUser/modelType/number",
    method: "post",
    data: {
      modelType
    }
  });
};
export const getListProcess = ({
  modelTypeList = [100],
  keyWord = '',
  startTime = '',
  deadTime = '',
  pageNo = 1,
  pageSize = 20,
  dateFormat = '%Y-%m-%d',
  organization = null,
  pageSearchStatus = null
}) => {
  return Ajax.request({
    url: "/oa/flow/processUser/page/receive",
    method: "post",
    data: {
      modelTypeList,
      keyWord,
      startTime,
      deadTime,
      pageNo,
      pageSize,
      dateFormat,
      organization,
      pageSearchStatus
    }
  });
};

export const getListMySendProcess = (data) => {
  data.dateFormat = data.dateFormat || '%Y-%m-%d';
  data.pageNo = data.pageNo || 1
  data.pageSize = data.pageSize || 20
  return Ajax.request({
    url: "/oa/flow/processUser/page/send",
    method: "post",
    data
  });
};

export const createFlow = data => {
  return Ajax.request({
    url: "/oa/flow/processUserButton/submit",
    method: "post",
    data
  });
};
export const agree = data => {
  return Ajax.request({
    url: "/oa/flow/processUserButton/agree",
    method: "post",
    data
  });
};

export const processRecall = data => {
  return Ajax.request({
    url: "/oa/flow/processUserButton/recall",
    method: "post",
    data
  });
};

export const disAgree = data => {
  return Ajax.request({
    url: "/oa/flow/processUserButton/unAgree",
    method: "post",
    data
  });
};

export const refuse = data => {
  return Ajax.request({
    url: "/oa/flow/processUserButton/refuse",
    method: "post",
    data
  });
};

export const getPeopleListByRole = ({
  organizationRoleIdList
}) => {
  return Ajax.request({
    url: "/oa/ums/organizationRoleMember/list",
    method: "post",
    data: {
      organizationRoleIdList
    }
  });
};
export const getPeopleListByOrg = ({
  organizationGroupIdList
}) => {
  return Ajax.request({
    url: "/oa/ums/organizationGroupMember/list",
    method: "post",
    data: {
      organizationGroupIdList
    }
  });
};
export const uploadSchedualFile = ({
  headers,
  data
}) => {
  return Ajax.request({
    url: "/oa/flow/workPlanExcel/file/analysis",
    method: "post",
    headers,
    data
  });
};

export const getInfo = () => {
  return Ajax.request({
    url: "/oa/ums/user/info",
    method: "post"
  });
};

export const login = ({
  loginAccount = "",
  password = ""
}) => {
  const data = {
    loginAccount,
    password: md5(password)
  };
  return Ajax.request({
    url: "/oa/ums/login/password",
    data,
    method: "post"
  });
};

export const loginLP = () => {
  return Ajax.request({
    url: "/oa/ums/login/token",
    method: "post"
  });
};
export const logout = () => {
  return Ajax.request({
    url: "/oa/ums/login/logout",
    method: "post"
  });
};

export const getClubList = ({
  loginAccount,
  password
}) => {
  const data = {
    loginAccount,
    password: 2
  };
  return Ajax.request({
    url: "/oa/flow/processUser/create",
    data,
    method: "post"
  });
};

// 解析值班excel
export const analyseExcel = ({
  type,
  startDate,
  endDate,
  excelFile
}) => {
  const data = {
    type,
    startDate,
    endDate,
    excelFile
  };
  return Ajax.request({
    url: "/oa/flow/workPlanExcel/file/analysis",
    data: {
      excelFile
    },
    headers: {
      type,
      startDate,
      endDate
    },
    method: "post"
  });
};

// 查询值班

export const scedualSearch = ({
  groupName = "",
  startDate = "",
  endDate = "",
  name = "",
  userId = undefined
}) => {
  const data = {
    groupName,
    startDate,
    endDate,
    name,
    userId
  };
  return Ajax.request({
    url: "/oa/flow/workPlan/list",
    data,
    method: "post"
  });
};

let testContent = [{
  name: '关联公文',
  code: 'combine',
  type: 'combine'
}]
let testData = {
  processUserDetailResponseList: [{
    processUser: {
      content: JSON.stringify(testContent)
    },
    processUserStepList: []
  }]
}

export const getFormTemp = ({
  modelType = 400,
  fatherProcessUserWatchId = "",
  fatherProcessUserId = ''
}) => {
  // if(modelType!=400){
  //   return new Promise(rsv=>{
  //     rsv(testData)
  //   })
  // }
  return Ajax.request({
    url: "/oa/flow/processOrganization/list/model",
    data: {
      modelType,
      fatherProcessUserWatchId,
      fatherProcessUserId
    },
    method: "post"
  });
};

export const getProcessDetail = (data) => {
  return Ajax.request({
    url: "/oa/flow/processUserDetail/list",
    data,
    method: "post"
  });
};
export const showWen = (data) => {
  return Ajax.request({
    url: "/oa/flow/processUserButton/watchRead",
    data,
    method: "post"
  });
};

export const getOrganizationTree = () => {
  return Ajax.request({
    url: "/oa/ums/organizationGroup/list",
    data: {},
    method: "post"
  });
};

export const getMenuList = () => {
  return Ajax.request({
    url: "/oa/ums/resource/menuTree",
    data: {},
    method: "post"
  });
};


export const zhuanban = (data) => {
  return Ajax.request({
    url: "/oa/flow/processUserButton/transfer",
    data,
    method: "post"
  });
};


export const getStatusList = (data) => {
  return Ajax.request({
    url: "/oa/flow/processUser/map/status",
    data,
    method: "post"
  });
};

export const getSenderList = (data) => {
  return Ajax.request({
    url: "/oa/ums/systemOrganization/page",
    data,
    method: "post"
  });
};

export const userGroupList = (data) => {
  return Ajax.request({
    url: "/oa/ums/organizationGroup/userGroup/list",
    data,
    method: "post"
  });
};

export const organizationRoleDel = (data) => {
  return Ajax.request({
    url: "/oa/ums/organizationRole/delete",
    data,
    method: "post"
  });
};

export const organizationRoleGroupDel = (data) => {
  return Ajax.request({
    url: "/oa/ums/organizationRoleGroup/delete",
    data,
    method: "post"
  });
};

export const organizationGroupTypeList = (data) => {
  return Ajax.request({
    url: "/oa/ums/organizationGroup/organizationGroupTypeList",
    data,
    method: "post"
  });
};


export const fatherOrganizationGroupTypeList = (data) => {
  return Ajax.request({
    url: "/oa/ums/organizationGroup/fatherOrganizationGroupTypeList",
    data,
    method: "post"
  });
};

