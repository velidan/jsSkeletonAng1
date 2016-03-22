/// <reference path="../../../../typings/tsd.d.ts" />
'use strict';
const utilClass = require('../jsStandard/utilities'),
    util = new utilClass(); 

angular.module('mainApp', [
    'ngRoute',
    'indexModule',
    'aboutModule',
    'contactModule'
]);
 
require('./routes/routes');

let moduleNames : string[] = ['index', 'about', 'contact']; 

util.requireAndFireAngModule(moduleNames);

//require('../modules/' + moduleName + '/' + moduleName + 'Module');
//require('../modules/index/indexModule');