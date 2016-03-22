'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <reference path="../interfaces/ConfigOptionsInterface.ts" />
/**
 * Config Class
 */

var Config = function () {
    function Config(options) {
        (0, _classCallCheck3.default)(this, Config);

        this.port = options.port;
        this.engineRootPath = options.enginePath;
        this.frontendRootPath = options.enginePath + 'frontend/built';
        this.backendRootPath = options.enginePath + 'backend';
    }
    /**
     * Get the config object with db access and some other stuff like rootPath, library
     */


    (0, _createClass3.default)(Config, [{
        key: 'getConfig',
        value: function getConfig() {
            return {
                port: this.port,
                engineRootPath: this.engineRootPath,
                frontendRootPath: this.frontendRootPath,
                backendRootPath: this.backendRootPath
            };
        }
    }]);
    return Config;
}();

module.exports = Config;
//# sourceMappingURL=config.js.map
