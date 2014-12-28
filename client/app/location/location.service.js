'use strict';

angular.module('amiibolocatorcomApp')
  .service('Location', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var zipcode = '';

    return {
    	setZipcode: function (newZipcode) {
    		zipcode = newZipcode;
    	},
    	getZipcode: function () {
    		return zipcode;
    	}
    }
  });
