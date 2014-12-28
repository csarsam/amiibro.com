'use strict';

describe('Service: Amiibos', function () {

  // load the service's module
  beforeEach(module('amiibolocatorcomApp'));

  // instantiate service
  var Amiibros;
  beforeEach(inject(function (_amiibros_) {
    Amiibros = _amiibros_;
  }));

  it('should do something', function () {
    expect(!!Amiibros).toBe(true);
  });

});
