'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('elenApp').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: 'templates/dashboard.html'
            })
            .state('planning', {
                url: '/planning', 
                templateUrl: 'templates/planning.html', 
                controller: 'PlanningCtrl'
            })
            .state('add', {
                url: '/add',
                controller: 'AddCtrl',
                templateUrl: 'templates/add.html'
            })

            .state('edit', {
                url: '/edit/:id',
                controller: 'EditCtrl',
                templateUrl: 'templates/edit.html'
            })

            .state('parameters', {
                url: '/parameters', 
                controller: 'ParametersCtrl', 
                templateUrl: 'templates/parameters.html'
            })
    }
]);