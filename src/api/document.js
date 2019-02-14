import {
  Ajax
} from "utils/axios";


export const getListChild = data => {
  return Ajax.request({
    url: "oa/flow/processUser/list/chlidren",
    method: "post",
    data
  });
};

export const getListAll = data => {
  return Ajax.request({
    url: "/oa/flow/processUser/page/all",
    method: "post",
    data
  });
};

export const getListSend = data => {
  return Ajax.request({
    url: "/oa/flow/processUser/page/send",
    method: "post",
    data
  });
};

export const getListGet = data => {
  return Ajax.request({
    url: "/oa/flow/processUser/page/receive",
    method: "post",
    data
  });
};

export const getListAssign = data => {
  return Ajax.request({
    url: "/oa/flow/processUser/page/handle",
    method: "post",
    data
  });
};

export const getDetailListReceive = data => {
  return Ajax.request({
    url: "/oa/flow/processUserDetail/watchList",
    method: "post",
    data
  });
};


export const getProcessCodeList = data => {
  return Ajax.request({
    url: "/oa/flow/processCode/list",
    method: "post",
    data
  });
};
export const createProcessCode = data => {
  return Ajax.request({
    url: "/oa/flow/processCode/create",
    method: "post",
    data
  });
};
export const delProcessCode = data => {
  return Ajax.request({
    url: "/oa/flow/processCode/delete",
    method: "post",
    data
  });
};
export const updateProcessCode = data => {
  return Ajax.request({
    url: "/oa/flow/processCode/update",
    method: "post",
    data
  });
};
export const detailProcessCode = data => {
  return Ajax.request({
    url: "oa/flow/processCode/detail",
    method: "post",
    data
  });
};

export const getSFType = data => {
  return Ajax.request({
    url: "/oa/flow/processCodeGroup/list",
    method: "post",
    data
  });
};
