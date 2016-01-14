'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')
    .controller('LoginCtrl', ['$scope', '$http', 'sessionService',
        function($scope, $http, sessionService) {

            $scope.submit = function(user) {
              var sesh = sessionService.get(user);
                console.log(sesh);

            };



        }
    ]);
