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
                    url: 'http://travelbruh.localhost/api/v2/user/login',
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    }
                });
            }

            // http://travelbruh.localhost/user/login?name=admin&pass=password&form_build_id=form-7BpSIJATth9GdTaUmaqUJK5oUX8De2n6JZ8Xw_tXLVc&form_id=user_login_form&op=Log+in
            return loginService;
        }
    ]);
