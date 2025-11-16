import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Effect to close the dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="app-header">
      <nav className="header-nav" ref={dropdownRef}>
        <button
          className={`hamburger-button ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <Link to="/Dashboard" className="dropdown-item" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to="/QuizDashboard" className="dropdown-item" onClick={() => setIsOpen(false)}>Quizzes</Link>
            <Link to="/StoryBoard" className="dropdown-item" onClick={() => setIsOpen(false)}>Storyboards</Link>
            <Link to="/FlashCards" className="dropdown-item" onClick={() => setIsOpen(false)}>Flashcards</Link>
            <Link to="/ProgressPage" className="dropdown-item" onClick={() => setIsOpen(false)}>Progress</Link>
          </div>
        )}
      </nav>
      <Link to="/profile" className="user-profile-link" aria-label="User Profile">
        👤
      </Link>
    </header>
  );
}

export default Header;
