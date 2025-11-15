// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom"; // assuming you're using react-router
import "./Header.css";
import woodBg from "./assests/wood.png";

function Header() {
  return (
    <header
      className="Header">
      <div className="header-container">
        <h1 className="logo">Factory</h1>

        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/QuizDashboard" className="nav-item">Quizzes</Link>
          <Link to="/flashcards" className="nav-item">Flashcards</Link>
          <Link to="/progress" className="nav-item">Progress</Link>
          <Link to="/StoryBoard" className="nav-item">StoryBoard</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
