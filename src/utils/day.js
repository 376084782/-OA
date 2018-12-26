import dayjs from 'dayjs';

export function now () {
  return dayjs().format('YYYY-MM-DD');
}

export function nowTime () {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

export function beforeNow (days) {
  return dayjs().subtract(days, 'day').format('YYYY-MM-DD');
}

export function lastMonth () {
  return dayjs().subtract(1, 'month').format('YYYY-MM-DD');
}
/* eslint-disable */
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}
Date.prototype.Format = Date.prototype.format;