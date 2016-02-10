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
            getItineraries();
            $rootScope.$watch('reload', function() {
                getItineraries();
            });

            function getItineraries() {
                travelBruhFactory.getItineraries();
            };


            // Google Maps Autocomplete Set-Up
            $scope.lat = undefined;
            $scope.lng = undefined;
            $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
                var location = $scope.text.getPlace().geometry.location;
                $scope.locationName = $scope.text.getPlace().formatted_address;
                $scope.lat = location.lat();
                $scope.lng = location.lng();
                $scope.$apply();
                $scope.geoLocationNew = {
                    'lat': $scope.lat,
                    'lng': $scope.lng
                };
            });

            $scope.insertIntinerary = function() {
                travelBruhFactory.insertIntinerary($scope.locationName, $scope.dateStart, $scope.dateEnd, $scope.geoLocationNew);
                $scope.text = '';
                $scope.dateStart = '';
                $scope.dateEnd = '';
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
