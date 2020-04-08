# gulp-touch-custom

Change file access and modification times of files in gulp streams

## Install

Install with [npm](https://npmjs.org/package/gulp-touch-custom)

```
npm install --save-dev gulp-touch-custom
```

## Usage

Pipe into this *after* piping to a gulp destination (files must have been written to disk) to touch the files.

On each file, set an optional `touch` member (of type `Date` or `fs.Stats`) to set the access and modification times to a certain value, similar to the command line `touch -t` and `touch -r`.

## Example (simple touch to current timestamp)

```js
var gulp = require('gulp');
var touch = require('gulp-touch-custom');

gulp.task('default', function() {
  return gulp.src('./src/**/*')
    .pipe(gulp.dest('./dest'))
    .pipe(touch());
});
```

## Example (touch by reference)

```js
var gulp = require('gulp');
var through = require('through2');
var touch = require('gulp-touch-custom');
var Vinyl = require('vinyl');

function exampleproc() {
  return through.obj(function (file, encoding, cb) {
    // This gulp step outputs multiple files
    this.push(new Vinyl({
      path: file.relative + '.stamp',
      contents: Buffer.from('Hello, World.'),
      touch: file.stat.mtime, // Use timestamp of the source file by reference
    }));
    this.push(file); // With file.touch undefined, will be use the current time
    cb();
  });
}

gulp.task('default', function () {
  return gulp.src('./src/**/*.foo')
    .pipe(exampleproc())
    .pipe(gulp.dest('./dest'))
    .pipe(touch());
});
```
