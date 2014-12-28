'use strict';

var amiibos = require('../../components/amiibos');

// Get list of amiiboss
exports.index = function(req, res) {
  res.json(amiibos);
};