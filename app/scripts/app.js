'use strict';

/**
 * @ngdoc overview
 * @name travelBruhClientApp
 * @description
 * # travelBruhClientApp
 *
 * Main module of the application.
 */
angular
    .module('travelBruhClientApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'uiGmapgoogle-maps',
        'xeditable'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/itinerary', {
                templateUrl: 'views/itinerary.html',
                controller: 'ItineraryCtrl'
            })
            .when('/itinerary/:itineraryId', {
                templateUrl: 'views/itinerarycontent.html',
                controller: 'ItinerarycontentCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/stay/details/:itineraryId', {
              templateUrl: 'views/staydetails.html',
              controller: 'StaydetailsCtrl'
            })
            .otherwise({
                redirectTo: '/itinerary'
            });
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/hal+json;charset=utf-8'
        }
    }])
    .run(function($rootScope) {
        $rootScope.baseUrl = 'http://travelbruh.localhost';
    })
    .run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
