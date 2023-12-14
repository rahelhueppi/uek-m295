const express = require("express");
//const moment = require('moment-timezone');
const request = require('request');
const app = express();
const port = 3000;
const names = ["Hugo", "Sophie", "Liam", "Emma", "Oliver", "Ava", "Noah", "Isabella", "Finn", "Olivia", "Benjamin", "Mia", "Elias", "Amelia", "Paul", "Ella", "Luca", "Charlotte", "Max", "Aiden"];

app.get("/now", (req, res) => {
    const date = new Date();
    res.send(date.toLocaleTimeString('en-US'))
});

/*
app.use(express.urlencodes({ extendes: true }))
app.post("/names", (req, res) =>{
    console.log(request.body.name)
    names.push(request.body.name);
    console.log(names);
})*/

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});



