'use strict';

describe('Service: amiiboService', function () {

  // load the service's module
  beforeEach(module('amiiBroApp'));

  // instantiate service
  var amiiboService;
  beforeEach(inject(function (_amiiboService_) {
    amiiboService = _amiiboService_;
  }));

  it('should do something', function () {
    expect(!!amiiboService).toBe(true);
  });

});
