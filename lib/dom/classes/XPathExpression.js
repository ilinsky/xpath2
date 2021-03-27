var cDynamicContext = require('xpath2.js').DynamicContext;
var cException = require('xpath2.js').Exception;
var cExpression = require('xpath2.js').Expression;
//
var cXPathException = require('./XPathException');
var cXPathResult = require('./XPathResult');

var oL2DOMAdapter = require('./../../adapters/L2DOMAdapter');
var oL2HTMLDOMAdapter = require('./../../adapters/L2HTMLDOMAdapter');
var oMSHTMLDOMAdapter = require('./../../adapters/MSHTMLDOMAdapter');
var oMSXMLDOMAdapter = require('./../../adapters/MSXMLDOMAdapter');

var oDocument = global.document;

// Internet Explorer 8 or older
var bOldMS  = oDocument && !!oDocument.namespaces && !oDocument.createElementNS;
// Older other browsers
var bOldW3  = oDocument && !bOldMS && oDocument.documentElement.namespaceURI != "http://www.w3.org/1999/xhtml";

function cXPathExpression(sExpression, oStaticContext) {
  try {
    this.staticContext  = oStaticContext;
    this.expression  = new cExpression(sExpression, this.staticContext);
  }
  catch (oException) {
    if (oException instanceof cException)
      throw new cXPathException(cXPathException.INVALID_EXPRESSION_ERR
//->Debug
          , '[err:' + oException.code + ']' + ' ' + oException.message
//<-Debug
      );
    else
      throw oException;
  }
}

cXPathExpression.prototype.evaluate  = function(oNode, nType, oResult) {
  if (typeof oNode == "undefined")
    oNode  = null;

  var oSequence = [],
      oDOMAdapter  = oL2DOMAdapter;

  // Determine which DOMAdapter to use based on browser and DOM type
  var bXHTMLDefaultNamespace = this.staticContext.defaultElementNamespace == "http://www.w3.org/1999/xhtml";
  if (bOldMS)
    oDOMAdapter  = bXHTMLDefaultNamespace ? oMSHTMLDOMAdapter : oMSXMLDOMAdapter;
  else
  if (bOldW3 && bXHTMLDefaultNamespace)
    oDOMAdapter  = oL2HTMLDOMAdapter;

  // Evaluate expression
  try {
    var aSequence  = this.expression.evaluate(new cDynamicContext(this.staticContext, oNode, null, oDOMAdapter));
    for (var nIndex = 0, nLength = aSequence.length, oItem; nIndex < nLength; nIndex++)
      oSequence[oSequence.length]  = oDOMAdapter.isNode(oItem = aSequence[nIndex]) ? oItem : cDynamicContext.xs2js(oItem);
  }
  catch (oException) {
    if (oException instanceof cException)
      throw new cXPathException(cXPathException.TYPE_ERR
//->Debug
          ,  '[err:' + oException.code + ']' + ' ' + oException.message
//<-Debug
      );
    else
      throw oException;
  }

  // Determine type if not specified
  if (!nType) {
    nType  = 4;  // Default: XPathResult.UNORDERED_NODE_ITERATOR_TYPE
    if (oSequence.length == 1) {
      var sType  = typeof oSequence[0];
      if (sType == "number")
        nType  = 1;  // XPathResult.NUMBER_TYPE
      else
      if (sType == "string")
        nType  = 2;  // XPathResult.STRING_TYPE
      else
      if (sType == "boolean")
        nType  = 3;  // XPathResult.BOOLEAN_TYPE
    }
  }
  return cXPathResult.init(oResult ? cXPathResult.clear(oResult) : new cXPathResult, nType, oSequence);
};

module.exports = cXPathExpression;