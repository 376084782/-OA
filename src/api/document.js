import {
  Ajax
} from "utils/axios";


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

