'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

module.exports = function(options) {
    return function() {
        return gulp.src(options.src, {since: gulp.lastRun(options.taskName)})
            .pipe(cleanCSS())
            .pipe(gulp.dest(options.dest));
    };
};