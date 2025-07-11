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
import AdminPanel from "./components/AdminPanel";
import "./components/styles/transition.css";

/**
 * Component displayed when a route is not found.
 * @returns {JSX.Element}
 */
function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🔍 Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

/**
 * Main application component.
 * Handles routing and conditional rendering based on admin status.
 * @returns {JSX.Element}
 */
function App() {
  // Get admin status from Redux store
  const isAdmin = useSelector((state) => state.library.isAdmin);

  return (
    <Routes>
      {/* Login route */}
      <Route path="/" element={<Login />} />
      {/* Main layout route */}
      <Route path="/home" element={<Layout />}>
        {/* Home page */}
        <Route index element={<Home />} />
        {/* Book details page */}
        <Route path="book/:id" element={<BookDetails />} />
        {/* Search page (visible only to non-admin users) */}
        {!isAdmin && <Route path="search" element={<Search />} />}
        {/* Library page */}
        <Route path="library" element={<Library />} />
        {/* Cart page */}
        <Route path="cart" element={<Cart />} />
        {/* Profile page */}
        <Route path="profile" element={<Profile />} />
        {/* Admin panel (visible only to admin users) */}
        {isAdmin && <Route path="admin" element={<AdminPanel />} />}
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;