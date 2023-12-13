const mymodule = require('./mymodule.js')

const dir = process.argv[2];
const ext = process.argv[3];

mymodule(dir, ext, function (err, data) {
  if (err) {
    console.error("There was an error:", err);
  } else {
    data.forEach((file) => console.log(file));
  }
});