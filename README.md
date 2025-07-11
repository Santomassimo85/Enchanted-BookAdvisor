
# Book Advisor

**Book Advisor** is a responsive and immersive front-end web application built with React, designed as a magical and interactive digital library. Users can search for books, add them to favorites, rate them, write reviews, and manage a virtual cart — all in a fantasy-themed interface.


## Features

- Search books using the **OpenLibrary API**
- Add books to **Favorites** and **Cart**
- Rate and review books (local storage)
- Clear favorites and cart
- View book details dynamically
- Animated intro screen with a fantasy video
- Epic loading spinner (GIF warrior with torch)
- Responsive design (desktop, tablet, mobile)
- Global state management with **Redux**
- Smooth navigation with **React Router**
- Async book search using **fetch**, `useEffect`, and debounce


## Technologies Used

- React (Functional Components)
- JavaScript ES6+
- Redux Toolkit (state slices)
- React Router DOM
- Async JS (fetch / await / useEffect)
- CSS Modules + Global CSS for responsiveness
- Sprite/GIF-based pixel animations


## Project Structure (Simplified)

```
bookAdvisor/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── styles/
│   │   │   ├── bookDetails.css
│   │   │   ├── cart.css
│   │   │   ├── home.css
│   │   │   ├── index.css
│   │   │   ├── intro.css
│   │   │   ├── layout.css
│   │   │   ├── library.css
│   │   │   ├── navbar.css
│   │   │   ├── profile.css
│   │   │   └── search.css
│   │   ├── BookDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   ├── Intro.jsx
│   │   ├── Layout.jsx
│   │   ├── Library.jsx
│   │   ├── Navbar.jsx
│   │   └── Profile.jsx
│   ├── redux/
│   │   ├── slices/
│   │   │   └── librarySlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── LibrarySlice.js
│   ├── Main.jsx
│   ├── Research.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

```

## How to Run

```bash
npm install
npm run dev
```
Then open `http://localhost:5173`

---

## Educational Goals

This project is a hands-on web app created for a Front-End exam in the **Computer Engineering & AI** Bachelor's program. The main goal was to build a fun, interactive digital library using React. Through this project, I practiced:

- Building real-world React apps from scratch
- Using modern tools and workflows for front-end development
- Handling async data and giving users clear feedback
- Organizing code into reusable, scalable components
- Designing a responsive and engaging user interface


---

## Notes

- Reviews are stored in **local memory**
- OpenLibrary API is used without authentication
- Styling inspired by magical forests and old tomes

---

## Author
**Luca** – [Book Advisor Project for Front-End Exam]
