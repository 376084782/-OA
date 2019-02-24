import axios from "axios";
import store from "store";
import {
  dateFormater,
  getParams,
  getToken
} from "utils/assist";
// import { Spin } from 'iview'
import vue from 'vue'

let deviceCode = localStorage.getItem('deviceCode') || '1121212';
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo;
  let info = {
    type: "ajax",
    code: status,
    mes: statusText,
    url: responseURL
  };
  if (!responseURL.includes("save_error_logger"))
    store.dispatch("addErrorLog", info);
};

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    let tokenConfig = getToken();
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "system": 1000,
        "device-type": 1,
        "device-code": deviceCode,
        "trade-time": dateFormater(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
        "Content-Type": "application/json",
        "platform-token": tokenConfig.tokenPlatform || "",
        "system-token": tokenConfig.tokenSystem || "",
        "organization": 10000000
      }
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        const {
          data,
          status,
          headers
        } = res;
        return {
          data,
          status,
          headers
        };
      },
      error => {
        this.destroy(url);
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: {
              statusText,
              status
            },
            config
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: {
              responseURL: config.url
            }
          };
        }
        return Promise.reject(error);
      }
    );
  }
  request(options1) {
    const instance = axios.create();
    let baseConfig = this.getInsideConfig();
    if (options1) {
      Object.assign(baseConfig.headers, options1.headers)
    }
    let options = Object.assign(options1, baseConfig);
    this.interceptors(instance, options.url);
    let request = instance(options);
    return new Promise((res, rej) => {
      request
        .then(({
          status,
          data,
          headers
        }) => {
          if (headers['picturetoken']) {
            deviceCode = headers['picturetoken']
            localStorage.setItem('deviceCode', deviceCode);
          }
          let code = +headers["businessstatus"] || 200;
          let msg = headers["message"];
          headers = Object.assign(headers, options.headers);
          if (code <= 299 && code >= 200) {
            res(data);
          } else {
            let errData = {
              code: code,
              message: decodeURIComponent(msg)
            };
            console.warn(errData, '请求返回异常')
            if (options.url == '/oa/ums/user/info') {
              store.dispatch('loginErr')
            } else {
              vue.prototype.$alert(errData.message)
            }
            rej(errData);
          }
        })
        .catch(({
          response
        }) => {
          if (response) {
            let headers = response["headers"] || {};
            let code = +headers["business-status"] || 200;
            let msg = headers["message"];
            let errData = {
              code: code,
              message: decodeURIComponent(msg)
            };
            vue.prototype.$alert(errData.message);
            rej(errData);
          } else {
            rej();
          }
        });
    });
  }
}

export const baseUrl =
  // "http://rap2api.taobao.org/app/mock/46476" 
  "http://47.110.51.157:9030"

export const Ajax = new HttpRequest(baseUrl);
