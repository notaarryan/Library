# 📚 Library App

A modern, interactive library management app built using **HTML**, **CSS**, and modern **JavaScript** (ES6 classes).  
Users can dynamically add, view, and delete book entries—all in a clean, responsive UI and **without** any backend.

🚀 **Live Demo:** [Library App on GitHub Pages](https://notaarryan.github.io/Library/)

---

## ✨ Features

- ✅ **Add Books**: Title, author, page count, and read status
- 🗑️ **Remove Books**: Instantly delete books from your library
- 🔄 **Toggle Read Status**: Change read/unread status dynamically
- 🧠 **Form Validation**: Custom regex validation and user-friendly messages
- 🔐 **Unique Book IDs**: Uses `crypto.randomUUID()` for each book
- 📦 **Encapsulated Logic**: Refactored to use ES6 classes with private fields (`#myLibrary`, `#id`)
- 🏗️ **Clean Architecture**: Separate `Book` class for data and MyLibraryApp class for UI/state
- 💬 **Dialog UI**: Native `<dialog>` element with custom styling
- 📱 **Responsive Design**: Built with CSS Grid and Flexbox
- ⚠️ **Invalid Form Highlighting**: Real-time feedback on input errors

---

## 🧩 Tech Stack

- **HTML5** – Semantic structure
- **CSS3** – Responsive design, custom styling
- **Modern JavaScript (ES6+)** – Classes, private fields, DOM manipulation

---

## 📂 Project Structure

```
Library/
│
├── index.html          # Main HTML structure with dialog form
├── style.css           # Custom styles, animations, form themes
├── script.js           # Book class and MyLibraryApp class
└── README.md           # Project overview and documentation
```

---

## 🛠️ How It Works

1. Click **"+ Add Book"** to open the dialog form
2. Fill in title, author, pages, and read status
3. Submit to add the book
4. Toggle **read/unread** or remove a book anytime

The `MyLibraryApp` class maintains a private `#myLibrary` array, manages DOM events, and renders books.
Each `Book` instance has private `#id` and methods like `toggleRead()`.

---

## 🧪 Improvements After Refactor

- ✅ Switched from IIFE module pattern to ES6 classes
- ✅ Private fields for true encapsulation
- ✅ Clear separation: data (Book) vs UI/state (MyLibraryApp)
- ✅ Better maintainability and scalability

---

## 🔮 Planned Enhancements

- Save & load books using **localStorage**
- Add **search and filter** features
- Edit existing book details
- Smooth animations for adding/removing books
- Optional React or backend integration in the future

---

## 📚 What I Learned

This project taught me to:

- Use ES6 classes and private fields to encapsulate state
- Build reusable, modular, and maintainable code
- Manage complex DOM interactions cleanly
- Validate forms dynamically and accessibly
- Create responsive, component-based UIs with modern CSS

---

## 🙌 A Note to Recruiters

This project demonstrates my ability to:

- Write clean, modular ES6+ code
- Use encapsulation and OOP best practices
- Build dynamic, interactive UIs from scratch
- Implement validation and responsive design without libraries

---

> Feel free to explore the [live demo](https://notaarryan.github.io/Library/) or the source code!
