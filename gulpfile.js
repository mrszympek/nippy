'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include');

gulp.task('sass', function () {
    gulp.src('scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});


gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '_partials/'
        }))
        .pipe(gulp.dest('./.tmp'))
        .pipe(connect.reload());
});

gulp.task('watch', ['sass'], function () {
    gulp.watch('**/*.scss', ['sass']);
    gulp.watch('**/*.html', ['html']);
});

gulp.task('webserver', function () {
    connect.server({
        root: ['.tmp', '.'],
        livereload: true,
        post: 1337
    });
});

gulp.task('default', ['html', 'webserver', 'watch']);