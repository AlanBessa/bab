(function() {
    'use strict';

    angular.module('bab').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'pages/home/index.html'
            }).otherwise({ templateUrl: 'pages/shared/404.html' });
    }]);
})();