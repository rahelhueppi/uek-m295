const http = require("http");
const url = process.argv[2];

http.get(url, callback);

function callback(response) {
  response.setEncoding("utf8");
  response.on("data", function (data) {
    console.log(data);
  });
  response.on("error", function (err) {
    console.log(err);
  });
  response.on("end", function () {
    console.log();
  });
}