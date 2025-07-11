import { useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import "./styles/layout.css";
import "./styles/transition.css";

/**
 * Layout component that wraps the main content of the application.
 * Handles page transitions, background styling, and admin banner display.
 *
 * @component
 * @returns {JSX.Element} The layout structure with navigation and routed content.
 */
function Layout() {
  const location = useLocation();
  // Check if the current route is "/home"
  const isHome = location.pathname === "/home";
  // Get admin status from Redux store
  const isAdmin = useSelector((state) => state.library.isAdmin);

  // State for managing page transition CSS class
  const [transitionClass, setTransitionClass] = useState("page-enter");

  // Disable body scroll when on the home page
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isHome);
    return () => document.body.classList.remove("no-scroll");
  }, [isHome]);

  // Handle page transition animation on route change
  useEffect(() => {
    setTransitionClass("page-exit");

    const timeout = setTimeout(() => {
      setTransitionClass("page-enter");
    }, 300); // transition duration in ms

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className={`page-wrapper ${isHome ? "no-bg" : "layout-background"}`}>
      {/* Navigation bar */}
      <Navbar />
      
      {/* Show admin banner if user is admin */}
      {isAdmin && (
        <div className="admin-banner">
          👑 Logged in as Admin
        </div>
      )}

      {/* Main content with transition effect */}
      <main className={`page-transition ${transitionClass}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;