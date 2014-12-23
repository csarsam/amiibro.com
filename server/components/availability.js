'use strict';

var request = require('request');
var qs = require('querystring');
var url = require('url');
var cheerio = require('cheerio');
var config = require('../config/environment');

function _parseWalmartBody(body, callback) {
  var item = body.items[0];
  var resp = {
    id: item.itemId,
    name: item.name,
    upc: item.upc,
    image: item.largeImage,
    shipToStore: item.shipToStore,
    freeToShipToStore: item.freeShipToStore,
    availableOnline: item.availableOnline,
    productUrl: item.productUrl,
    addToCartUrl: item.addToCartUrl,
    mobileUrl: null
  };
  return callback(null, resp);
}

function _parseBestBuyBody(body, callback) {
  var resp = {};
  resp.stores = [];
  var stores = body.stores;
  for (var i = 0; i < stores.length; i++) {
    var newStore = {};
    var store = stores[i];
    newStore = {
      name: store.name,
      address: store.address,
      city: store.city,
      state: store.region,
      zipcode: store.fullPostalCode,
      country: store.country,
      hours: store.hoursAmPm,
      gmtOffset: store.gmtOffset,
      inStoreAvailability: store.products[0].inStoreAvailability,
      inStoreAvailabilityUpdateDate: store.products[0].inStoreAvailabilityUpdateDate
    };
    resp.stores.push(newStore);
  }
  var item = stores[0].products[0];
  resp.item = {
    id: item.sku,
    name: item.name,
    upc: item.upc,
    image: item.largeFrontImage,
    shipToStore: item.inStorePickup,
    freeToShipToStore: true,
    availableOnline: item.onlineAvailability,
    productUrl: item.url,
    addToCartUrl: item.addToCartUrl,
    mobileUrl: item.mobileUrl
  };
  return callback(null, resp);
}

function _parseGamestopBody(body, callback) {
  var noResults = body.split('|')[3];
  noResults = noResults.trim().replace(/(\n\r|\n|\r)/gm, '').replace(/\t/g," ").replace(/\s+/g, ' ');
  var $ = cheerio.load(noResults,  {
    normalizeWhitespace: true,
    xmlMode: false,
    decodeEntities: true
  });
  var noResultsDivLength = $('div').children('div#no_stores_near_zip').children().length;
  if(noResultsDivLength > 0) {
    return callback(null, {});
  } else {
    var results = body.split('|')[7];
    results = results.trim().replace(/(\n\r|\n|\r)/gm, '').replace(/\t/g," ").replace(/\s+/g, ' ');
    console.log(results);
    return callback(null, {});
  }
}

// https://api.walmartlabs.com/v1/items?ids=41488612,41488614,41488611,41488613,40571997,41488608,41488610,41488609,40571996&apiKey=<MY API KEY>
exports.walmart = function (amiibo, callback) {
  var baseUrl = 'https://api.walmartlabs.com/v1/items';
  var id = amiibo.online;
  if(id === null) {
    return callback(null, {});
  }
  var apiKey = config.walmart.apiKey;
  var parameters = qs.stringify({
    ids: id,
    apiKey: apiKey
  });
  var URL = baseUrl + '?' + parameters;
  request.get(URL, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    body = JSON.parse(body);
    if(resp.statusCode !== 200) {
      return callback(body);
    }
    _parseWalmartBody(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};

// https://api.remix.bestbuy.com/v1/stores(area(85251,100))+products(sku%20in%20(1371003,1373001,1376008,1379005,1377007,1375009,8886008,8885072,8887016,9700119,7522006,1378006,1374019,1375009,9703107,9701109,9705105))?apiKey=<MY API KEY>&format=json
exports.bestbuy = function (amiibo, zip, radius, callback) {
  var baseUrl = 'https://api.remix.bestbuy.com/v1';
  var id = amiibo.sku;
  if(id === null) {
    return callback(null, {});
  }
  var apiKey = config.bestbuy.apiKey;
  var paramUrl = '/stores(area(' + zip + ', ' + radius + '))+products(sku in(' + id + '))';
  var parameters = qs.stringify({
    apiKey: apiKey,
    format: 'json'
  });
  var URL = baseUrl + paramUrl + '?' + parameters;
  request.get(URL, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    body = JSON.parse(body);
    if(resp.statusCode !== 200) {
      return callback(body);
    }
    if(body.totalPages > 1) {
      // TODO Get the other pages from the Bestbuy API request
    }
    _parseBestBuyBody(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};

exports.gamestop = function (amiibo, zip, callback) {
  var baseUrl = 'http://www.gamestop.com/browse/storesearch.aspx';
  var id = amiibo.sku;
  var parameters = qs.stringify({
    sku: id
  });
  var URL = baseUrl + '?' + parameters;
  request.post(URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
      'X-MicrosoftAjax': 'Delta=true'
    },
    form: {
    'ctl00$ctl00$ScriptManager1': 'ctl00$ctl00$ScriptManager1|ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$FindZipButton',
    'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$EnterZipTextBox': zip,
    'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$StoreSavedModalPopup$PopupTargetControl': '',
    'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$NoStoresFoundModalPopup$PopupTargetControl': '',
    '__EVENTTARGET': 'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$FindZipButton',
    '__EVENTARGUMENT': '',
    '__LASTFOCUS': '',
    '__VIEWSTATE': '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YWluQ29udGVudFBsYWNlSG9sZGVyJFN0b3JlU2VhcmNoQ29udHJvbCRTdG9yZUxpc3RVc2VyQ29udHJvbCRTdG9yZXNSZXBlYXRlciRjdGwwMCRTdG9yZUluZm9Db250cm9sJFN0b3JlU2VsZWN0Vmlld3MPD2RmZAWYAWN0bDAwJGN0bDAwJEJhc2VDb250ZW50UGxhY2VIb2xkZXIkbWFpbkNvbnRlbnRQbGFjZUhvbGRlciRTdG9yZVNlYXJjaENvbnRyb2wkU3RvcmVMaXN0VXNlckNvbnRyb2wkU3RvcmVzUmVwZWF0ZXIkY3RsMDIkU3RvcmVJbmZvQ29udHJvbCRTdG9yZVNlbGVjdFZpZXdzDw9kZmQFmAFjdGwwMCRjdGwwMCRCYXNlQ29udGVudFBsYWNlSG9sZGVyJG1haW5Db250ZW50UGxhY2VIb2xkZXIkU3RvcmVTZWFyY2hDb250cm9sJFN0b3JlTGlzdFVzZXJDb250cm9sJFN0b3Jlc1JlcGVhdGVyJGN0bDA1JFN0b3JlSW5mb0NvbnRyb2wkU3RvcmVTZWxlY3RWaWV3cw8PZGZkBZgBY3RsMDAkY3RsMDAkQmFzZUNvbnRlbnRQbGFjZUhvbGRlciRtYWluQ29udGVudFBsYWNlSG9sZGVyJFN0b3JlU2VhcmNoQ29udHJvbCRTdG9yZUxpc3RVc2VyQ29udHJvbCRTdG9yZXNSZXBlYXRlciRjdGwwMyRTdG9yZUluZm9Db250cm9sJFN0b3JlU2VsZWN0Vmlld3MPD2RmZAWYAWN0bDAwJGN0bDAwJEJhc2VDb250ZW50UGxhY2VIb2xkZXIkbWFpbkNvbnRlbnRQbGFjZUhvbGRlciRTdG9yZVNlYXJjaENvbnRyb2wkU3RvcmVMaXN0VXNlckNvbnRyb2wkU3RvcmVzUmVwZWF0ZXIkY3RsMDQkU3RvcmVJbmZvQ29udHJvbCRTdG9yZVNlbGVjdFZpZXdzDw9kZmQFmAFjdGwwMCRjdGwwMCRCYXNlQ29udGVudFBsYWNlSG9sZGVyJG1haW5Db250ZW50UGxhY2VIb2xkZXIkU3RvcmVTZWFyY2hDb250cm9sJFN0b3JlTGlzdFVzZXJDb250cm9sJFN0b3Jlc1JlcGVhdGVyJGN0bDAxJFN0b3JlSW5mb0NvbnRyb2wkU3RvcmVTZWxlY3RWaWV3cw8PZGZkNMNRXSWlSq1DTK/Akvxn0VpOz2c=',
    '__VIEWSTATEGENERATOR': '91AC1DA8',
    '__ASYNCPOST': 'true'
  }}, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode !== 200) {
      return callback(body);
    }
    _parseGamestopBody(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};