const express = require("express");
const req = require('request');
const app = express();
const port = 3000;

app.get("/:choice", (request, response) => {
    const choice = request.params.choice;
    if (choice === 'now') {
        const now = new Date().toLocaleTimeString()
        response.send(`Aktuelle Zeit: ${now}`)
    } else if (choice === 'zli') {
        const to = "https://www.zli.ch";
        response.redirect(to);
    } else if (choice === 'name') {
        const names = ["Hugo", "Sophie", "Liam", "Emma", "Oliver", "Ava", "Noah", "Isabella", "Finn", "Olivia", "Benjamin", "Mia", "Elias", "Amelia", "Paul", "Ella", "Luca", "Charlotte", "Max", "Aiden"];
        const randomName = names[Math.floor(Math.random() * names.length)]
        response.send(`Hallo ${randomName}`)
    } else if (choice === 'html') {
        response.sendFile(__dirname + '/static.html') //__dirname ist der absolute Pfad von dieser Datei
    } else if (choice === 'image') {
        response.sendFile(__dirname + '/baum.jpeg')
    } else if (choice === 'teapot') {
        response.sendStatus(418)
    } else if (choice === 'user-agent') {
        const userAgent = request.headers["user-agent"]
        response.send(userAgent)
    } else if (choice === 'secret') {
        response.sendStatus(403)
    } else if (choice === 'xml') {
        response.send("hello")
    } else {
        response.send('Unbekannter Typ')
    }
 });

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});