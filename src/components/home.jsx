import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/home.css";

/**
 * The text to be displayed with typing animation.
 * @type {string}
 */
const txt = "Every book is a path, ready to be explored...";

/**
 * Typing animation speed in milliseconds.
 * @type {number}
 */
const speed = 50;

/**
 * Home component displays a video background with a typing animated subtitle.
 * @returns {JSX.Element}
 */
function Home() {
  // State for the currently displayed text in the typing animation
  const [displayed, setDisplayed] = useState("");
  // State for showing/hiding the blinking bar
  const [showBar, setShowBar] = useState(true);

  /**
   * Typing animation effect: reveals one character at a time.
   */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + txt.charAt(i));
      i++;
      if (i >= txt.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, []);

  /**
   * Handles video end event: pauses and shows the last frame.
   */
  useEffect(() => {
    const video = document.getElementById("home-video");

    const onEnd = () => {
      video.pause();
      video.currentTime = video.duration;
    };

    video.addEventListener("ended", onEnd);
    return () => video.removeEventListener("ended", onEnd);
  }, []);

  /**
   * Blinking bar effect for the typing animation.
   */
  useEffect(() => {
    const barInterval = setInterval(() => {
      setShowBar((prev) => !prev);
    }, 500);
    return () => clearInterval(barInterval);
  }, []);

  return (
    <div className="home-container">
      {/* Background video */}
      <video
        id="home-video"
        className="home-video"
        autoPlay
        playsInline
        muted
        src="./videos/book.mp4"
      />

      {/* Overlay with title and animated subtitle */}
      <div className="overlay">
        <h1 className="home-title">The Enchanted Book Advisor</h1>
        <p className="home-subtitle">
          {displayed}
          <span className="typing-bar">
            {/* Show blinking bar only while typing */}
            {showBar && (displayed.length < txt.length ? "|" : "")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
