'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('SimpleListCtrl', ['$scope', '$filter', '$routeParams', '$http', function($scope, $filter, $routeParams, $http) {

        $scope.category = $routeParams.category;
        $scope.areSorted = false;

        $http.get('app/data/' + $scope.category)
            .success(function(data) {
                $scope.sorted = data;
                $scope.shuffled = $filter('shuffle')($scope.sorted);
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
            });

        $scope.sortableOptions = {
            stop: function(e, ui) {

                for(var i = 0; i < $scope.sorted.length; i++) {
                    if($scope.sorted[i].name != $scope.shuffled[i].name) {
                        $scope.areSorted = false;

                        return;
                    }
                }

                $scope.areSorted = true;
                $scope.$apply();

            }
        };

        $scope.rating = 5;
        $scope.saveRatingToServer = function(rating) {
            console.log('Rating selected = ' + rating);
        }
    }])
    .controller('HomeCtrl', ['$scope', '$filter', function($scope, $filter) {
    }])
    .controller('IndexCtrl', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
        $scope.displayAlert = false;
        $http.get('app/data/categories.json')
            .success(function(data) {
                $scope.categories = data;
                $scope.random = data[Math.floor(Math.random()*data.length)];
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
            });
    }])
    .controller('EasyCategoriesCtrl', ['$scope', '$filter', function($scope, $filter) {
        $scope.categories = ['Alphabet', 'Numbers', 'Planets'];
    }])
    .controller('MediumCategoriesCtrl', ['$scope', '$filter', function($scope, $filter) {
        $scope.categories = ['Presidents', 'Wars'];
    }])
    .controller('HardCategoriesCtrl', ['$scope', '$filter', function($scope, $filter) {
        $scope.categories = ['World War II', 'Periodic Table'];
    }]);