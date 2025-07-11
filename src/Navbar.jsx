import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./components/styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Grimoire of Stories</div>

      <div className="book-icon" onClick={toggleMenu} title="Menu">
  <img
    src="/icons/book-closed.svg"
    alt="Menu Closed"
    className={`book-icon-img ${menuOpen ? 'hidden' : ''}`}
  />
  <img
    src="/icons/book-open.svg"
    alt="Menu Open"
    className={`book-icon-img ${menuOpen ? '' : 'hidden'}`}
  />
</div>



      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Search
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/library"
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
            to="/cart"
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
            to="/profile"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
