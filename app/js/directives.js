'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
    }])
    .directive('historicDraggable', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ngModel) {
                var options = scope.$eval(attrs.historicDraggable); //allow options to be passed in
                if(options == undefined) {
                    options = {};
                }
                options.revert = 'invalid';

                options.start = function(event, ui) {
                    if(ngModel){
                        console.log('setting');
                        elm.data('ui-draggable-item', ngModel.$modelValue);
                    }
                };

                options.stop = function(event, ui) {
                    console.log('draggable stopped');
                };
                elm.draggable(options);


//                elm.draggable({
//                       revert:'invalid'
////                        , appendTo:'parent'
//                    });
            }
        };
    })
    .directive('historicDroppable', function() {
        return {
            restrict: 'A',
            scope: {
                onDragEnter: '&',
                onDragLeave: '&',
                onDrop: '&'
            },
            link: function(scope, elm, attrs) {
                var options = scope.$eval(attrs.historicDraggable); //allow options to be passed in
                if(options == undefined) {
                    options = {};
                }
                options.over = function(event, ui) {
                    scope.onDragEnter();
                };
                options.out = function(event, ui) {
                    scope.onDragLeave();
                };
                options.drop = function(event, element, attrs) {
                    var data = element.draggable.data('ui-draggable-item');

                    scope.onDrop({droppedItem: data, index: 1});
                };

                elm.droppable(options);
            }
        };
    })
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


//$(function(){
//    console.log('draggable');
//
//    $('.left .item').draggable({
//        //connectToSortable,
//        //containment,
//
//        revert:false //,
////                proxy:'clone'
//    });
//
//    $('.right td.drop').droppable({
//        onDragEnter:function(){
//            $(this).addClass('over');
//        },
//        onDragLeave:function(){
//            $(this).removeClass('over');
//        },
//        onDrop:function(e,source){
//            $(this).removeClass('over');
//            if ($(source).hasClass('assigned')){
//                $(this).append(source);
//            } else {
//                var c = $(source).clone().addClass('assigned');
//                $(this).empty().append(c);
//                c.draggable({
//                    revert:true
//                });
//            }
//        }
//    });
//})