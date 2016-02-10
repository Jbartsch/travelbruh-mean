'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')

    .controller('UserCtrl', ['$scope', 'travelBruhFactory', '$window', '$rootScope',
        function($scope, travelBruhFactory, $window, $rootScope) {
        getUser();
        function getUser () {
            travelBruhFactory.getUser(sessionStorage.tokenName, sessionStorage.tokenId)
                .success(function(data) {
                    $rootScope.user = data;
                })
                .error(function(data) {
                    console.log('content not updated: ' + data);

                });
        };
    }]);
