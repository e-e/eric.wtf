const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

module.exports = {
  app: null,
  init(app) {
    this.app = app;
    this.app.use(
      morgan('dev', {
        skip: function(req, res) {
          return res.statusCode < 400;
        }
      })
    );

    // log all requests to access.log
    this.app.use(
      morgan('common', {
        stream: fs.createWriteStream(
          path.join(__dirname, '../logs/access.log'),
          {
            flags: 'a'
          }
        )
      })
    );
  }
};
