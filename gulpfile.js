
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const nodemon = require('gulp-nodemon')
//process sass
gulp.task('sass', function () {
  return gulp.src('./static-src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./static-src/css/**/*.scss', ['sass']);
});
//process images
gulp.task('image', function () {
  return gulp.src('./static-src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./static/img'));
});

gulp.task('image:watch', function () {
  gulp.watch('./static-src/img/*', ['image']);
});
//process javascript
gulp.task('js', function () {
  return gulp.src('./static-src/js/**/*.js')
    .pipe(gulp.dest('./static/js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./static-src/js/**/*.js', ['js']);
});
//process html
gulp.task('html', function () {
  return gulp.src('./static-src/**/*.html')
    .pipe(gulp.dest('./static'));
});

gulp.task('html:watch', function () {
  gulp.watch('./static-src/**/*.html', ['html']);
});
gulp.task('serve',function (){
  nodemon({
    script: 'bin/www',
    watch: ['app','lib']
  })
})

gulp.task('watch',['sass:watch','image:watch','js:watch','html:watch'])
gulp.task('process',['sass','image','js','html'])
gulp.task('default',['process','watch','serve'])
