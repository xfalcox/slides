/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var shell = require('gulp-shell')
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 14',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.0',
  'bb >= 10'
];

gulp.task('styles', function () {
  return gulp.src('presentation/*.scss')
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('presentation'))
    .pipe($.size({title: 'styles'}));
});


gulp.task('hovercraft', shell.task([
  'hovercraft presentation/*.rst dist'
]));

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist', 'presentation/*.css']));

// Watch Files For Changes & Reload
gulp.task('serve', function () {
  browserSync({
    notify: false,
    open: 'external',
    server: {
      baseDir: ['dist']
    }
  });

  gulp.watch('presentation/*.rst', ['hovercraft', reload]);
  gulp.watch('presentation/*.scss', ['styles']);
  gulp.watch('.tmp/*.css', ['hovercraft', reload]);
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', 'hovercraft', cb);
});
