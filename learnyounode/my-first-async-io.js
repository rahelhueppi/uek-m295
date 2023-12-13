const fs = require("fs");
fs.readFile(process.argv[2], "utf8", function callback(err, data){
    if (err){
        console.log(err);
    } else {
        const lines = data.split("\n");
        const numberOfNewLines = lines.length - 1;
        console.log(numberOfNewLines);
    }
})

