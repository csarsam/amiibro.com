'use strict';

var amiibos = require('../../../components/amiibos');

// Get list of Amiibo identifiers
exports.index = function(req, res) {
  res.json(amiibos);
};