var cDOMAdapter = require('xpath2.js').DOMAdapter;
var cStaticContext = require('xpath2.js').StaticContext;

function cLXDOMAdapter() {

}

cLXDOMAdapter.prototype = new cDOMAdapter;

// Create default static context object to enable access implementation functions
var oLXDOMAdapter_staticContext = new cStaticContext;

// Standard members
cLXDOMAdapter.prototype.getProperty = function(oNode, sName) {
  // Run native if there is one
  if (sName in oNode)
    return oNode[sName];

  // Otherwise run JS fallback
  if (sName == "baseURI") {
    var sBaseURI  = '',
      fResolveUri = oLXDOMAdapter_staticContext.getFunction('{' + "http://www.w3.org/2005/xpath-functions" + '}' + "resolve-uri"),
      cXSString = oLXDOMAdapter_staticContext.getDataType('{' + "http://www.w3.org/2001/XMLSchema" + '}' + "string");

    for (var oParent = oNode, sUri; oParent; oParent = oParent.parentNode)
      if (oParent.nodeType == 1 /* cNode.ELEMENT_NODE */ && (sUri = oParent.getAttribute("xml:base")))
        sBaseURI = fResolveUri(new cXSString(sUri), new cXSString(sBaseURI)).toString();
    //
    return sBaseURI;
  }
  else
  if (sName == "textContent") {
    var aText = [];
    (function(oNode) {
      for (var nIndex = 0, oChild; oChild = oNode.childNodes[nIndex]; nIndex++)
        if (oChild.nodeType == 3 /* cNode.TEXT_NODE */ || oChild.nodeType == 4 /* cNode.CDATA_SECTION_NODE */)
          aText.push(oChild.data);
        else
        if (oChild.nodeType == 1 /* cNode.ELEMENT_NODE */ && oChild.firstChild)
          arguments.callee(oChild);
    })(oNode);
    return aText.join('');
  }
};

module.exports = cLXDOMAdapter;