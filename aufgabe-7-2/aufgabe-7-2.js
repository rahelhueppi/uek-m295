const express = require("express");
const session = require('express-session')
//const swaggerAutogen = require('swagger-autogen')()
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger_output.json');

const app = express();
const port = 3000;

//Middleware: Hier lade ich die Express JSON Middleware, damit ich an meine Endpunkte JSON-Daten
//im body senden kann und diese direkt als JavaScript Objekt verfügbar werden
app.use(express.json());

//swaggerAutogen( './swagger_output.json', ['./aufgabe-6-2.js'])
//app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.use(session({
  secret: 'supersecret',
	resave: false,
	saveUninitialized: false,
  cookie: {}
}))


// generated with ChatGPT
let books = [
  {isbn: "9780345391803", title: "Jurassic Park", year: "1990", author: "Michael Crichton"},
  {isbn: "9780061120084", title: "To Kill a Mockingbird", year: "1960", author: "Harper Lee"},
  {isbn: "9780739341164", title: "The Da Vinci Code", year: "2003", author: "Dan Brown"},
  {isbn: "9780141439587", title: "Pride and Prejudice", year: "1813", author: "Jane Austen"},
  {isbn: "9780765326381", title: "The Hunger Games", year: "2008", author: "Suzanne Collins"},
  {isbn: "9780451524935", title: "1984", year: "1949", author: "George Orwell"},
  {isbn: "9780060558128", title: "The Catcher in the Rye", year: "1951", author: "J.D. Salinger"},
  {isbn: "9780061122415", title: "Harry Potter and the Sorcerer's Stone", year: "1997", author: "J.K. Rowling"},
  {isbn: "9780141187761", title: "One Hundred Years of Solitude", year: "1967", author: "Gabriel García Márquez"},
  {isbn: "9780060850524", title: "The Great Gatsby", year: "1925", author: "F. Scott Fitzgerald"},
];

//generated with ChatGPT
let lend = [
    {id: "01", customer_id: "25", borrowed_at: "01.08.2023", returned_at: "", isbn: "9780345391803"},
    {id: "02", customer_id: "43", borrowed_at: "05.09.2023", returned_at: "", isbn: "9780061120084"},
    {id: "03", customer_id: "72", borrowed_at: "15.10.2023", returned_at: "11.11.2023", isbn: "9780739341164"},
    {id: "04", customer_id: "88", borrowed_at: "20.11.2023", returned_at: "29.11.2023", isbn: "9780141439587"},
    {id: "05", customer_id: "14", borrowed_at: "25.12.2023", returned_at: "", isbn: "9780765326381"},
    {id: "06", customer_id: "56", borrowed_at: "10.09.2023", returned_at: "", isbn: "9780451524935"},
    {id: "07", customer_id: "29", borrowed_at: "03.11.2023", returned_at: "", isbn: "9780060558128"},
    {id: "08", customer_id: "61", borrowed_at: "08.10.2023", returned_at: "", isbn: "9780061122415"},
    {id: "09", customer_id: "37", borrowed_at: "13.08.2023", returned_at: "07.09.2023", isbn: "9780141187761"},
    {id: "10", customer_id: "94", borrowed_at: "01.12.2023", returned_at: "06.12.2023", isbn: "9780060850524"},
];



app.get("/books", (request, response) => {
  response.status(200).send(books);
});

app.get("/books/:isbn", (request, response) =>{
  response.status(200).send(books.find((book) => book.isbn  === request.params.isbn)
)})

app.use(express.urlencoded({ extended: true }))
app.post("/books", (request, response) =>{
  books.push(request.body);
  response.status(201).send(books)
})//bei Anfragekörper ein JSON eingeben (Keys auch in ""). Beispiel: {"isbn": "9780743273565", "title": "The Kite Runner", "year": "2003", "author": "Khaled Hosseini"}

app.put("/books", (request, response) =>{
  const bookToUpdate = books.find((book) => book.isbn === request.body.isbn);
  //bookToUpdate = request.body;
  bookToUpdate.isbn = request.body.isbn;
  bookToUpdate.title = request.body.title;
  bookToUpdate.year = request.body.year;
  bookToUpdate.author = request.body.author;
  response.status(200).send(bookToUpdate);
})//bei Anfragekörper ein JSON eingeben.

app.delete("/books/:isbn", (request, response) => {
  const isbn = request.params.isbn;
  books = books.filter(book => book.isbn !== isbn);
  response.status(200).send(`Book with ISBN ${isbn} is deleted`);
})

app.get("/lends", (request, response) => {
    //response.status(200);
    response.status(200).send(lend);
});

app.get("/lends/:id", (request, response) => {
    response.status(200).send(lend.find((lend) => lend.id  === request.params.id)
)})

app.post("/lends", (request, response) => {
  //prüfen, ob das Buch bereits ausgeliehen ist.
  const { isbn } = request.body;
  const existingLoan = lend.find((lend) => lend.isbn === isbn && !lend.returned_at);
  if (existingLoan) {
    return response.status(422).send({ error: 'This book is already borrowed' });
  }
  //wenn es nicht bereits ausgeliehen ist, wird es ausgeliehen
  lend.push(request.body);
  response.status(201).send(lend);
});


app.patch("/lends/:id", (request, response) => {
  const keys = Object.keys(request.body);
  const oldLend = lend.find((lend) => lend.id  === request.params.id);
  keys.forEach((key) => oldLend[key] = request.body[key]);
  lend = lend.map((lend) => lend.isbn === request.params.id ? oldLend : lend);
  response.status(200).send(lend);
});

/*
app.post('/login', function (request, response) {
	const { email, password } = request.body
    secretAdminCredentials = request.body
	// Check the credentials against store
	if (email?.toLowerCase() == secretAdminCredentials.email && password == secretAdminCredentials.password) {

		// Link email to session
		request.session.email = email

		return response.status(200).json({ email: request.session.email })
	}

  return response.status(401).json({ error: "Invalid credentials" })
})*/


app.post('/login', function (request, response) {
   const { email, password } = request.body

   // Prüfen Sie die Credentials gegen die vordefinierten Werte
   const predefinedEmail = "desk@library.example";
   const predefinedPassword = "m295";

   if (email?.toLowerCase() === predefinedEmail && password === predefinedPassword) {
       // Link email to session
       request.session.email = email

       return response.status(201).json({ email: request.session.email })
   }

   return response.status(401).json({ error: "Invalid credentials" })
})


app.get('/verify', function (request, response) {
	
	// Check if email is set in session
	if (request.session.email) {
		return response.status(200).json({ email: request.session.email })
	}

  return response.status(401).json({ error: "Not logged in" })
})

app.delete('/logout', function (request, response) {

	// Check if email is set in session
	if (request.session.email) {

		// Reset link of session to email
		request.session.email = null

		return response.status(204).send()
	}

  return response.status(401).json({ error: "Not logged in" })
})



app.listen(port, () => {
  console.log(`Bookstore app listening on port ${port}`);
});
