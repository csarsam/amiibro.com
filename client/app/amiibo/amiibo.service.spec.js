'use strict';

describe('Service: amiibo', function () {

  // load the service's module
  beforeEach(module('amiibrocomApp'));

  // instantiate service
  var amiibo;
  beforeEach(inject(function (_amiibo_) {
    amiibo = _amiibo_;
  }));

  it('should do something', function () {
    expect(!!amiibo).toBe(true);
  });

});
