'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ListQuizCtrl', ['$scope', '$filter', '$routeParams', '$http', function($scope, $filter, $routeParams, $http) {

        $scope.category = $routeParams.category;
        $scope.areSorted = false;

        $http.get('data/' + $scope.category)
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
    .controller('GridQuizCtrl', ['$scope', '$filter', '$routeParams', '$http', function($scope, $filter, $routeParams, $http) {

        $scope.category = $routeParams.category;
        $scope.areSorted = false;

        $http.get('data/' + $scope.category)
            .success(function(data) {
                $scope.sorted = data;
                $scope.shuffled = $filter('shuffle')($scope.sorted);
                $scope.results = [{},{},{},{},data[3],{},{},{}]

                console.log($scope.results);
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
            });

        $scope.onDrop = function(item, index) {
            console.log('onDrop');
            console.log(item);
            console.log(index);

            for(var i = 0; i < $scope.shuffled; i++) {
                if($scope.shuffled[i].name == item.name) {
                    $scope.shuffled.splice(i, 1);
                    break;
                }
            }

            $scope.results.splice(index, 1, item);

            console.log($scope.results);
            $scope.$apply();
        }
    }])
    .controller('HomeCtrl', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
        $http.get('data/quotes.json')
            .success(function(data) {
                $scope.quote = $filter('random')(data);
            })
            .error(function(data, status) {

            });
    }])
    .controller('IndexCtrl', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
        $scope.displayAlert = false;
        $http.get('data/categories.json')
            .success(function(data) {
                $scope.categories = data;
                $scope.random = $filter('random')(data);
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