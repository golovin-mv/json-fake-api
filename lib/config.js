const R = require('ramda');
const cliParser = require('./CLIparser');

const config = {
  port: 8080,
  proxy: null
};

const getConfig = R.compose(
  R.merge(config),
  R.pick(R.keys(config))
);

module.exports = getConfig(cliParser);
