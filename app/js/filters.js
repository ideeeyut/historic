'use strict';

/* Filters */

angular.module('myApp.filters', [])
    .filter('interpolate', ['version', function(version) {
        return function(text) {
          return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('shuffle', function() {
        var shuffledArr = [],
            shuffledLength = 0;

        return function(arr) {
            var o = arr.slice(0, arr.length);
            if(shuffledLength == arr.length) return shuffledArr;
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            shuffledArr = o;

            shuffledLength = o.length;

            return o;
        }
    })
    .filter('random', function() {
        return function(arr) {
            return arr[Math.floor(Math.random()*arr.length)];
        }
    });
