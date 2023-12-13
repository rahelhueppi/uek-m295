const http = require("http");
const url = process.argv[2];

http
  .get(url, function (response) {
    let data = "";

    response.on("data", function (chunk) {
      data += chunk;
    });

    response.on("end", function () {
      console.log(data);
    });
  })
  .on("error", function (error) {
    console.log(`Problem mit der Anfrage: ${error.message}`);
  });
