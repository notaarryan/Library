class Book {
  #id;
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.#id = crypto.randomUUID();
  }
  getId() {
    return this.#id;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

class MyLibraryApp {
  #myLibrary;
  constructor() {
    this.authorRe = /^[a-zA-Z\s\-'.]+$/;
    this.titleRe = /^[a-zA-Z0-9\s\-':;,!?.()&]+$/;
    this.#myLibrary = [];
    this.cacheDom();
    this.validate();
    this.bindEvents();
  }

  addBookToLibrary(Book) {
    this.#myLibrary.push(Book);
    this.render();
  }

  cacheDom() {
    this.bookContainer = document.querySelector(".books-container");
    this.addButton = document.querySelector(".add");
    this.dialog = document.querySelector("dialog");
    this.form = document.querySelector("form");
    this.closeButton = document.querySelector(".cancel");
    this.authorInput = document.getElementById("author");
    this.titleInput = document.getElementById("title");
    this.pagesInput = document.getElementById("pages");
  }

  bindEvents() {
    this.addButton.addEventListener("click", () => {
      this.dialog.showModal();
    });

    this.closeButton.addEventListener("click", () => {
      this.dialog.close();
    });
    this.authorInput.addEventListener("input", () => this.validateAuthor());

    this.titleInput.addEventListener("input", () => this.validateTitle());

    this.pagesInput.addEventListener("input", () => this.validatePages());

    this.form.addEventListener("submit", (e) => {
      this.validateAuthor();
      this.validateTitle();
      this.validatePages();

      if (!this.form.checkValidity()) {
        this.authorInput.reportValidity();
        this.titleInput.reportValidity();
        this.pagesInput.reportValidity();
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const formData = new FormData(this.form);
      const author = formData.get("author");
      const title = formData.get("title");
      const pages = formData.get("pages");
      const isRead = formData.get("read") !== null;
      const newBook = new Book(author, title, pages, isRead);
      this.addBookToLibrary(newBook);
      this.dialog.close();
    });
  }

  render() {
    this.bookContainer.innerHTML = "";
    this.#myLibrary.forEach((book) => {
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
        book.toggleRead();
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

        const index = this.#myLibrary.findIndex(
          (b) => b.getId() === book.getId()
        );
        if (index !== -1) {
          this.#myLibrary.splice(index, 1);
          this.render();
        }
      });

      newBook.appendChild(authorDiv);
      newBook.appendChild(titleDiv);
      newBook.appendChild(pagesDiv);
      newBook.appendChild(readButton);
      newBook.appendChild(removeButton);
      this.bookContainer.appendChild(newBook);
    });
  }

  validate() {
    this.validateAuthor = function () {
      const value = this.authorInput.value.trim();
      if (!value) {
        this.authorInput.setCustomValidity("Please enter an author name");
      } else if (!this.authorRe.test(value)) {
        this.authorInput.setCustomValidity("Please enter a valid name");
      } else {
        this.authorInput.setCustomValidity("");
      }
    };

    this.validateTitle = function () {
      const value = this.titleInput.value.trim();
      if (!value) {
        this.titleInput.setCustomValidity("Please enter a title name");
      } else if (!this.titleRe.test(value)) {
        this.titleInput.setCustomValidity("Please enter a valid title");
      } else {
        this.titleInput.setCustomValidity("");
      }
    };

    this.validatePages = function () {
      const value = this.pagesInput.value.trim();
      if (!value) {
        this.pagesInput.setCustomValidity("Please enter a number of pages");
      } else if (isNaN(value) || parseInt(value) <= 0) {
        this.pagesInput.setCustomValidity(
          "Please enter a valid positive number"
        );
      } else {
        this.pagesInput.setCustomValidity("");
      }
    };
  }
}

const app = new MyLibraryApp();
