// // Karma configuration
// // Generated on Wed Dec 09 2015 23:37:28 GMT-0500 (Eastern Standard Time)
//
// module.exports = function(config) {
//   config.set({
//
//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: '',
//
//
//     // frameworks to use
//     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ['jasmine', 'requirejs'],
//
//
//     // list of files / patterns to load in the browser
//     files: [
//       {pattern: '"www/public/static/js/*.js"', included: false},
//       {pattern: 'www/public/static/js/*.js', included: false},
//       {pattern: 'www/public/static/css/*.css', included: false},
//       {pattern: 'www/public/static/index.html', included: false},
//       {pattern: 'www/public/static/tests/*.js', included: false}
//     ],
//
//
//     // list of files to exclude
//     exclude: [
//       '**/*.swp'
//     ],
//
//
//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     preprocessors: {
//     },
//
//
//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//     reporters: ['progress'],
//
//
//     // web server port
//     port: 9876,
//
//
//     // enable / disable colors in the output (reporters and logs)
//     colors: true,
//
//
//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,
//
//
//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: true,
//
//
//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: ['Chrome'],
//
//
//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: false,
//
//     // Concurrency level
//     // how many browser should be started simultanous
//     concurrency: Infinity
//   })
// }

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', "chai"],
    preprocessors: {
      "www/public/static/js/controller.js": "coverage",
      "www/public/static/js/validator.js": "coverage"
    },
    reporters: ["progress", "coverage"],
    // coverageReporter: { type: "html", dir: "coverage/" },
    coverageReporter: { type: "text", dir: "coverage/" },
    files: [
      'www/public/static/js/model.js',
      'www/public/static/js/controller.js',
      'www/public/static/js/view.js',
      'www/public/static/js/helpers.js',
      'www/public/static/js/error.js',
      'www/public/static/js/app.js',
      'www/public/static/js/*.js',
      'test/*.js'
    ],
    client: {
      captureConsole: false,
      mocha: {
        ui: "tdd"
      }
    }
  });
};
