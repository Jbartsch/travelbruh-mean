'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')
    .controller('RegisterCtrl', function($scope, $rootScope, $sce) {
        $scope.content = {
            src: $rootScope.baseUrl,
            title: "Register"
        };
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
    });
