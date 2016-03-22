module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns
    basePath: '.',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.min.js',
      './node_modules/angular-route/angular-route.min.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './engine/frontend/built/app/app.min.js',
      './tests/*.js'
      
    ],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    // test result reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['Chrome'],
    
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // Continuous Integration mode
    singleRun: false
  });
};