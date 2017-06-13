const jsf = require('json-schema-faker');
const URL = require('url').URL;
const data = require('./shemas');
const server = require('./server');
const config = require('./config');

const parseUrl = (url) => {
  let parsedUrl = null;
  try {
    parsedUrl = new URL(url);
  } catch (err) {
    parsedUrl = url;
  }
  return parsedUrl;
};

const response = (req) => {
  const parsedUrl = parseUrl(req.url);
  // FIXME: гавно
  const shema = data.filter(el => parsedUrl.indexOf(el.path) !== -1)[0];

  if (!shema) {
    return Promise.resolve(null);
  }

  return jsf.resolve(shema)
    .then(res => JSON.stringify(res, null, 2));
};

const addHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  return res;
};

const ok = (res, responseData) => {
  addHeaders(res).writeHead(200);
  return res.end(responseData);
};

const isFavicon = req => req.url === '/favicon.ico';

const notFound = (res) => {
  addHeaders(res).writeHead(404);
  return res.end('Not found');
};

server.start(config, (req, res) => {
  if (req.method === 'OPTIONS' || isFavicon(req)) {
    return ok(res);
  }

  return response(req)
    .then((json) => {
      if (!json) {
        if (server.isProxy()) {
          return server.proxyReq(req, res)
            .catch(error => notFound(res, error));
        }
        return notFound(res);
      }
      return ok(res, json);
    });
});

