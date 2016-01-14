'use strict';

/**
 * @ngdoc service
 * @name travelBruhClientApp.travelBruhFactory
 * @description
 * # travelBruhFactory
 * Factory in the travelBruhClientApp.
 */
angular.module('travelBruhClientApp')
    .factory('travelBruhFactory', ['$http', '$rootScope', '$filter',
        function($http, $rootScope, $filter) {

            var travelBruhFactory = {};

            travelBruhFactory.getItineraries = function() {
                return $http.get($rootScope.baseUrl + '/api/v1/itinerary');
            };

            travelBruhFactory.getIntinerary = function(nid) {
                return $http.get($rootScope.baseUrl + '/api/v1/itinerary/' + nid);
            };

            travelBruhFactory.insertIntinerary = function(text, dateStart, dateEnd, coordinates) {


                function CreateProp(variable, propertyName, propertyValue) {
                    variable[propertyName] = propertyValue;
                };

                var data = {};
                var titleVal = {};
                CreateProp(titleVal, "value", text);
                dateStart = $filter('date')(new Date(dateStart), 'yyyy-MM-dd')
                dateEnd = $filter('date')(new Date(dateEnd), 'yyyy-MM-dd')
                var dateStartVal = {};
                CreateProp(dateStartVal, "value", dateStart);
                var dateEndVal = {};
                CreateProp(dateEndVal, "value", dateEnd);
                data.title = [titleVal];
                data.field_date = [dateStartVal];
                data.field_end_date = [dateEndVal];
                data.field_destination = [coordinates];
                data._links = {
                    "type": {
                        "href": $rootScope.baseUrl + "/rest/type/node/itinerary"
                    }
                };
                return $http({
                    method: 'POST',
                    url: $rootScope.baseUrl + '/entity/node',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/hal+json'
                    }
                });
            };

            travelBruhFactory.updateIntinerary = function(title, nid, coordinates) {
                var data = {};
                data.title = [title];
                data.field_destination = [coordinates];
                data._links = {
                    "type": {
                        "href": $rootScope.baseUrl + "/rest/type/node/itinerary"
                    }
                };
                return $http({
                    method: 'PATCH',
                    url: $rootScope.baseUrl + '/node/' + nid,
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/hal+json',
                        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=',
                        'X-CSRF-Token': 'RS2ohuHT19GoruQ_Fy_TBzTQ27II46fpp2GXuQ2p6M8'
                    }
                });
            };

            travelBruhFactory.deleteIntinerary = function(nid) {
                return $http.delete($rootScope.baseUrl + '/node/' + nid);
            };

            travelBruhFactory.getStays = function(nid) {
                return $http.get($rootScope.baseUrl + '/api/v1/stay/' + nid);
            };
            travelBruhFactory.getStay = function(nid) {
                console.log('factory');
                return $http.get($rootScope.baseUrl + '/api/v1/stay/details/' + nid);
            };

            travelBruhFactory.insertStay = function(text, price, dateStart, dateEnd, coordinates, parentId) {


                function CreateProp(variable, propertyName, propertyValue) {
                    variable[propertyName] = propertyValue;
                };

                var data = {};
                var titleVal = {};
                CreateProp(titleVal, "value", text);
                var priceVal = {};
                CreateProp(priceVal, "value", price);
                var parentIdVal = {};
                CreateProp(parentIdVal, "target_id", parentId);
                dateStart = $filter('date')(new Date(dateStart), 'yyyy-MM-dd')
                dateEnd = $filter('date')(new Date(dateEnd), 'yyyy-MM-dd')
                var dateStartVal = {};
                CreateProp(dateStartVal, "value", dateStart);
                var dateEndVal = {};
                CreateProp(dateEndVal, "value", dateEnd);
                data.title = [titleVal];
                data.field_price = [priceVal];
                data.field_date = [dateStartVal];
                data.field_end_date = [dateEndVal];
                data.field_destination = [coordinates];
                data.field_trip_reference = [parentIdVal];
                data._links = {
                    "type": {
                        "href": $rootScope.baseUrl + "/rest/type/node/stay"
                    }
                };
                return $http({
                    method: 'POST',
                    url: $rootScope.baseUrl + '/entity/node',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/hal+json'
                    }
                });
            };

            travelBruhFactory.deleteStay = function(nid) {
                return $http.delete($rootScope.baseUrl + '/node/' + nid);
            };

            return travelBruhFactory;

        }
    ]);
