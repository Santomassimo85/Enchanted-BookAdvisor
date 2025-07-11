import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Home from "./components/home";
import Search from "./Research";
import Library from "./Library";
import Cart from "./Cart";
import BookDetails from "./components/BookDetails";
import Profile from "./components/Profile";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel"; // ✅ Nuovo componente per admin
import "./components/styles/transition.css";

function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🔍 Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

function App() {
  const isAdmin = useSelector((state) => state.library.isAdmin);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="book/:id" element={<BookDetails />} />
        {!isAdmin && <Route path="search" element={<Search />} />}
        <Route path="library" element={<Library />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        {/* ✅ Route per admin panel */}
        {isAdmin && <Route path="admin" element={<AdminPanel />} />}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;