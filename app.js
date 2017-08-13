// TODO: middlavare
const jsf = require('json-schema-faker');

const faker = require('faker');

const data = require('./lib/shemas');
const server = require('./lib/server');
const config = require('./lib/config');
const { ok, notFound } = require('./lib/responces');

jsf.extend('faker', () => faker);

// TODO: в роутер
const response = (req) => {
  const parsedUrl = data.parseUrl(req.url);
  // FIXME: гавно
  const shema = data.getAllShemas().filter(el => parsedUrl.indexOf(el.path) !== -1)[0];

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

