/// <reference path="../../../typings/tsd.d.ts" />

let path = require('path'),
    pathToServerFile : string = path.normalize(process.argv[1]),
    enginePath : string = pathToServerFile.substring(0 , pathToServerFile.indexOf('server')),
    jadeModule = require('koa-jade');



const app = require('koa')(), 
    configModule = require('./config/config'),
    config = new configModule({
        port : 8080,
        enginePath : enginePath
    }).getConfig(),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({server : app}),
    jade = new jadeModule({
        viewPath : config.backendRootPath + '/templates/',
        debug : true,
        pretty : false,
        app : app
    }); 


    app.use(require('koa-static')(config.frontendRootPath));
    
    app.use(function* (next) {
       //console.log(this); 
       yield next;
    });

    app.use(function* (ctx) { 
        this.render('app/app.jade');  
    })
    
    wss.on('connection', (wsInstance) : void => {
        console.log("connected");
        wsInstance.on('message', (message : any) : void => {
            console.log('resieved: %s', message);
        } )
    });
    
    

    
    
    app.listen(config.port, () => console.log('server started at ' + config.port));