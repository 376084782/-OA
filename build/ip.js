const config = require('../config');
const port = config.dev.port;
const os = require('os');
const ifaces = os.networkInterfaces();
let iptable = '';
for (let dev in ifaces) {
  ifaces[dev].forEach( function (details, alias) {
    if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
      iptable = details.address;
    }
  });
}
const address = `http://${iptable}:${port}`;

module.exports = address;
