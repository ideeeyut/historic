'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
    }])
    .directive('historicRating', function() {
        return {
            restrict: 'A',
            template: '<ul class="rating"><li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">\u2605</li></ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                readonly: '@',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];

                    for(var i = 0; i < scope.max; i++) {
                        scope.stars.push({filled: i < scope.ratingValue});
                    }
                };

                scope.toggle = function(index) {
                    if(scope.readonly && scope.readonly === 'true') {
                        return;
                    }

                    if(scope.ratingValue == index + 1) {
                        scope.ratingValue = 0;
                    }
                    else {
                        scope.ratingValue = index + 1;
                    }

                    scope.onRatingSelected({newRating: scope.ratingValue});
                };

                scope.$watch('ratingValue', function(oldVal, newVal) {
                    updateStars();
                });
            }
        };
    });
