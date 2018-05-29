const config = require('./config');
const server = require('./server');

server.listen(config.port, () => {
  if (config.env !== 'production') {
    console.log(`listening on http://localhost:${config.port}/`);
  }
});
