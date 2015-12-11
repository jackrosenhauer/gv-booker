module.exports = function(config) {
  "use strict";
  config.set({
    browsers: ["PhantomJS"],
    frameworks: ["mocha", "chai"],
    preprocessors: {
      "src/js/controller.js": "coverage",
      "src/js/validator.js": "coverage"
    },
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage/",
      reporters: [
        {"type": "html"},
        {"type": "text"}
      ]
    },
    files: [
      "src/bower_components/handlebars/handlebars.js",
      "src/js/model.js",
      "src/js/controller.js",
      "src/js/view.js",
      "src/js/helpers.js",
      "src/js/error.js",
      "src/js/app.js",
      "src/js/*.js",
      "test/*.js"
    ],
    client: {
      captureConsole: false,
      mocha: {
        ui: "tdd"
      }
    }
  });
};
