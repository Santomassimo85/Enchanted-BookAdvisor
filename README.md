
# Book Advisor

**Book Advisor** is a responsive front-end web application built with React, designed as a fantasy-themed digital library. Users can search for books, add favorites, rate, review, and manage a virtual cart in an immersive interface.

## Features

- Search books via **OpenLibrary API**
- Add books to **Favorites** and **Cart**
- Rate and review books (local storage)
- Clear favorites and cart
- Dynamic book details view
- Animated intro screen with fantasy video
- Epic loading spinner (GIF warrior with torch)
- Responsive design for desktop, tablet, and mobile
- Global state management using **Redux**
- Navigation with **React Router**
- Async book search with **fetch**, `useEffect`, and debounce

## Technologies Used

- React (Functional Components)
- JavaScript ES6+
- Redux Toolkit
- React Router DOM
- Async JS (fetch / await / useEffect)
- CSS Modules & Global CSS
- Sprite/GIF pixel animations

## Project Structure

```
BOOKADVISOR/
├── public/
│   ├── icons/
│   ├── images/
│   └── videos/
│       ├── book.mp4
│       └── forest.mp4
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── styles/
│   │   │   ├── admin.css
│   │   │   ├── bookDetails.css
│   │   │   ├── cart.css
│   │   │   ├── home.css
│   │   │   ├── index.css
│   │   │   ├── layout.css
│   │   │   ├── library.css
│   │   │   ├── login.css
│   │   │   ├── navbar.css
│   │   │   ├── profile.css
│   │   │   ├── search.css
│   │   │   └── transition.css
│   │   ├── AdminPanel.jsx
│   │   ├── BookDetails.jsx
│   │   ├── home.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│
├── App.jsx
├── Cart.jsx
├── fetchBookDetails.js
├── Library.jsx
├── LibrarySlice.js
├── Main.jsx
├── Navbar.jsx
├── Research.jsx
├── store.js
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── vitest.config.js

```

## How to Run

```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Educational Goals

This project was developed for a Front-End exam in the **Computer Engineering & AI** Bachelor's program. The main objectives included:

- Building a React app from scratch
- Using modern front-end tools and workflows
- Handling async data and user feedback
- Organizing code into reusable components
- Designing a responsive, engaging UI

---

## Notes

- Reviews are stored in **local storage**
- OpenLibrary API is used without authentication
- Styling inspired by magical forests and ancient books

---

## Author

**Luca Santomassimo** – Book Advisor Project for Front-End Exam

