var xpath2 = require('./../lib');
var expect = require('chai').expect;

describe('xpath2', function() {
  describe('.query()', function() {
    it('should have function defined', function() {
      expect(xpath2.query).to.be.a('function');
    });
  });

  describe('.evaluate()', function() {
    it('should have function defined', function() {
      expect(xpath2.evaluate).to.be.a('function');
    });
  });

  describe('.select()', function() {
    it('should have function defined', function() {
      expect(xpath2.select).to.be.a('function');
    });
  });

  describe('.select1()', function() {
    it('should have function defined', function() {
      expect(xpath2.select1).to.be.a('function');
    });
  });

  describe('.selectWithResolver()', function() {
    it('should have function defined', function() {
      expect(xpath2.selectWithResolver).to.be.a('function');
    });
  });

  describe('.useNamespaces()', function() {
    it('should have function defined', function() {
      expect(xpath2.useNamespaces).to.be.a('function');
    });
  });

  describe('.parse()', function() {
    it('should have function defined', function() {
      expect(xpath2.parse).to.be.a('function');
    });
    it('should throw not implemented', function() {
      expect(function(){xpath2.parse()}).to.throw(TypeError, "parse() function is not supported yet.");
    });
  });

  describe('.XPathEvaluator', function() {
    it('should have XPathEvaluator constructor function defined', function() {
      expect(xpath2.XPathEvaluator).to.be.a('function');
    });
  });

  describe('.XPathResult', function() {
    it('should have XPathResult constructor function defined', function() {
      expect(xpath2.XPathResult).to.be.a('function');
    });
  });

  describe('.XPathException', function() {
    it('should have XPathException constructor function defined', function() {
      expect(xpath2.XPathException).to.be.a('function');
    });
  });
});