'use strict';

var images = require('../../../components/images');

exports.index = function(req, res) {
  res.json([images]);
};