const path = require('path');
const express = require('express');
const app = express();

const config = require('../config');

const routes = {
  index: require('../routes/index'),
  slackmojify: require('../routes/slackmojify')
};

app.use('/static', express.static(path.resolve('../static')));
app.use('/slackmojify', routes.slackmojify);
app.use('/', routes.index);

module.exports = app;
