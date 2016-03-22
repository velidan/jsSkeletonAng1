'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <reference path="../../../typings/tsd.d.ts" />
var path = require('path'),
    pathToServerFile = path.normalize(process.argv[1]),
    enginePath = pathToServerFile.substring(0, pathToServerFile.indexOf('server')),
    jadeModule = require('koa-jade');
var app = require('koa')(),
    configModule = require('./config/config'),
    config = new configModule({
    port: 8080,
    enginePath: enginePath
}).getConfig(),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: app }),
    jade = new jadeModule({
    viewPath: config.backendRootPath + '/templates/',
    debug: true,
    pretty: false,
    app: app
});
app.use(require('koa-static')(config.frontendRootPath));
app.use(_regenerator2.default.mark(function _callee(next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return next;

                case 2:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));
app.use(_regenerator2.default.mark(function _callee2(ctx) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    this.render('app/app.jade');

                case 1:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
}));
wss.on('connection', function (wsInstance) {
    console.log("connected");
    wsInstance.on('message', function (message) {
        console.log('resieved: %s', message);
    });
});
app.listen(config.port, function () {
    return console.log('server started at ' + config.port);
});
//# sourceMappingURL=server.js.map
