/// <reference path="../../../../../../typings/tsd.d.ts" />
module.exports = function (moduleName : string) {
'use strict';
    
angular.module(moduleName + 'Module')
    .controller(moduleName + 'Controller',
        ['$scope',
            function ($scope) {
        
    console.log(moduleName + 'Controller');
}]);
        
        
};