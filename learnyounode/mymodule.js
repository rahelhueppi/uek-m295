const fs = require("fs");
const path = require("path");

/*
module.exports = function arguments(dir, ext, callback) {
    fs.readdir(dir, function (err, data) {
      if (err) {
        callback(err);
        return;
      } else {
        const filteredFiles = data.filter(function (file) {
            return path.extname(file) === `.${ext}`;
      }});
      callback(null, filteredFiles);
    });
  };
*/


//Lösung von filtered-ls.js
const fs = require("fs")
const path = require('path');
fs.readdir(process.argv[2], function callback(err, list){
    if (err){
        console.log(err);
        return;
    } else {
        const ext = process.argv[3]
        const filteredFiles = list.filter(function filter(file){
            return path.extname(file) === `.${ext}`;
        })
        filteredFiles.forEach(function (file){
            console.log(file)
        })
    }
})