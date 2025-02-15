'use strict';

const { expect } = require('chai');

const limitParser = require('../').limit;

describe('limit parser', () => {
    it('should be a function', () => {
        expect(limitParser).to.be.a('function');
    });

    it('should return a number', () => {
        expect(limitParser(1)).to.be.a('number');
        expect(limitParser(1234)).to.equal(1234);
    });

    it('should accept number strings and convert them', () => {
        expect(limitParser('1')).to.be.a('number');
        expect(limitParser('1234')).to.equal(1234);
    });

    it('should return null for "unlimited"', () => {
        expect(limitParser('unlimited')).to.equal(null);
    });

    it('should throw an error for non-number strings', () => {
        expect(() => {
            limitParser('foo');
        }).to.throw(Error);
        expect(() => {
            limitParser({});
        }).to.throw(Error);
        expect(() => {
            limitParser([]);
        }).to.throw(Error);
    });

    it('should throw an error for numbers < 1', () => {
        expect(() => {
            limitParser(0);
        }).to.throw(Error);
        expect(() => {
            limitParser('0');
        }).to.throw(Error);
        expect(() => {
            limitParser(-1);
        }).to.throw(Error);
        expect(() => {
            limitParser(-100);
        }).to.throw(Error);
    });
});
