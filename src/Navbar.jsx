import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "./LibrarySlice"; // ✅ Import corretto
import "./components/styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = useSelector((state) => state.library.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    dispatch(setAdmin(false)); // resetta il ruolo
    navigate("/"); // torna alla pagina login
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Grimoire of Stories</div>

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

        {/* ✅ Aggiunta sezione Admin */}
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