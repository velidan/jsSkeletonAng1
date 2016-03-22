/// <reference path="../interfaces/ConfigOptionsInterface.ts" />

/**
 * Config Class
 */
 
class Config  {
    private engineRootPath : string;
    private frontendRootPath : string;
    private backendRootPath : string;
    private port : number;
    
    constructor (options : ConfigOptionsInterface)  {
       this.port = options.port;
       
       this.engineRootPath = options.enginePath;
       
       this.frontendRootPath = options.enginePath + 'frontend/built';
       this.backendRootPath = options.enginePath + 'backend';
       
    }
    
    /**
     * Get the config object with db access and some other stuff like rootPath, library
     */
    getConfig() {
        return {
            port : this.port,
            engineRootPath : this.engineRootPath,
            frontendRootPath : this.frontendRootPath,
            backendRootPath : this.backendRootPath
            
        };
    }
    
}

module.exports = Config;