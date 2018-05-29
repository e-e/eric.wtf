const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = {
  index(req, res) {
    fs.readFile(
      path.join(config.viewspath, './slackmojify.html'),
      'utf8',
      (err, html) => {
        if (err) {
          throw err;
          return;
        }
        res.send(html);
      }
    );
  }
};
