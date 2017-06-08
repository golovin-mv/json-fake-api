const http = require('http');
const httpProxy = require('http-proxy');

const server = {
  port: null,
  isRunning: false
};

const createProxy = () => httpProxy.createProxyServer({});

const start = (port, isProxy = false, clbFn) => {
  http.createServer(clbFn).listen(port, () => {
    server.isRunning = true;
  });

  if (isProxy) {
    server.proxy = createProxy();
    server.proxyTarget = isProxy;
  }
};

const proxyReq = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    if (!server.proxy) {
      // TODO: нормальное сообщение об ошибке
      return reject(new Error('not proxy server'));
    }
    return server.proxy.web(req, res, { target: server.proxyTarget }, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });

  return promise;
};

const isRunning = () => server.isRunning;

module.exports = {
  start,
  isRunning,
  proxyReq
};
