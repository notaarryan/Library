const myLibrary = [];
const bookContainer = document.querySelector(".books-container");

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(Book) {
  myLibrary.push(Book);
  displayBooks();
}

function displayBooks() {
  myLibrary.forEach((book) => {
    const newBook = document.createElement("div");
    newBook.classList.add("book");

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.innerText = book.author;

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerText = book.title;

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages");
    pagesDiv.innerText = book.pages;

    const readButton = document.createElement("button");

    if (book.read) {
      readButton.classList.add("read");
      readButton.innerText = "Read";
    } else {
      readButton.classList.add("not-read");
      readButton.innerText = "Not read";
    }

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", () => {
      newBook.remove();

      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    });

    newBook.appendChild(authorDiv);
    newBook.appendChild(titleDiv);
    newBook.appendChild(pagesDiv);
    newBook.appendChild(readButton);
    newBook.appendChild(removeButton);
    bookContainer.appendChild(newBook);
  });
}