function cXPathNSResolver(oNode) {
  this.node	= oNode;
}

cXPathNSResolver.prototype.lookupNamespaceURI	= function(sPrefix) {
  return this.node.lookupNamespaceURI(sPrefix);
};

module.exports = cXPathNSResolver;