var cError = global.Error;
var cObject = global.Object;

function cXPathException(nCode, sMessage) {
  this.code	= nCode;
  this.message = sMessage;
}

cXPathException.prototype = cObject.create(cError.prototype);

cXPathException.prototype.code = null;
cXPathException.prototype.message = null;

// Constants
cXPathException.INVALID_EXPRESSION_ERR = 51;
cXPathException.TYPE_ERR = 52;

//var oXPathException_messages	= {};
//oXPathException_messages[cXPathException.INVALID_EXPRESSION_ERR] = "INVALID_EXPRESSION_ERR";
//oXPathException_messages[cXPathException.TYPE_ERR] = "TYPE_ERR";

module.exports = cXPathException;