var cStaticContext = require('xpath2.js').StaticContext;
var cXPathExpression = require('./XPathExpression');
var cXPathNSResolver = require('./XPathNSResolver');

var oDocument = global.document;

// Create HTML static context (this has default xhtml namespace)
var oHTMLStaticContext  = new cStaticContext;
oHTMLStaticContext.baseURI	= oDocument ? oDocument.location.href : null;
oHTMLStaticContext.defaultFunctionNamespace	= "http://www.w3.org/2005/xpath-functions";
oHTMLStaticContext.defaultElementNamespace	= "http://www.w3.org/1999/xhtml";

// Create XML static context (this has default element null namespace)
var oXMLStaticContext   = new cStaticContext;
oXMLStaticContext.defaultFunctionNamespace	= "http://www.w3.org/2005/xpath-functions";

function cXPathEvaluator() {

}

cXPathEvaluator.prototype.createExpression = function(sExpression, oResolver) {
  oXMLStaticContext.namespaceResolver	= oResolver;

  return new cXPathExpression(sExpression, oXMLStaticContext);
};

cXPathEvaluator.prototype.createNSResolver = function(oNode) {
  return new cXPathNSResolver(oNode);
};

cXPathEvaluator.prototype.evaluate = function(sExpression, oContextNode, oResolver, nType, oResult) {
  // Choose static context
  var oStaticContext  = oContextNode && oContextNode.nodeType && (oContextNode.nodeType == 9 ? oContextNode : oContextNode.ownerDocument).createElement("div").tagName == "DIV" ? oHTMLStaticContext : oXMLStaticContext;
  oStaticContext.namespaceResolver	= oResolver;

  return new cXPathExpression(sExpression, oStaticContext).evaluate(oContextNode, nType, oResult);
};

module.exports = cXPathEvaluator;