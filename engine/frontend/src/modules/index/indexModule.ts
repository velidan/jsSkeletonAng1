/// <reference path="../../../../../typings/tsd.d.ts" />
module.exports = function (moduleName : string) {
'use strict';

angular.module(moduleName + 'Module', []);

require('./controllers/' + moduleName + 'Controller')(moduleName);
 
};
 