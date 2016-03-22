/// <reference path="../../../../../typings/tsd.d.ts" />
module.exports = (function () {
'use strict';
const mainAppViewPath = '/app/views',
    moduleViewPath = '/modules'
    
angular.module('mainApp').config(['$routeProvider', ($routeProvider) => {
    $routeProvider.
        when('/', {
            templateUrl : moduleViewPath + '/index/views/index.html',
            controller : 'indexController'
        }).
        when('/about', {
            templateUrl : moduleViewPath + '/about/views/about.html',
            controller : 'aboutController'
        }).
        when('/contacts', {
            templateUrl : moduleViewPath + '/contact/views/contact.html',
            controller : 'contactController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
    
    
}());