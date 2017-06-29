const expect = require('chai').expect;
const mock = require('mock-require');

describe('config', () => {
  const port = 1337;
  const proxy = 'some proxy addess'
  

  it('should set port and proxy from cpiParser', () => {
    const cliParser = {
      port,
      proxy,
      foo: 'bar'
    };

    mock('../lib/CLIparser.js', cliParser);

    const config = require('../lib/config');

    expect(config.port).to.equal(port);
    expect(config.proxy).to.equal(proxy);
    expect(config).to.not.have.property("foo");
    
  });

  it('should set by defaul', () => {
    mock('../lib/CLIparser.js', {});
    
    const config = mock.reRequire('../lib/config');

    expect(config.port).to.equal(8080);
    expect(config.proxy).to.been.null;
  });
  
  after(() => mock.stopAll());
});
