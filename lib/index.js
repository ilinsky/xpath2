var cXPathEvaluator = require('./dom/XPathEvaluator');
var cXPathException = require('./dom/XPathException');
var cXPathExpression = require('./dom/XPathExpression');
var cXPathResult = require('./dom/XPathResult');

var cTypeError = global.TypeError;

var evaluator = new cXPathEvaluator();

function query() {
  throw new cTypeError("query() function is not supported yet.");
};

function evaluate() {
  return evaluator.evaluate.apply(evaluator, arguments);
};

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
  // Flavours
  select: select,
  select1: select1,
  selectWithResolver: selectWithResolver,
  useNamespaces: useNamespaces,
  parse: parse,
  // Classes
  XPathEvaluator: cXPathEvaluator,
  XPathResult: cXPathResult,
  XPathException: cXPathException
};