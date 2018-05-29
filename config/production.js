const path = require('path');
module.exports = {
  env: 'development',
  port: 8880,
  basepath: __dirname,
  viewspath: path.join(__dirname, '../views')
};
