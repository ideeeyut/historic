'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'ui.sortable']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/easy', {templateUrl: 'partials/categories.html', controller: 'EasyCategoriesCtrl'});
    $routeProvider.when('/medium', {templateUrl: 'partials/categories.html', controller: 'MediumCategoriesCtrl'});
    $routeProvider.when('/hard', {templateUrl: 'partials/categories.html', controller: 'HardCategoriesCtrl'});
    $routeProvider.when('/simple/:category', {templateUrl: 'partials/simplelist.html', controller: 'SimpleListCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
