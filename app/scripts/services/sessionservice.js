'use strict';

/**
 * @ngdoc service
 * @name travelBruhClientApp.sessionService
 * @description
 * # sessionService
 * Service in the travelBruhClientApp.
 */
angular.module('travelBruhClientApp')
    .service('sessionService', ['$http', '$rootScope', '$filter',
        function($http, $rootScope, $filter) {
            var sessionService = {};



            sessionService.get = function(data) {

                // Create authorization header in base64

                return $http({
                    method: 'POST',
                    data: data,
                    url: 'http://travelbruh.localhost/user/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).
                then(function(response) {
                  console.log(response);
                }, function(response) {
                  console.log(response);

                });
            }


        return sessionService;
    }]);
