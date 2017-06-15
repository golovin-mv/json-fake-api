const R = require('ramda');

/**
 * Responce status codes
 * @enum
 */
const statusCodes = {
  NOT_FOUND: 404,
  OK: 200,
  SERVER_ERROR: 500
};

/**
 * Set CORS headers
 * @param {http.ServerResponse} res
 * @return {http.ServerResponse}
 */
const addHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  return res;
};

/**
 *
 * @param {http.ServerResponse} res
 * @return {http.ServerResponse}
 */
const setStatusCode = R.curry((statusCode, res) => {
  res.statusCode = statusCode;
  return res;
});

/**
 * @param {http.ServerResponse} res
 */
const end = res => res.end();

/**
 *
 * @param {http.ServerResponse} res
 * @return {http.ServerResponse}
 */
const writeData = R.curry((data, res) => {
  res.write(data);
  return res;
});

/**
 *
 * @param {Number} statusCode
 * @param {*} data
 * @param {http.ServerResponse} res
 */
const makeResponse = (statusCode, data, res) => R.compose(
    end,
    writeData(data),
    setStatusCode(statusCode),
    addHeaders)(res);

/**
 *
 * @param {http.ServerResponse} res
 * @param {*} data
 */
const ok = (res, data) => makeResponse(statusCodes.OK, data, res);

/**
 *
 * @param {http.ServerResponse} res
 */
const notFound = res => makeResponse(statusCodes.NOT_FOUND, 'Not found', res);

/**
 *
 * @param {http.ServerResponse} res
 * @param {*} error
 */
const serverError = (res, error) => makeResponse(statusCodes.SERVER_ERROR, error, res);

module.exports = {
  ok,
  notFound,
  serverError,
};
