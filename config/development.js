const path = require("path");
module.exports = {
  env: "development",
  port: "8080",
  basepath: __dirname,
  viewspath: path.join(__dirname, "../views"),
};
