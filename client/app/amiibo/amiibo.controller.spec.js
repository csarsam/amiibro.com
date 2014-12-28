'use strict';

describe('Controller: AmiiboCtrl', function () {

  // load the controller's module
  beforeEach(module('amiibolocatorcomApp'));

  var AmiiboCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmiiboCtrl = $controller('AmiiboCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
