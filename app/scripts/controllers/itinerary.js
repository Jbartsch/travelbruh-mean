'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:ItineraryCtrl
 * @description
 * # ItineraryCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')
    .controller('ItineraryCtrl', ['$scope', '$rootScope', '$http', 'travelBruhFactory', '$location',
        function($scope, $rootScope, $http, travelBruhFactory, $location) {
            $rootScope.activeNav = 'itineraries';
            $scope.itineraries = [];
            getItineraries();

            function getItineraries() {
                travelBruhFactory.getItineraries()
                    .success(function(data) {
                        $scope.itineraries = data;

                    })

                .error(function(data) {
                    $scope.status = 'Unable to load itinerary data: ' + error.message;
                });
            };

            // Refactor to service
            $scope.getLocation = function(locationName) {
                $http({
                    method: 'GET',
                    url: 'http://maps.google.com/maps/api/geocode/json?address=' + locationName
                }).then(function successCallback(response) {
                    var geoLocation = response.data.results[0].geometry.location;
                    $scope.geoLocation = geoLocation;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            };

            $scope.insertIntinerary = function() {
                travelBruhFactory.insertIntinerary($scope.text, $scope.dateStart, $scope.dateEnd, $scope.geoLocation)
                    .then(function successCallback(response) {
                        getItineraries();
                        $scope.text = '';
                    }, function errorCallback(response) {});
            }

            $scope.deleteIntinerary = function() {
                travelBruhFactory.deleteIntinerary(this.itinerary.nid[0].value)
                    .then(function successCallback(response) {
                        getItineraries();
                    }, function errorCallback(response) {});
            }
            $scope.submit = $scope.insertIntinerary;
        }
    ]);
