const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const logger = require('../src/logger');

const config = require('../config');
const routes = {
  index: require('../routes/index-route'),
  slackmojify: require('../routes/slackmojify-route')
};

logger.init(app);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/static', express.static(path.join(__dirname, '../static')));
app.use('/slackmojify', routes.slackmojify);
app.use('/', routes.index);

module.exports = app;
