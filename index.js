var fs = require('fs');
var through = require('through2');

module.exports = function gulpTouchCustom() {
  return through.obj(function (file, encoding, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    var atime, mtime;
    if (file.touch instanceof fs.Stats) {
      atime = file.touch.atime;
      mtime = file.touch.mtime;
    } else if (file.touch instanceof Date) {
      atime = mtime = file.touch;
    } else if (file.touch) {
      return cb(new Error('Received `touch` of unexpected type - expected Date or fs.Stats'));
    } else {
      atime = mtime = new Date();
    }
    fs.utimes(file.path, atime, mtime, function (err) {
      cb(err, file);
    });
  });
};
