const express = require("express");
//const moment = require('moment-timezone');
const request = require('request');
const app = express();
const port = 3000;
//const names = ["Hugo", "Sophie", "Liam", "Emma", "Oliver", "Ava", "Noah", "Isabella", "Finn", "Olivia", "Benjamin", "Mia", "Elias", "Amelia", "Paul", "Ella", "Luca", "Charlotte", "Max", "Aiden"];

/*
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

/*
app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});

*/


const names = new Set(["Leonardo", "Michelangelo", "Donatello", "Raphael"])

app.get("/names", (request, response) => {
	response.json(Array.from(names))
})

//app.post("/names", formHelper, (request, response) => {
//	const name = request.body.name
//	names.add(name)
//	response.sendStatus(201)
//})

app.use(express.urlencodes({ extendes: true }))
app.post("/names", (req, res) =>{
    console.log(request.body.name)
    names.push(request.body.name);
    console.log(names);
})

app.delete("/names", formHelper, (request, response) => {
	const name = request.body.name
	if(names.has(name)) {
		names.delete(name)
		response.sendStatus(204)
	} else {
		response.sendStatus(404)
	}
})

app.get("/secret2", (request, response) => {
	const auth = request.headers.authorization
	if(auth == "Basic aGFja2VyOjEyMzQ=") {
		response.sendStatus(200)
	} else {
		response.sendStatus(401)
	}
})

app.get("/chuck", async (request, response) => {
	const apiResponse = await fetch(`https://api.chucknorris.io/jokes/random`)
	const data = await apiResponse.json()
	const joke = data.value
	const name = request.query.name
	response.send(joke.replace("Chuck Norris", name))
})

	const me = {
		firstName: "Diego",
		lastName: "Steiner",
		age: 36,
		place: "Uster",
		eyeColor: "brown"
	}

app.get('/me', (request, response) => {
	response.json(me)
})

app.patch('/me', jsonHelper, (request, response) => {
	const merge = request.body
	const result = {
		...me,
		...merge
	}

	response.json(result)
})

app.listen(3000)

