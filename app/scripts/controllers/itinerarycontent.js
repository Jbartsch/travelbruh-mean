'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:ItinerarycontentCtrl
 * @description
 * # ItinerarycontentCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')
    .controller('ItinerarycontentCtrl', ['$scope', '$routeParams', 'travelBruhFactory', '$http', '$location',
        function($scope, $routeParams, travelBruhFactory, $http, $location) {

            $scope.itineraryId = $routeParams.itineraryId;
            var nid = $scope.itineraryId;
            getItinerary();


            $scope.getStayDetails = function (nid) {
                $location.path = $rootScope.baseUrl + '/api/v1/stay/details/' + nid;
            };
            $scope.update = function() {
                travelBruhFactory.updateIntinerary($scope.itinerary.title[0].value, $scope.itineraryId, $scope.geoLocation)
                    .success(function(data) {
                        console.log('content updated');
                        getItinerary();
                    })
                    .error(function(data) {
                        console.log('content not updated: ' + data);

                    });
            };

            function getItinerary() {
                travelBruhFactory.getIntinerary($scope.itineraryId)
                    .success(function(data) {
                        $scope.itinerary = data[0];
                        $scope.map = {
                            center: {
                                latitude: data[0].field_destination[0].lat,
                                longitude: data[0].field_destination[0].lng
                            },
                            zoom: 8
                        };
                        $scope.itinerary.date_start = new Date($scope.itinerary.field_date[0].value);


                        travelBruhFactory.getStays($scope.itineraryId)

                        .success(function(data) {
                                $scope.stays = data;
                                $scope.stayMapOptions = {
                                    icon: '/images/hotel-512.png'
                                };
                                $scope.getTotal = function() {

                                    var total = 0;
                                    for (var i = 0; i < $scope.stays.length; i++) {
                                        var product = $scope.stays[i];
                                        total += parseFloat(product.field_price[0].value);
                                    }
                                    return total;
                                }
                            })
                            .error(function(data) {
                                $scope.status = 'Unable to load stay data: ' + error.message;
                            });
                    })
                    .error(function(data) {
                        $scope.status = 'Unable to load itinerary data: ' + error.message;
                    });
            };

            $scope.insertStay = function() {
                travelBruhFactory.insertStay($scope.place, $scope.price, $scope.dateStart, $scope.dateEnd, $scope.geoLocation, $routeParams.itineraryId)

                .then(function successCallback(response) {
                    getItinerary();
                    $scope.place = '';
                    $scope.price = '';

                }, function errorCallback(response) {
                    console.log('Error');

                });
            }

            $scope.deleteStay = function() {
                travelBruhFactory.deleteStay(this.stay.nid[0].value)

                .then(function successCallback(response) {
                    getItinerary();

                }, function errorCallback(response) {

                });
            }

            $scope.getLocation = function(locationName) {
                $http({
                    method: 'GET',
                    url: 'http://maps.google.com/maps/api/geocode/json?address=' + locationName
                }).then(function successCallback(response) {
                    var geoLocation = response.data.results[0].geometry.location;
                    $scope.geoLocation = geoLocation;
                    $scope.allLocations = response.data.results;
                    $scope.update();

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            };
        }
    ]);
