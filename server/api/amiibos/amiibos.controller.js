'use strict';

var validator = require('validator');
var amiibos = require('../../components/amiibos');
var amiiboData = require('../../components/amiiboData');

// Get Amiibos by name or all
exports.index = function(req, res) {
  var getAll = false;
  var name = req.param('name');
  if(validator.isNull(name)) {
    getAll = true;
  }
  if(!validator.isAmiibo(name) && !getAll) {
    return res.status(400).jsonp({message: 'Invalid Amiibo name.', names: Object.keys(amiibos)});
  }
  if(getAll) {
    var amiiboBasicInfo = Object.keys(amiiboData).map(function (amiiboName, index) {
      return amiiboData[amiiboName].basic;
    });
    return res.jsonp(amiiboBasicInfo);
  } else {
    return res.jsonp(amiiboData[name]);
  }
};

validator.extend('isAmiibo', function (str) {
  var amiiboNames = Object.keys(amiibos);
  return amiiboNames.indexOf(str) !== -1;
});