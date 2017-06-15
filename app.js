// TODO: middlavare
const jsf = require('json-schema-faker');
const URL = require('url').URL;
const data = require('./shemas');
const server = require('./server');
const config = require('./config');
const faker = require('faker');
const responces = require('./responces');

jsf.extend('faker', () => faker);

const parseUrl = (url) => {
  let parsedUrl = null;
  try {
    parsedUrl = new URL(url);
  } catch (err) {
    parsedUrl = url;
  }
  return parsedUrl;
};
// TODO: в роутер
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
// TODO: в роутер
const isFavicon = req => req.url === '/favicon.ico';

server.start(config, (req, res) => {
  if (req.method === 'OPTIONS' || isFavicon(req)) {
    return responces.ok(res);
  }
  return response(req)
    .then((json) => {
      if (!json) {
        if (server.isProxy()) {
          return server.proxyReq(req, res)
            .catch(error => responces.notFound(res, error));
        }
        return responces.notFound(res);
      }
      return responces.ok(res, json);
    });
});

