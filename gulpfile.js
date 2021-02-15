"use strict";

var gulp = require("gulp");
var del = require("del/index");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var postcss = require("gulp-postcss");
var rigger = require('gulp-rigger');
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var uglify = require('gulp-uglify');
var compress = require('gulp-concat')


gulp.task("clean-folder", function () {
  return del("D:/program files/openserver/openserver/domains/canvas", {force: true}); // force: true открывает доступ к удалению содержимого папок, которые лежат выше галпфайла по каталогу. Незаменимо при работе с виртуальным сервером, требующим для себя свою папку, при дефолтных настройках.

});


gulp.task("copy-files", function () {
  return gulp.src([
    "source/fonts/**/*.{ttf,woff,woff2}",
    "source/css/*.{png,svg}",
    "source/css/img/**",
    "source/img/**",
    "source/js/*.php",
    "source/*.ico",
    "source/.htaccess" //конфигурационный файл мне нужен для вирт.сервера опенсервер, онa добавляет кириллицу, в том числе. Видишь ли, ему недостаточно, что ютф-8 прописана в head html
  ], {
    base: "source"
  })
    .pipe(gulp.dest("D:/program files/openserver/openserver/domains/canvas"));
  });

gulp.task("awesomesvg", function () {
  return del("img/*.svg");
});

gulp.task("awesomesvg2", function () {
  return gulp.src([
    "source/img/*.svg"
  ], {
    base: "source"
  })
      .pipe(gulp.dest("D:/program files/openserver/openserver/domains/canvas"));
});


gulp.task("css", function () {
  return gulp.src('source/sass/style.sass')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write(".")) //добавляет файл сорсмап, кот. показывает в инструментах разработчика, из какого файла тот или иной стиль.
    .pipe(gulp.dest("D:/program files/openserver/openserver/domains/canvas/css"));
});

gulp.task("images", function (){
  return gulp.src("source/img/**/*.{png,jpg,svg,gif}")
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ]))
    .pipe(gulp.dest("D:/program files/openserver/openserver/domains/canvas/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))//одно из решений для подключения файлов в html, на данный момент работаем с ним
    // .pipe(htmlmin({ collapseWhitespace: true }))//минимизация хтмл
    .pipe(gulp.dest("D:/program files/openserver/openserver/domains/canvas"));
});

gulp.task("del-templates", function () {
  return del("D:/program files/openserver/openserver/domains/canvas/templates");
});


gulp.task('libraries', function () {
  return gulp.src(['source/libraries/*.js', 'node_modules/bootstrap/dist/js/bootstrap.js'])
      .pipe(uglify())
      .pipe(gulp.dest('D:/program files/openserver/openserver/domains/canvas/js'));
});


// .pipe(compress('all.min.js'))

gulp.task('uglify', function () {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(compress('all.min.js'))
    .pipe(gulp.dest('D:/program files/openserver/openserver/domains/canvas/js'));
});

gulp.task("server", function () {
  server.init({
    proxy: "canvas.elcode.ru",
    notify: false
  });
  gulp.watch("source/sass/**/*.sass", gulp.series("css", "refresh"));
  gulp.watch("source/js/*.*", gulp.series("uglify", "refresh"));
  gulp.watch("source/**/*.html", gulp.series("html", "del-templates", "refresh"));
  gulp.watch("source/**/*.svg", gulp.series("awesomesvg", "awesomesvg2", "refresh"));
});

gulp.task("build", gulp.series(
  "clean-folder",
  "copy-files",
  "css",
  "images",
  "html",
  "libraries",
  "uglify"
));

gulp.task("start", gulp.series(
  "build",
  "server"
));

gulp.task("refresh", function (done) {
  server.reload();
  done();
});
