const cliParser = require('./CLIparser');

const config = {
  port: 8080,
  proxy: null
};

// TODO: красивее
module.exports = Object.assign({}, config, {
  port: cliParser.port || config.port,
  proxy: cliParser.proxy || config.proxy
});
