'use strict';

// Test specific configuration
// ===========================
module.exports = {
  session: {
    secret: 'testSession'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: 'myPassword'
  },
  walmart: {
    apiKey: 'testKey'
  },
  bestbuy: {
    apiKey: 'testKey'
  },
  target: {
    apiKey: 'testKey'
  },
  amazon: {
    accessKeyId : 'testKey',
    secretAccessKey: 'testKey'
  }
};