var cStaticContext = require('xpath2.js').StaticContext;
var cXPathExpression = require('./classes/XPathExpression');
var cXPathNSResolver = require('./classes/XPathNSResolver');

var oDocument = global.document;

// Create HTML static context (this has default xhtml namespace)
var oHTMLStaticContext  = new cStaticContext;
oHTMLStaticContext.baseURI	= oDocument ? oDocument.location.href : null;
oHTMLStaticContext.defaultFunctionNamespace	= "http://www.w3.org/2005/xpath-functions";
oHTMLStaticContext.defaultElementNamespace	= "http://www.w3.org/1999/xhtml";

// Create XML static context (this has default element null namespace)
var oXMLStaticContext   = new cStaticContext;
oXMLStaticContext.defaultFunctionNamespace	= "http://www.w3.org/2005/xpath-functions";

function createExpression(sExpression, oResolver) {
  oXMLStaticContext.namespaceResolver	= oResolver;

  return new cXPathExpression(sExpression, oXMLStaticContext);
}

function createNSResolver(oNode) {
  return new cXPathNSResolver(oNode);
}

function evaluate(sExpression, oContextNode, oResolver, nType, oResult) {
  // Choose static context
  var oStaticContext  = oContextNode && oContextNode.nodeType && (oContextNode.nodeType == 9 ? oContextNode : oContextNode.ownerDocument).createElement("div").tagName == "DIV" ? oHTMLStaticContext : oXMLStaticContext;
  oStaticContext.namespaceResolver	= oResolver;

  return new cXPathExpression(sExpression, oStaticContext).evaluate(oContextNode, nType, oResult);
}

module.exports = {
  createExpression: createExpression,
  createNSResolver: createNSResolver,
  evaluate: evaluate
};