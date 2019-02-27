export default function scrollToTop(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) return;

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(0, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
};
/* 导出 */
export function downloadFile(url) {
  if (typeof (downloadFile.iframe) === 'undefined') {
    var iframe = document.createElement('iframe');
    downloadFile.iframe = iframe;
    document.body.appendChild(downloadFile.iframe);
  }
  downloadFile.iframe.src = url;
  downloadFile.iframe.style.display = 'none';
  window.$message.warning('正在下载，请稍等...');
};
/* 序列化 */
export function serialize(obj) {
  if (obj === null || typeof obj !== 'object') {
    return;
  }
  var url = '?';
  for (let key in obj) {
    var value = obj[key];
    if (Array.isArray(value)) {
      value.forEach((element, index) => {
        if (index === 0) {
          url = url + key + '=' + element;
        } else {
          url = url + ',' + element;
        }
        if (index === (value.length - 1)) {
          url += '&';
        }
      });
    } else {
      if (value === '' || value == null) {
        value = '';
      }
      url = url + key + '=' + value + '&';
    }
  }
  if (window.gameKey) {
    url = url + 'x_game=' + window.gameKey;
    return url;
  } else {
    return url.slice(0, -1);
  }
};
// 数字转为金融字符 例如 50000=>50,000
export function numToLocal(num) {
  let re = Number(num).toLocaleString();
  re = isNaN(num) ? '/' : re;
  return re;
};

// 数字转为缩略字符 例如 50000=>5万
export function numToStr(num) {
  let re = '';
  num = num === '' ? 0 : num;
  if (num >= 100000000) {
    re = (num / 100000000).toFixed(2) + '亿';
  } else if (num >= 10000) {
    re = (num / 10000).toFixed(2) + '万';
  } else {
    re = num;
  }
  return re;
};

const TOKEN_KEY = 'TOKEN_KEY'
export const setTokenSystem = (token) => {
  let config = getToken();
  config.tokenSystem = token;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(config));
}
export const setTokenPlatform = (token) => {
  let config = getToken();
  config.tokenPlatform = token;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(config));
}

export const getToken = () => {
  // 如果当天本地记录有token,直接用于登录
  let tokenData = localStorage.getItem(TOKEN_KEY);
  if (tokenData) {
    tokenData = JSON.parse(tokenData);
  } else {
    tokenData = {};
  }
  return tokenData;
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  let str = url.split('?')[1];
  if (!str) {
    return {};
  }
  const keyValueArr = str.split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}
export function dateFormater(timeStamp, fmt) {
  if (!isNaN(0 * timeStamp) && timeStamp.length == 10) {
    timeStamp *= 1000;
  }
  /**
   * @fix 解决ios系统不支持横杠写法(如:2018-8-8 10:22)的显示bug
   * @date 2018/12/25
   */
  if (typeof (timeStamp) == 'string') {
    timeStamp = timeStamp.replace(/\-/g, '/')
  }
  let date = new Date(timeStamp);
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


export function timeFormater(sec, fmt) {
  let day = Math.floor(sec / 24 / 60 / 60);
  sec -= day * 24 * 60 * 60;
  let hour = Math.floor(sec / 60 / 60);
  sec -= hour * 60 * 60;
  let min = Math.floor(sec / 60);
  sec -= min * 60;
  var o = {
    "d+": day,
    "h+": hour,
    "m+": min,
    "s+":sec
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
export function formatValueContentToList(dataJson) {
  let data = {};
  if (typeof dataJson == 'string') {
    data = JSON.parse(dataJson)
  } else {
    data = dataJson
  }
  let map = {};
  data.forEach(item => {
    let value = item.value;
    if (value.indexOf('{') > -1 || value.indexOf('[') > -1) {
      value = JSON.parse(value);
      if (Array.isArray(value)) {
        let list = value.concat();
        value = ''
        list.forEach(item => {
          if (value) {
            value += ','
          }
          value += item.name
        })

      } else {
        value = value.name
      }
    }
    map[item.code] = value;
  })
  return map;
}
export function formatValueContentToListObject(dataJson) {
  let data = {};
  if (typeof dataJson == 'string') {
    data = JSON.parse(dataJson)
  } else {
    data = dataJson
  }
  let map = {};
  data.forEach(item => {
    let value = item.value;
    if (value.indexOf('{') > -1 || value.indexOf('[') > -1) {
      value = JSON.parse(value);
    }
    map[item.code] = value;
  })
  return map;
}
