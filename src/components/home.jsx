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

  // video end event to pause and show last frame
  useEffect(() => {
    const video = document.getElementById("home-video");

    const onEnd = () => {
      video.pause();
      video.currentTime = video.duration; 
    };

    video.addEventListener("ended", onEnd);
    return () => video.removeEventListener("ended", onEnd);
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
        id="home-video"
        className="home-video"
        autoPlay
        playsInline
        muted
        src="./videos/book.mp4"
      />

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
