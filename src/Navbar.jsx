import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "./LibrarySlice";
import "./components/styles/navbar.css";

/**
 * Navbar component for navigation.
 * Displays links based on user role (admin or regular user).
 * Handles menu toggling and logout functionality.
 *
 * @component
 */
function Navbar() {
  // State for menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Get admin status from Redux store
  const isAdmin = useSelector((state) => state.library.isAdmin);

  // Redux dispatch function
  const dispatch = useDispatch();

  // React Router navigation function
  const navigate = useNavigate();

  /**
   * Toggle the menu open/close state.
   */
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  /**
   * Close the menu.
   */
  const closeMenu = () => setMenuOpen(false);

  /**
   * Handle user logout.
   * Resets admin role and navigates to login page.
   */
  const handleLogout = () => {
    dispatch(setAdmin(false)); // Reset role
    navigate("/"); // Go to login page
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">Grimoire of Stories</div>

      {/* Book icon for menu toggle */}
      <div className="book-icon" onClick={toggleMenu} title="Menu">
        <img
          src="/icons/book-closed.svg"
          alt="Menu Closed"
          className={`book-icon-img ${menuOpen ? "hidden" : ""}`}
        />
        <img
          src="/icons/book-open.svg"
          alt="Menu Open"
          className={`book-icon-img ${menuOpen ? "" : "hidden"}`}
        />
      </div>

      {/* Navigation links */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink
            to="/home"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>

        {/* Show Search only for non-admin users */}
        {!isAdmin && (
          <li>
            <NavLink
              to="/home/search"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Search
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/home/library"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/profile"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </NavLink>
        </li>

        {/* Admin Panel link for admin users */}
        {isAdmin && (
          <li>
            <NavLink
              to="/home/admin"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link active admin-link" : "nav-link admin-link"
              }
            >
              👑 Admin Panel
            </NavLink>
          </li>
        )}

        {/* Logout button */}
        <li>
          <button className="nav-link logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;