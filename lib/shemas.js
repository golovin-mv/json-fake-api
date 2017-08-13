const URL = require('url').URL;
const R = require('ramda');

const testRegexp = R.curry((path, shemaPath) => (new RegExp(shemaPath)).test(path));

const parseUrl = url => R.tryCatch(() => new URL(url), () => url)(url);

const isPathEquals = (path, shemaPath) => R.anyPass([R.equals(path), testRegexp(path)])(shemaPath);

// TODO: unmock
const isDataEquals = (data, shemaData) => R.or(shemaData, data, true);

const isShemaEquals = (url, reqData, { path, data }) => R.and(
  isPathEquals(parseUrl(url).pathname, path),
  isDataEquals(data, reqData)
);

const test = {
  path: '/',
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    namne: {
      type: 'string',
      faker: 'name.findName'
    }
  },
  required: ['id', 'name']
};

// TODO: unmock
const getAllShemas = () => [test];

const getShemaForMock = (url, data, shemas) => R.filter(el => isShemaEquals(url, data, el), shemas);

module.exports = {
  isDataEquals,
  isPathEquals,
  getShemaForMock,
  getAllShemas,
  parseUrl
};
