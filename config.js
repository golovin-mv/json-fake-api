const R = require('ramda');
const cliParser = require('./CLIparser');

const config = {
  port: 8080,
  proxy: null
};

module.exports = R.map(key => R.defaultTo(config[key], cliParser[key]))(R.keys(config));
