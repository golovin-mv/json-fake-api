const URL = require('url').URL;
const expect = require('chai').expect;
const sinon = require('sinon');
const shemas = require('../lib/shemas');

let stub = null;

describe('shemas', () => {
    const url = 'http://test/foo/bar?baz=12'
    
    before(() => {
        stub = sinon.stub();
        stub(shemas, 'getAllShemas');
    });

    describe('isPathEqual', () => {
        const path = '/foo/bar';

        it('should return true if paths is equal', () => {
            const shemaPath = '/foo/bar'
            expect(shemas.isPathEquals(path, shemaPath)).to.be.true;
        });

        it('should return false if path is not equal', () => {
            const shemaPath = '/bar/baz';
            expect(shemas.isPathEquals(path, shemaPath)).to.be.false;
        });

        it('should return true is RegExp.test is true', () => {
            const shemaPath = '\/foo\/[a-z]+';
            expect(shemas.isPathEquals(path, shemaPath)).to.be.true;
        });

        it('should return true is RegExp.test is false', () => {
            const shemaPath = '^\/foo\/[a-z]$';
            expect(shemas.isPathEquals(path, shemaPath)).to.be.false;
        });
    })

    describe('parseUrl', () => {
        it('should parse url', () => {
            const res = shemas.parseUrl(url);

            expect(res instanceof URL).to.be.true;
            expect(res.pathname).to.equals('/foo/bar');
        });
    })

    describe('getShemaForMock', () => {
        it('should return shema', () => {
            const shemasArray = [{
                path: 'foo/bar'
            }];

            expect(shemas.getShemaForMock(url, [], shemasArray)).to.equal(shemasArray[0]);
        });

    });
    
    after(() => stub.reset());
});