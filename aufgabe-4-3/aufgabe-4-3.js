const express = require("express");
const app = express();
const port = 3000;

//Middleware: Hier lade ich die Express JSON Middleware, damit ich an meine Endpunkte JSON-Daten
//im body senden kann und diese direkt als JavaScript Objekt verfügbar werden
app.use(express.json());

/*
//Sicherstellen, dass keine der Properties leer sind, außer "returned_at". funktioniert noch nicht
app.use((request, response, next) => {
  const { isbn, customer_id, borrowed_at } = request.body;
  if (!isbn || !customer_id || !borrowed_at) {
    return response.status(422).send({ error: 'All fields except returned_at are required' });
  }
  next();
 });*/ 

//app.use(express.urlencoded({ extended: true }))

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

app.listen(port, () => {
  console.log(`Bookstore app listening on port ${port}`);
});









//Lösung
/*
const { randomUUID } = require('node:crypto');
const express = require('express');
const app = express();
const port = 3000;

// Hier lade ich die Express JSON Middleware, damit ich an meine Endpunkte JSON-Daten im Body senden kann und diese direkt als JavaScript Objekt verfügbar werden.
app.use(express.json());

// generated with ChatGPT
let books = [
  { isbn: "978-0143124177", title: "The Goldfinch", year: "2013", author: "Donna Tartt" },
  { isbn: "978-0307277671", title: "The Road", year: "2006", author: "Cormac McCarthy" },
  { isbn: "978-0553386790", title: "The Book Thief", year: "2005", author: "Markus Zusak" },
  { isbn: "978-0812995343", title: "All the Light We Cannot See", year: "2014", author: "Anthony Doerr" },
  { isbn: "978-0375831003", title: "The Curious Incident of the Dog in the Night-Time", year: "2003", author: "Mark Haddon" },
  { isbn: "978-1501132957", title: "The Underground Railroad", year: "2016", author: "Colson Whitehead" },
  { isbn: "978-0679735779", title: "Beloved", year: "1987", author: "Toni Morrison" },
  { isbn: "978-0316769488", title: "The Catcher in the Rye", year: "1951", author: "J.D. Salinger" },
  { isbn: "978-0143039433", title: "Never Let Me Go", year: "2005", author: "Kazuo Ishiguro" },
  { isbn: "978-0345804310", title: "Gone Girl", year: "2012", author: "Gillian Flynn" }
];

let lends = [];

// Books
app.get('/books', (request, response) => {
  response.send(books);
});

app.get('/books/:isbn', (request, response) => {
  response.send(books.find((book) => book.isbn === request.params.isbn ))
});

app.post('/books', (request, response) => {
  // immutable manipulation
  books = [...books, request.body];
  // mutable manipulation
  // books.push(request.body);
  response.status(201).send(books);
});

app.put('/books/:isbn', (request, response) => {
  books = books.map((book) => book.isbn === request.params.isbn ? request.body : book);
  /*
  books = books.map((book) => {
    if(book.isbn === request.params.isbn) {
      return request.body;
    } else {
      return book;
    }
  });
  *//*
  response.send(books);
});

app.patch('/books/:isbn', (request, response) => {
  const keys = Object.keys(request.body);
  const oldBook = books.find((book) => book.isbn === request.params.isbn );
  keys.forEach((key) => oldBook[key] = request.body[key]);
  books = books.map((book) => book.isbn === request.params.isbn ? oldBook : book);
  response.send(books);
});

app.delete('/books/:isbn', (request, response) => {
  books = books.filter((book) => book.isbn !== request.params.isbn);
  response.send(books);
});

// Lends
app.get('/lends', (request, response) => {
  response.send(lends);
});

app.get('/lends/:id', (request, response) => {
  response.send(lends.find((lend) => lend.id === request.params.id))
});

app.post('/lends', (request, response) => {
  const newLend = request.body;
  newLend['id'] = randomUUID();
  newLend['borrowed_at'] = new Date().toISOString();
  newLend['returned_at'] = null;

  if(!newLend['isbn'] || !newLend['customer_id']) {
    return response.status(422).send("isbn and customer_id are required!");
  }

  const lendsByCustomer = lends.filter((lend) => lend['customer_id'] === newLend['customer_id'] && !lend['returned_at']);

  if(lendsByCustomer.length >= 3) {
    return response.status(400).send("Customer has too many active lends.")
  }

  lends = [...lends, request.body];
  response.status(201).send(lends);
});

app.delete('/lends/:id', (request, response) => {
  const returnedLend = lends.find((lend) => lend.id === request.params.id)
  returnedLend['returned_at'] = new Date().toISOString();
  response.send(lends);
});

// Server
app.listen(port, () => {
  console.log(`Bookstore app listening on port ${port}`);
});*/
