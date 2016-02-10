'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:ItinerarycontentCtrl
 * @description
 * # ItinerarycontentCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')
    .controller('ItinerarycontentCtrl', ['$scope', '$routeParams', 'travelBruhFactory', '$http', '$location', '$rootScope', '$timeout',
        function($scope, $routeParams, travelBruhFactory, $http, $location, $rootScope, $timeout) {
            $rootScope.$watch('reload', function() {
                getItinerary();
            });
            $scope.itineraryId = $routeParams.itineraryId;
            var nid = $scope.itineraryId;
            getItinerary();


            $scope.getStayDetails = function(nid) {
                $location.path = $rootScope.baseUrl + '/api/v1/stay/details/' + nid;
            };
            $scope.retreiveLocation = function(locationName) {
                $http({
                    method: 'GET',
                    withCredentials: false,
                    url: 'http://maps.google.com/maps/api/geocode/json?address=' + locationName
                }).then(function successCallback(response) {
                    var geoLocation = response.data.results[0].geometry.location;
                    $scope.geoLocation = geoLocation;
                    $scope.update();
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            };

            $scope.update = function() {
                travelBruhFactory.updateIntinerary($scope.itinerary.title[0].value, $scope.itineraryId, $scope.geoLocation);
                getItinerary();
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
            $scope.deleteIntinerary = function() {
                    swal({
                        title: "Are you sure you want to delete this trip?",
                        text: "You will not be able to recover it!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        closeOnConfirm: false
                    }, function() {
                        travelBruhFactory.deleteIntinerary($scope.itinerary.nid[0].value)
                            .then(function successCallback(response) {
                                $location.path("/itinerary");
                            }, function errorCallback(response) {});
                        swal("Deleted!", "Your itinerary has been deleted.", "success");
                    });

                }
                // Google Maps Autocomplete Set-Up
            $scope.lat = undefined;
            $scope.lng = undefined;
            $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
                var location = $scope.stayPlace.getPlace().geometry.location;
                $scope.locationName = $scope.stayPlace.getPlace().name;
                $scope.lat = location.lat();
                $scope.lng = location.lng();
                $scope.$apply();
                $scope.geoLocationNew = {
                    'lat': $scope.lat,
                    'lng': $scope.lng
                };
            });
            $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
                var location = $scope.activityPlace.getPlace().geometry.location;
                $scope.locationName = $scope.activityPlace.getPlace().name;
                $scope.lat = location.lat();
                $scope.lng = location.lng();
                $scope.$apply();
                $scope.geoLocationNew = {
                    'lat': $scope.lat,
                    'lng': $scope.lng
                };
            });
            $scope.insertStay = function() {
                travelBruhFactory.insertStay($scope.locationName, $scope.price, $scope.dateStart, $scope.dateEnd, $scope.geoLocationNew, $routeParams.itineraryId);
                $scope.stayPlace = undefined;
                $scope.price = undefined;
                $scope.dateStart = undefined;
                $scope.dateEnd = undefined;

            }

            $scope.deleteStay = function() {
                travelBruhFactory.deleteStay(this.stay.nid[0].value);
            }

            $scope.insertActivity = function() {
                travelBruhFactory.insertActivity($scope.activityTitle, $scope.price, $scope.dateStart, $scope.dateEnd, $scope.geoLocationNew, $routeParams.itineraryId);
                $scope.activityTitle = undefined;
                $scope.activityPlace = undefined;
                $scope.price = undefined;
                $scope.dateStart = undefined;
                $scope.dateEnd = undefined;
            }
        }
    ]);
