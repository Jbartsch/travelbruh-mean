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
        'xeditable',
        'gm'
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
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/user', {
                controller: 'UserCtrl',
                templateUrl: 'views/user.html',
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
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }])
    // .run(['$http', '$cookies', function($http, $cookies) {
    //     $http.defaults.headers.post['X-CSRF-Token'] = $cookies.csrftoken;
    // }])



.run(function($rootScope, $location, $cookies, $window) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            $rootScope.loggedIn = $cookies.get('loggedIn');

            if ($rootScope.loggedIn == null) {
                // no logged user, redirect to /login
                if (next.templateUrl === "views/login.html") {} else {
                    $location.path("/login");
                }
            }
        });
    })
    .run(function($rootScope) {
        $rootScope.baseUrl = 'http://travelbruh.localhost';
        $rootScope.reload = true;
    })
    .run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
