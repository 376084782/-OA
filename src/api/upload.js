let getSignatureTime = 0;
let ossInfo = {};

export function getOss (type) {
  return new Promise(function (resolve, reject) {
    let now = Date.parse(new Date()) / 1000;
    if (getSignatureTime + 300 < now) {
      window.ajax({
        url: '/api/upload/oss/ticket',
        data: {
          path: type
        }
      }).then(data => {
        getSignatureTime = now;
        ossInfo = data;
        resolve(data);
      });
    } else {
      resolve(ossInfo);
    }
  });
}
export async function upload (file, type) {
  let filename = randomString(10) + getSuffix(file.name);
  ossInfo = await getOss(type);
  return {
    host: ossInfo.host,
    key: ossInfo.dir + filename,
    policy: ossInfo.policy,
    OSSAccessKeyId: ossInfo.accessid,
    success_action_status: '201',
    signature: ossInfo.signature
  };
}

function getSuffix (filename) {
  let pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

function randomString (len) {
  len = len || 32;
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
