const fs = require("fs");
const path = require("path");
const config = require("../config");

module.exports = {
  index(req, res) {
    res.render("slackmojify");
  },
};
