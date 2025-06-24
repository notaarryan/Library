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
  bookContainer.innerHTML = "";
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

    readButton.addEventListener("click", () => {
      if (readButton.classList.contains("read")) {
        readButton.classList.toggle("read");
        readButton.classList.toggle("not-read");
        readButton.innerText = "Not read";
      } else {
        readButton.classList.toggle("read");
        readButton.classList.toggle("not-read");
        readButton.innerText = "Read";
      }
    });

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

function validateAuthor() {
  const value = authorInput.value.trim();
  if (!value) {
    authorInput.setCustomValidity("Please enter an author name");
  } else if (!authorRe.test(value)) {
    authorInput.setCustomValidity("Please enter a valid name");
  } else {
    authorInput.setCustomValidity("");
  }
}

function validateTitle() {
  const value = titleInput.value.trim();
  if (!value) {
    titleInput.setCustomValidity("Please enter a title name");
  } else if (!titleRe.test(value)) {
    titleInput.setCustomValidity("Please enter a valid title");
  } else {
    titleInput.setCustomValidity("");
  }
}

function validatePages() {
  const value = pagesInput.value.trim();
  if (!value) {
    pagesInput.setCustomValidity("Please enter a number of pages");
  } else if (isNaN(value) || parseInt(value) <= 0) {
    pagesInput.setCustomValidity("Please enter a valid positive number");
  } else {
    pagesInput.setCustomValidity("");
  }
}

const myLibrary = [];
const bookContainer = document.querySelector(".books-container");
const addButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeButton = document.querySelector(".cancel");
const authorInput = document.getElementById("author");
const titleInput = document.getElementById("title");
const pagesInput = document.getElementById("pages");
const authorRe = /^[a-zA-Z\s\-'.]+$/;
const titleRe = /^[a-zA-Z0-9\s\-':;,!?.()&]+$/;

addButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

authorInput.addEventListener("input", validateAuthor);

titleInput.addEventListener("input", validateTitle);

pagesInput.addEventListener("input", validatePages);

form.addEventListener("submit", (e) => {
  validateAuthor();
  validateTitle();
  validatePages();

  if (!form.checkValidity()) {
    authorInput.reportValidity();
    titleInput.reportValidity();
    pagesInput.reportValidity();
    e.preventDefault();
    return;
  }

  e.preventDefault();
  const formData = new FormData(form);
  const author = formData.get("author");
  const title = formData.get("title");
  const pages = formData.get("pages");
  const isRead = formData.get("read") !== null;
  const newBook = new Book(author, title, pages, isRead);
  addBookToLibrary(newBook);
  dialog.close();
});
