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