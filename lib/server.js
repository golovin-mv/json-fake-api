const http = require('http');
const httpProxy = require('http-proxy');
const logger = require('./logger');

const server = {
  port: null,
  isRunning: false
};


const createProxy = proxyAddr => new Promise((resolve) => {
  if (!proxyAddr) {
    return resolve();
  }
  return resolve(httpProxy.createProxyServer({ target: proxyAddr }));
});


const createServer = (port, clbFn) => new Promise((resolve, reject) => {
  try {
    http.createServer(clbFn).listen(port, () => {
      server.isRunning = true;
    }).listen(port);
    return resolve();
  } catch (err) {
    return reject(err);
  }
});

const start = ({ port, proxy }, clbFn) => {
  createServer(port, clbFn)
    .then(() => logger.info(`Server running on ${port}`))
    .then(() => createProxy(proxy))
    .then((res) => {
      if (res) {
        server.proxy = res;
        server.proxyTarget = proxy;
        logger.info(`Server proxy to ${proxy}`);
      }
    })
    .catch((err) => {
      logger.error(err.message);
      process.exit(1);
    });
};

const proxyReq = (req, res) => new Promise((resolve, reject) => {
  return server.proxy.web(req, res, (error) => {
    if (error) {
      logger.error(`${server.proxyTarget} ${req.url}: ${error.message}`);
      return reject(error);
    }
    return resolve();
  });
});

const isRunning = () => server.isRunning;
const isProxy = () => !!server.proxy;

module.exports = {
  start,
  isRunning,
  proxyReq,
  isProxy
};
