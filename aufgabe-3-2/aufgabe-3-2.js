const express = require("express");
const request = require('request');
const app = express();
const port = 3000;
let url = "";


app.get("/:plz", (req, res) => {
  const plz = req.params.plz
  res.send("Postleitzahl: " + plz);
  url =`https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;
  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      console.log(data.currentWeather.temperature, "Grad");
      //res.send(String(data.currentWeather.temperature))
    }
  });
 });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
