'use strict';

/**
 * @ngdoc service
 * @name travelBruhClientApp.loginService
 * @description
 * # loginService
 * Service in the travelBruhClientApp.
 */
angular.module('travelBruhClientApp')
    .service('loginService', ['$http', '$rootScope', '$location', '$window', '$cookies',
        function($http, $rootScope, $location, $window, $cookies) {

            var loginService = {};



            loginService.get = function(name, pass) {
                // Create authorization header in base64
                return $http({
                    method: 'POST',
                    data: {
                        "username": name,
                        "password": pass
                    },
                    url: $rootScope.baseUrl + '/api/v2/user/login',
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    }
                });
            }
            return loginService;
        }
    ]);
