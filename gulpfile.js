/* globals require, process */
"use strict"; // eslint-disable-line

const browserify = require('browserify');
const babelify = require('babelify');
const sassify = require('sassify');
const uglify = require('gulp-uglify');

const gulp = require('gulp');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const paths = {
  src: [
    'src/**/*.js',
    'sass/**/*.scss',
  ],
};

gulp.task('build', () => {
  const b = browserify({
    entries: './src/widget.js',
    transform: [babelify],
  })
    .transform(sassify, {
      sourceComments: false,
      sourceMap: false,
      sourceMapEmbed: false,
      sourceMapContents: false,
      base64Encode: false,
      'auto-inject': true,
    });

  b.bundle()
    .on('error', (err) => {
      console.log(err.message); // eslint-disable-line no-console
    })
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', () => {
  gulp.watch(paths.src, ['build']);
});

gulp.task('default', ['watch', 'build']);
