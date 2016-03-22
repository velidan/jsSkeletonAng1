/// <reference path="../../../../typings/tsd.d.ts" />
/**
 * Module with some useful stuff
 */

class Utility {
    
    constructor (){
        
    }
    
    public requireAndFireAngModule(moduleNames : string[]) : any  {
       moduleNames.forEach((moduleName) => {
           require('../modules/' + moduleName + '/' + moduleName + 'Module')(moduleName);
       })
    }
    
}

module.exports = Utility;