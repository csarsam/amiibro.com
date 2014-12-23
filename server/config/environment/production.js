'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,
  session: {
    secret: process.env.AMIIBRO_SESSION_SECRET || 'lkdjlfksjflksjdlfkjsdljfsljsldjflsdkjflskdjlfksjdflskjlskdjflj'
  },
  walmart: {
    apiKey: process.env.AMIIBRO_WALMART_APIKEY || ''
  },
  bestbuy: {
    apiKey: process.env.AMIIBRO_BESTBUY_APIKEY || ''
  }
};