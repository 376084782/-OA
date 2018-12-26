export function setCookie (name, value, days) {
  days = days || 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toUTCString() + ';path=/';
}

export function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  let matched = document.cookie.match(reg);
  if (matched) {
    return decodeURI(matched[2]);
  }
  return null;
}

export function delCookies (name) {
  var exp = new Date();
  var oldCookies = this.getCookies(name);
  exp.setTime(exp.getTime() - 1);
  if (oldCookies) {
    document.cookie = name + '=' + oldCookies + ';expires=' + exp.toUTCString() + ';path=/';
  }
}

export function addCookies (name, value, days) {
  if (!days) {
    days = 90;
  }
  var exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 3600000);
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  var matched = document.cookie.match(reg);
  if (matched) {
    var oldValue = matched[2];
    var newValue = oldValue + '&' + encodeURI(value);
    document.cookie = name + '=' + newValue + ';expires=' + exp.toUTCString() + ';path=/';
  }
}
