const path = require('path');
module.exports = {
  env: 'production',
  port: 'PICK A PORT',
  basepath: __dirname,
  viewspath: path.join(__dirname, './views')
};
