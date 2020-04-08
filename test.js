const gulp = require('gulp');
const gulpTouchCustom = require('./');
const through = require('through2');
const Vinyl = require('vinyl');

function exampleproc() {
  return through.obj(function (file, encoding, cb) {
    this.push(new Vinyl({
      path: `${file.relative}.stamp1`,
      contents: Buffer.from('Hello, World.'),
      touch: file.stat.mtime,
    }));
    this.push(new Vinyl({
      path: `${file.relative}.stamp2`,
      contents: Buffer.from('Hello, World.'),
      touch: file.stat,
    }));
    this.push(file);
    cb();
  });
}

gulp.task('default', function () {
  return gulp.src('./test.js')
    .pipe(exampleproc())
    .pipe(gulp.dest('./dest'))
    .pipe(gulpTouchCustom()); // AFTER writing via gulp.dest()
});
