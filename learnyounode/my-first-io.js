const fs = require("fs");
const file = process.argv[2];
const readFile = fs.readFileSync(file, "UTF8");
const lines = readFile.split("\n");
const numberOfNewLines = lines.length - 1;
console.log(numberOfNewLines);