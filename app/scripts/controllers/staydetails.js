'use strict';

/**
 * @ngdoc function
 * @name travelBruhClientApp.controller:StaydetailsCtrl
 * @description
 * # StaydetailsCtrl
 * Controller of the travelBruhClientApp
 */
angular.module('travelBruhClientApp')
    .controller('StaydetailsCtrl', ['$scope', '$routeParams', 'travelBruhFactory',
        function($scope, $routeParams, travelBruhFactory) {
            console.log($routeParams);
            $scope.stayId = $routeParams.itineraryId;
            var nid = $scope.stayId;
            getStay();

            function getStay() {
                travelBruhFactory.getStay($scope.stayId)
                    .success(function(data) {
                        $scope.stay = data[0];
                        console.log('data' + $scope.stay);
                        // $scope.map = {
                        //     center: {
                        //         latitude: data[0].field_destination[0].lat,
                        //         longitude: data[0].field_destination[0].lng
                        //     },
                        //     zoom: 8
                        // };



                    })
                    .error(function(data) {
                        $scope.status = 'Unable to load stay data: ' + error.message;
                        console.log($scope.status);
                    });
            };



        }
    ]);
