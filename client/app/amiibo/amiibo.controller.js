'use strict';

angular.module('amiibolocatorcomApp')
  .controller('AmiiboCtrl', ['$scope', '$routeParams', 'Amiibos', function ($scope, $routeParams, Amiibos) {
    $scope.amiibo = {};
	Amiibos.getAmiiboByKey($routeParams.amiibo).then(function(amiibo) {
		$scope.amiibo = amiibo;
	});
}]);
