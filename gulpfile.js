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
gulp.task("build", ["clean", "package-js", "package-html", "package-deps"]);

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
  return gulp.src("src/js/*.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("package-html", function(){
  return gulp.src("src/index.html")
    .pipe(htmlreplace({js: "js/main.min.js"}))
    .pipe(gulp.dest("dist/"))
});

gulp.task("package-deps", function(){
  return gulp.src("")
});

gulp.task("package-css", function(){

});
