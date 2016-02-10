'use strict';

/**
 * @ngdoc service
 * @name travelBruhClientApp.travelBruhFactory
 * @description
 * # travelBruhFactory
 * Factory in the travelBruhClientApp.
 */
angular.module('travelBruhClientApp')
    .factory('travelBruhFactory', ['$http', '$rootScope', '$filter', '$cookies',
            function($http, $rootScope, $filter, $cookies) {

                var travelBruhFactory = {};

                function getToken() {
                    return $http({
                        method: 'GET',
                        withCredentials: true,
                        url: $rootScope.baseUrl + '/rest/session/token',
                        headers: {
                            'Content-Type': 'application/hal+json',
                        }

                    });
                };

                travelBruhFactory.getUser = function() {
                    return $http({
                        method: 'GET',
                        url: $rootScope.baseUrl + '/user/1?_format=hal_json',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/hal+json'
                        }
                    });


                };

                travelBruhFactory.getItineraries = function() {
                    getToken()
                        .success(function(response) {
                            $http({
                                    method: 'GET',
                                    url: $rootScope.baseUrl + '/api/v1/itinerary',
                                    headers: {
                                        "content-type": "application/json",
                                        "accept": "application/json",
                                        'X-CSRF-Token': response
                                    }
                                }).success(function(data) {
                                    $rootScope.itineraries = data;

                                })
                                .error(function(data) {
                                    $rootScope.status = 'Unable to load itinerary data: ' + error.message;
                                });

                        })
                        .error(function(response) {});
                };

                travelBruhFactory.getIntinerary = function(nid) {
                    return $http.get($rootScope.baseUrl + '/api/v1/itinerary/' + nid, {
                        withCredentials: true
                    });
                };

                travelBruhFactory.insertIntinerary = function(text, dateStart, dateEnd, coordinates) {
                    getToken()
                        .success(function(response) {
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
                                withCredentials: true,
                                url: $rootScope.baseUrl + '/entity/node',
                                data: JSON.stringify(data),
                                headers: {
                                    'Content-Type': 'application/hal+json',
                                    'X-CSRF-Token': response
                                }
                            }).success(function(response) {
                                $rootScope.reload = !$rootScope.reload;
                            });
                        })

                    .error(function(response) {

                    });


                };

                travelBruhFactory.updateIntinerary = function(title, nid, coordinates) {
                    getToken()
                        .success(function(response) {
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
                                withCredentials: true,
                                url: $rootScope.baseUrl + '/node/' + nid,
                                data: JSON.stringify(data),
                                headers: {
                                    'Content-Type': 'application/hal+json',
                                    'X-CSRF-Token': response
                                }
                            }).success(function(response) {
                                $rootScope.reload = !$rootScope.reload;
                            });
                        })
                        .error(function(response) {
                            // Add error message here
                        });

                };

                travelBruhFactory.deleteIntinerary = function(nid) {

                    // get token
                    return $http({
                            method: 'GET',
                            withCredentials: true,
                            url: $rootScope.baseUrl + '/rest/session/token',
                            headers: {
                                'Content-Type': 'application/hal+json',
                            }
                        })
                        // when success -> get stays
                        .success(function successCallback(response) {
                            $rootScope.csrfToken = response;
                            $http.get($rootScope.baseUrl + '/api/v1/stay/' + nid, {
                                withCredentials: true
                            }).success(function successCallback(stays) {
                                // delete all stays
                                for (var i = 0; i < stays.length; i++) {
                                    var aid = stays[i].nid[0].value;
                                    travelBruhFactory.deleteStay(aid);
                                }

                                return $http({
                                    method: 'DELETE',
                                    withCredentials: true,
                                    url: $rootScope.baseUrl + '/node/' + nid,
                                    headers: {
                                        'Content-Type': 'application/hal+json',
                                        'X-CSRF-Token': $rootScope.csrfToken
                                    }
                                }).success(function(response) {

                                });

                            });


                        });

                };

        travelBruhFactory.getStays = function(nid) {
            return $http.get($rootScope.baseUrl + '/api/v1/stay/' + nid, {
                withCredentials: true
            });
        }; travelBruhFactory.getStay = function(nid) {
            return $http.get($rootScope.baseUrl + '/api/v1/stay/details/' + nid);
        };

        travelBruhFactory.insertStay = function(text, price, dateStart, dateEnd, coordinates, parentId) {
            getToken()
                .success(function(response) {
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

                    dateStart = $filter('date')(new Date(dateStart), 'yyyy-MM-dd');
                    var dateStartVal = {};
                    CreateProp(dateStartVal, "value", dateStart);

                    dateEnd = $filter('date')(new Date(dateEnd), 'yyyy-MM-dd');
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
                        withCredentials: true,
                        url: $rootScope.baseUrl + '/entity/node',
                        data: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/hal+json',
                            'X-CSRF-Token': response
                        }
                    }).success(function(response) {
                        $rootScope.reload = !$rootScope.reload;
                    });

                })
                .error(function(response) {});


        };

        travelBruhFactory.deleteStay = function(nid) {
            getToken()
                .success(function(response) {
                    return $http({
                        method: 'DELETE',
                        withCredentials: true,
                        url: $rootScope.baseUrl + '/node/' + nid,
                        headers: {
                            'Content-Type': 'application/hal+json',
                            'X-CSRF-Token': response
                        }
                    }).success(function(response) {
                        $rootScope.reload = !$rootScope.reload;
                    });
                });

        };

        travelBruhFactory.insertActivity = function(text, price, dateStart, dateEnd, coordinates, parentId) {
            getToken()
                .success(function(response) {
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

                    dateStart = $filter('date')(new Date(dateStart), 'yyyy-MM-dd');
                    var dateStartVal = {};
                    CreateProp(dateStartVal, "value", dateStart);

                    dateEnd = $filter('date')(new Date(dateEnd), 'yyyy-MM-dd');
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
                            "href": $rootScope.baseUrl + "/rest/type/node/activity"
                        }
                    };
                    return $http({
                        method: 'POST',
                        withCredentials: true,
                        url: $rootScope.baseUrl + '/entity/node',
                        data: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/hal+json',
                            'X-CSRF-Token': response
                        }
                    }).success(function(response) {
                        $rootScope.reload = !$rootScope.reload;
                    });

                })
                .error(function(response) {});


        };

        return travelBruhFactory;

    }
]);




// getToken()
//     .success(function(response) {
//         // Add the request here
//     })
//     .error(function(response) {
//         // Add error message here
//     });
