import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/home.css";

const txt = "Evvery book is a path, ready to be explored...";
const speed = 50;

function Home() {
  const [displayed, setDisplayed] = useState("");
  const [showBar, setShowBar] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + txt.charAt(i));
      i++;
      if (i >= txt.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, []);

  // Blinking bar effect
  useEffect(() => {
    const barInterval = setInterval(() => {
      setShowBar((prev) => !prev);
    }, 500);
    return () => clearInterval(barInterval);
  }, []);

  return (
    <div className="home-container">
      <video
        className="home-video"
        autoPlay
        loop
        playsInline
        src="./videos/forest.mp4"
      ></video>

      <div className="overlay">
        <h1 className="home-title">The Enchanted Book Advisor</h1>
        <p className="home-subtitle">
          {displayed}
          <span className="typing-bar">
            {showBar && (displayed.length < txt.length ? "|" : "")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
