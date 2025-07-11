import { useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import "./styles/layout.css";
import "./styles/transition.css";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/home"; // ✅ Corretto: controlla se siamo in /home
  const isAdmin = useSelector((state) => state.library.isAdmin);

  const [transitionClass, setTransitionClass] = useState("page-enter");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isHome);
    return () => document.body.classList.remove("no-scroll");
  }, [isHome]);

  useEffect(() => {
    setTransitionClass("page-exit");

    const timeout = setTimeout(() => {
      setTransitionClass("page-enter");
    }, 300); // durata transizione

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className={`page-wrapper ${isHome ? "no-bg" : "layout-background"}`}>
      <Navbar />
      
      {isAdmin && (
        <div className="admin-banner">
          👑 Logged in as Admin
        </div>
      )}

      <main className={`page-transition ${transitionClass}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;