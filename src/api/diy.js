import {
  Ajax
} from "utils/axios";


export const getFlowList = data => {
  return Ajax.request({
    url: "/oa/flow/processGroup/list",
    method: "post",
    data
  });
};

export const createFlowGroup = data => {
  return Ajax.request({
    url: "/oa/flow/processGroup/add",
    method: "post",
    data
  });
};
export const updateFlowGroup = data => {
  return Ajax.request({
    url: "/oa/flow/processGroup/update",
    method: "post",
    data
  });
};
export const delFlowGroup = data => {
  return Ajax.request({
    url: "/oa/flow/processGroup/delete",
    method: "post",
    data
  });
};