const http = require('http');
const httpProxy = require('http-proxy');
const logger = require('./logger');

const server = {
  port: null,
  isRunning: false
};


const createProxy = (proxyAddr) => {
  return new Promise((resolve) => {
    if (!proxyAddr) {
      return resolve();
    }
    return resolve(httpProxy.createProxyServer({ target: proxyAddr }));
  });
};

const createServer = (config, clbFn) => {
  return new Promise((resolve, reject) => {
    try {
      http.createServer(clbFn).listen(config.port, () => {
        server.isRunning = true;
      }).listen(config.port);
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
};

const start = (config, clbFn) => {
  createServer(config, clbFn)
    .then(() => logger.info(`Server running on ${config.port}`))
    .then(() => createProxy(config.proxy))
    .then((res) => {
      if (res) {
        server.proxy = res;
        logger.info(`Server proxy to ${config.proxy}`);
      }
    })
    .catch((err) => {
      logger.error(err.message);
      process.exit(1);
    });
};

const proxyReq = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    if (!server.proxy) {
      const error = new Error('not proxy server');
      logger.error(error);
      return reject(error);
    }
    return server.proxy.web(req, res, (error) => {
      if (error) {
        logger.error(`${server.proxyTarget} ${req.url}: ${error.message}`);
        return reject(error);
      }
      return resolve();
    });
  });

  return promise;
};

const isRunning = () => server.isRunning;
const isProxy = () => !!server.proxy;

module.exports = {
  start,
  isRunning,
  proxyReq,
  isProxy
};
