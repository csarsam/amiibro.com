'use strict';

describe('Controller: AmiibosCtrl', function () {

  // load the controller's module
  beforeEach(module('amiibrocomApp'));

  var AmiibosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmiibosCtrl = $controller('AmiibosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
