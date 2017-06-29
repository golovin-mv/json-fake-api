const { ok, notFound, serverError } = require('../lib/responces');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('responces', () => {
  let res;
  const data = 'some data';

  beforeEach(() => res = {
    setHeader: sinon.spy(),
    write: sinon.spy(),
    end: sinon.spy()
  });

  it('ok should create response', () => {
    ok(res, data);

    expect(res.statusCode).to.equal(200);
    expect(res.write.calledWith(data)).to.be.true;
    expect(res.write.called).to.be.true;
  });

  it('notFound should create response', () => {
    notFound(res);

    expect(res.statusCode).to.equal(404);
    expect(res.write.called).to.be.true;
  });

  it('serverError should create response', () => {
    serverError(res, data);

    expect(res.statusCode).to.equal(500);
    expect(res.write.calledWith(data)).to.be.true;
    expect(res.write.called).to.be.true;
  });
});