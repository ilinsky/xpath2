var evaluator = require('./dom/XPathEvaluator');
var cXPathException = require('./dom/classes/XPathException');
var cXPathExpression = require('./dom/classes/XPathExpression');
var cXPathResult = require('./dom/classes/XPathResult');

var cObject = global.Object;
var cTypeError = global.TypeError;
var isArray = global.Array.isArray || function(value) {
  return cObject.prototype.toString.call(value) == '[object Array]';
};

//
function query(expression, document, resolver) {
  var result = selectWithResolver(expression, document, resolver);
  return isArray(result) ? result : [result];
};

//
function createExpression() {
  return evaluator.createExpression.apply(evaluator, arguments);
};

function createNSResolver() {
  return evaluator.createNSResolver.apply(evaluator, arguments);
};

function evaluate() {
  return evaluator.evaluate.apply(evaluator, arguments);
};

//
function select(expression, document, single) {
  return selectWithResolver(expression, document, null, single);
};

function select1(expression, document) {
  return select(expression, document, true);
};

function selectWithResolver(expression, document, resolver, single) {
  var result = evaluator.evaluate(expression, document, resolver, cXPathResult.ANY_TYPE, null);

  if (result.resultType == cXPathResult.STRING_TYPE) {
    result = result.stringValue;
  } else if (result.resultType == cXPathResult.NUMBER_TYPE) {
    result = result.numberValue;
  } else if (result.resultType == cXPathResult.BOOLEAN_TYPE) {
    result = result.booleanValue;
  } else {
    result = result.sequence;
    if (single) {
      result = result[0];
    }
  }
  return result;
};

function useNamespaces(mappings) {
  var resolver = {
    mappings: mappings || {},
    lookupNamespaceURI: function(prefix) {
      return this.mappings[prefix];
    }
  };

  return function(expression, document, single) {
    return selectWithResolver(expression, document, resolver, single);
  };
};

function parse(sExpression) {
  throw new cTypeError("parse() function is not supported yet.");
};

module.exports = {
  query: query,
  // DOM Level 3 XPath function
  evaluate: evaluate,
  createExpression: createExpression,
  createNSResolver: createNSResolver,
  // Flavours
  select: select,
  select1: select1,
  selectWithResolver: selectWithResolver,
  useNamespaces: useNamespaces,
  parse: parse,
  // Classes
  XPathResult: cXPathResult,
  XPathException: cXPathException
};