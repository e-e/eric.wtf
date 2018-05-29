const path = require('path');
const express = require('express');
const ghost = require('ghost');
const app = express();
const utils = require('./node_modules/ghost/core/server/utils');

const config = require('./config');

const routes = {
  index: require('./routes/index'),
  slackmojify: require('./routes/slackmojify')
};

ghost().then(function(ghostServer) {
  app.use('/ramen', ghostServer.rootApp);
  ghostServer.start(app);
  app.use('/static', express.static(path.resolve('./static')));
  app.use('/slackmojify', routes.slackmojify);
  app.use('/', routes.index);
});

app.listen(config.port, () =>
  console.log(`listening on http://localhost:${config.port}/`)
);

module.exports = app;
