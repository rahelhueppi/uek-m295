const fs = require("fs");
const path = require("path");

module.exports = function arguments(dir, ext, callback) {
    fs.readdir(dir, function (err, data) {
      if (err) {
        callback(err);
        return;
      }
      const filteredFiles = data.filter(function (file) {
        return path.extname(file) === `.${ext}`;
      });
      callback(null, filteredFiles);
    });
  };