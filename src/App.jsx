import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home";
import Search from "./Research";
import Library from "./Library";
import Cart from "./Cart";
import BookDetails from "./components/BookDetails";
import Profile from "./components/Profile";
// import Intro from "./components/intro";
import './components/styles/transition.css';

// Optional: You can create a NotFound component for the wildcard route
function NotFound() {
  return <h2>Page Not Found</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="book/:id" element={<BookDetails />} />
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
