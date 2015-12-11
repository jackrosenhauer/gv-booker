var gulp = require("gulp");
var watch = require("gulp-watch");
var min = require("gulp-minify");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var htmlreplace = require("gulp-html-replace");
var Server = require("karma").Server;

// define tasks here
gulp.task('default', ["watch"]);

gulp.task("watch", function(){
  gulp.watch("src/js/*.js", ["tdd"]);
});

//builds production version
gulp.task("build", ["package-js", "package-html", "package-css"]);

//run tests once
gulp.task("tdd", function(done){
  console.log = function(){};
  new Server({
    configFile: __dirname + "\\karma.conf.js",
    singleRun: false
  }, done).start();
});

gulp.task("clean", function(){
    return gulp.src("dist/", {read: false})
      .pipe(clean());
});

gulp.task("package-js", function(){
  return gulp.src([
      "src/bower_components/handlebars/handlebars.js",
      "src/js/helpers.js",
      "src/js/validator.js",
      "src/js/view.js",
      "src/js/model.js",
      "src/js/controller.js",
      "src/js/app.js"
    ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("package-html", function(){
  return gulp.src("src/index.html")
    .pipe(htmlreplace({css: "css/main.css", js: "js/main.min.js", handlebars: ""}))
    .pipe(gulp.dest("dist/"));
});

gulp.task("package-deps", function(){
  return gulp.src("src/bower_components/handlebars/handlebars.min.js")
    .pipe(gulp.dest("dist/js/handlebars.js"));
});

gulp.task("package-css", function(){
  return gulp.src(["src/bower_components/normalize-css/normalize.css", "src/css/*.css"])
    .pipe(concat("main.css"))
    .pipe(gulp.dest("dist/css"))
});
