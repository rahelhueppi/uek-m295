const express = require("express");
const app = express();
const port = 3000;

//Middleware: Hier lade ich die Express JSON Middleware, damit ich an meine Endpunkte JSON-Daten
//im body senden kann und diese direkt als JavaScript Objekt verfügbar werden
app.use(express.json());

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


app.get("/books", (request, response) => {
  response.send(books);
});

app.get("/books/:isbn", (request, response) =>{
  response.send(books.find((book) => book.isbn  === request.params.isbn)
)})

app.use(express.urlencoded({ extendes: true }))
app.post("/books", (request, response) =>{
  books.push(request.body);
  response.send(books)
  //response.status(201)
})//bei Anfragekörper ein JSON eingeben (Keys auch in ""). Beispiel: {"isbn": "9780743273565", "title": "The Kite Runner", "year": "2003", "author": "Khaled Hosseini"}


//app.put("/books", (request, response) =>{
//  const bookToUpdate = books.find((book) => book.isbn === request.body.isbn);
//  //bookToUpdate = request.body;
//  bookToUpdate.isbn = request.body.isbn;
//  bookToUpdate.title = request.body.title;
//  bookToUpdate.year = request.body.year;
//  bookToUpdate.author = request.body.author;
//  response.send(bookToUpdate);
//})//bei Anfragekörper ein JSON eingeben.

//Lösung
app.put("/books/:isbn", (request, response) =>{
  books = books.map((book) => book.isbn === request.params.isbn ? request.body : book); //? = wenn da so ist/true, : = sonst/false -> if, else = einzeilig
  //lange Version von der if-else-Schleife
  //books = books.map((book)
  //  if(boook.isbn == request.params.isbn) {
  //    return request.body;
  //  } else {
  //    return book
  //  })
  response.send(books);
  })


app.delete("/books/:isbn", (request, response) => {
  books = books.filter(book => book.isbn !== request.params.isbn);
  response.send(`Book with ISBN ${isbn} is deleted`);
})

/*
app.patch("/books/:isbn", (request, response) => {
  const keys = Object.keys(request.body)
  const oldBook = books.find((book) => book.isbn  === request.params.isbn)
  keys.forEach((key) => oldBook[key] = request.body[key]);
  books = books.map((book) => book.isbn === request.params.isbn ? oldBook : book)
  response.send(books)
})*/

app.listen(port, () => {
  console.log(`Bookstore app listening on port ${port}`);
});
