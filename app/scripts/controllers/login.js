'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', '$http', 'loginService', '$window', '$cookies', '$location',
        function($scope, $rootScope, $http, loginService, $window, $cookies, $location) {
            // $rootScope.user = {};
            $scope.user = {};
            $scope.submit = function(user) {
                console.log('login');
                var encodedData = btoa($scope.user.name + ":" + $scope.user.pass); // encode a string
                login($scope.user.name, $scope.user.pass);
            };

            $scope.logout = function() {


                $http({
                    method: 'GET',
                    withCredentials: true,
                    url: $rootScope.baseUrl + '/rest/session/token',
                    headers: {
                        'Content-Type': 'application/hal+json',
                    }
                }).then(function successCallback(response) {
                    $http({
                        method: 'POST',
                        withCredentials: true,
                        url: 'http://travelbruh.localhost/api/v2/user/logout',
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json",
                            'X-CSRF-Token': response.data
                        }
                    }).then(function successCallback(response) {
                        // $cookies.remove($window.sessionStorage.tokenName);
                        $cookies.remove('loggedIn');
                        $rootScope.loggedIn = false;
                    }, function errorCallback(response) {
                        console.log('error ' + response.status);

                    });
                }, function errorCallback(response) {

                });
            };

            function login(name, pass) {
                loginService.get(name, pass)
                    .success(function(response) {
                        if (response.id && response.name) {
                            $cookies.put('loggedIn', 'true');
                            $rootScope.loggedIn = true;
                            $location.path("/itinerary");
                        } else {
                            $scope.message = 'Not a valid username or password';
                        }
                    })
                    .error(function(data) {
                        console.log('Login failed: ' + data);
                    });
            };

        }
    ]);
