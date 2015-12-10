var gulp = require("gulp");
var watch = require("gulp-watch");
var min = require("gulp-minify");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var Server = require("karma").Server;


// define tasks here
gulp.task('default', ["watch"]);

gulp.task("watch", function(){
  gulp.watch("www/public/static/js/*.js", ["tdd"]);
});

//builds production version
gulp.task("build", function(){
  return gulp.src("www/public/static/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

//run tests once
gulp.task("tdd", function(done){
  console.log = function(){};
  new Server({
    configFile: __dirname + "\\karma.conf.js",
    singleRun: false
  }, done).start();
});
